import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

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
      const newCustomer = { ...customer, id: Date.now().toString() };
      await api.post("/customers", newCustomer);
      return newCustomer;
    },
    onSuccess(data) {
      queryClient.setQueryData<Customer[]>(["customers"], (oldData) => {
        if (oldData === undefined) return [data];
        [...oldData, data];
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
