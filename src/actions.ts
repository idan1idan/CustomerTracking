import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { v4 as uuidv4 } from "uuid";
export type CustomerStatus =
  | "Lead"
  | "Closed Contract"
  | "Advance Paid"
  | "Styling"
  | "Finished"
  | "Payment"
  | "Photos Sent"
  | "Photos Selected"
  | "Photo Design"
  | "Album"
  | "Approved"
  | "Printing"
  | "Received"
  | "Done";

export type StatusUpdate = {
  id: string;
  status: CustomerStatus;
  date: string;
};

export type Customer = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  description: string;
  photoshootType: string;
  photoshootDate: string;
  status: CustomerStatus;
  location: string;
  statusUpdates: StatusUpdate[];
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const customers = await api.get<Customer[]>("/customers");
      return customers.data || [];
    },
    initialData: [],
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (customer: Omit<Customer, "id">) => {
      const newCustomer = { ...customer, id: uuidv4() };
      await api.post("/customers", newCustomer);
      return newCustomer;
    },
    onSuccess(data) {
      queryClient.setQueryData<Customer[]>(["customers"], (oldData) => {
        if (oldData === undefined) return [data];
        return [...oldData, data];
      });
    },
  });
};

export const useUpdateCustomerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerId,
      status,
    }: {
      customerId: string;
      status: CustomerStatus;
    }) => {
      const customer = queryClient
        .getQueryData<Customer[]>(["customers"])
        ?.filter((customer) => customer.id === customerId)[0];
      if (!customer) throw new Error("Customer not found");
      const newStatusUpdate = {
        id: uuidv4(),
        status,
        date: new Date().toISOString(),
      };
      customer.statusUpdates = [
        ...(customer.statusUpdates || []),
        newStatusUpdate,
      ];
      await api.patch<Customer>(`/customers/${customerId}`, {
        statusUpdates: customer.statusUpdates,
      });
      const response = await api.patch<Customer>(`/customers/${customerId}`, {
        status,
      });

      return response.data;
    },
    onSuccess(updatedCustomer) {
      queryClient.setQueryData<Customer[]>(["customers"], (oldData) => {
        if (!oldData) return [updatedCustomer];
        return oldData.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updatedCustomer,
    }: {
      id: string;
      updatedCustomer: Omit<Customer, "id" | "status">;
    }) => {
      const response = await api.put<Customer>(
        `/customers/${id}`,
        updatedCustomer
      );
      return response.data;
    },
    onSuccess(updatedCustomer) {
      queryClient.setQueryData<Customer[]>(["customers"], (oldData) => {
        if (!oldData) return [updatedCustomer];
        return oldData.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
      });
    },
  });
};
export const useRemoveCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/customers/${id}`);
      return id;
    },
    onSuccess(deletedCustomerId) {
      queryClient.setQueryData<Customer[]>(["customers"], (oldData) => {
        return (
          oldData?.filter((customer) => customer.id !== deletedCustomerId) || []
        );
      });
    },
  });
};
