import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Trash2 } from "lucide-react";
import EditCustomerModal from "./EditCustomerModal";
import {
  CustomerStatus,
  useRemoveCustomer,
  useUpdateCustomerStatus,
  useCustomers,
} from "./actions";

const statusFlow: CustomerStatus[] = [
  "Lead",
  "Closed Contract",
  "Advance Paid",
  "Styling",
  "Finished",
  "Payment",
  "Photos Sent",
  "Photos Selected",
  "Photo Design",
  "Album",
  "Approved",
  "Printing",
  "Received",
  "Done",
];

const getStatusColor = (status: CustomerStatus): string => {
  switch (status) {
    case "Lead":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Closed Contract":
      return "bg-orange-500 hover:bg-orange-600";
    case "Advance Paid":
      return "bg-green-500 hover:bg-green-600";
    case "Styling":
      return "bg-purple-500 hover:bg-purple-600";
    case "Finished":
      return "bg-blue-500 hover:bg-blue-600";
    case "Payment":
      return "bg-pink-500 hover:bg-pink-600";
    case "Photos Sent":
      return "bg-indigo-500 hover:bg-indigo-600";
    case "Photos Selected":
      return "bg-cyan-500 hover:bg-cyan-600";
    case "Photo Design":
      return "bg-teal-500 hover:bg-teal-600";
    case "Album":
      return "bg-red-500 hover:bg-red-600";
    case "Approved":
      return "bg-emerald-500 hover:bg-emerald-600";
    case "Printing":
      return "bg-amber-500 hover:bg-amber-600";
    case "Received":
      return "bg-lime-500 hover:bg-lime-600";
    case "Done":
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function CustomerTable() {
  const { data: customers } = useCustomers();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [nameFilter, setNameFilter] = useState("");
  const { mutate: updateCustomerStatus } = useUpdateCustomerStatus();
  const { mutate: removeCustomer } = useRemoveCustomer();
  const handleStatusUpdate = async (
    customerId: string,
    newStatus: CustomerStatus
  ) => {
    updateCustomerStatus({ customerId, status: newStatus });
  };

  const handleRemoveCustomer = async (customerId: string) => {
    if (window.confirm("Are you sure you want to remove this customer?")) {
      removeCustomer(customerId);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const indexA = statusFlow.indexOf(a.status);
    const indexB = statusFlow.indexOf(b.status);
    return sortOrder === "asc" ? indexA - indexB : indexB - indexA;
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={toggleSort}
                  className="font-bold"
                >
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <>
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <a href={`tel:${customer.phoneNumber}`}>
                      {customer.phoneNumber}
                    </a>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() =>
                          setExpandedCustomer(
                            expandedCustomer === customer.id
                              ? null
                              : customer.id
                          )
                        }
                      >
                        {expandedCustomer === customer.id ? "Hide" : "Show"}{" "}
                        Details
                      </Button>
                      <EditCustomerModal customer={customer} />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveCustomer(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedCustomer === customer.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="p-4 bg-muted">
                        <p>
                          <strong>Description:</strong> {customer.description}
                        </p>
                        <p>
                          <strong>Photoshoot Type:</strong>{" "}
                          {customer.photoshootType}
                        </p>
                        <p>
                          <strong>Photoshoot Date:</strong>{" "}
                          {customer.photoshootDate}
                        </p>
                        <div className="mt-4">
                          <strong>Update Status:</strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {statusFlow.map((status) => (
                              <Button
                                key={status}
                                className={`text-white ${getStatusColor(
                                  status
                                )}`}
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(customer.id, status)
                                }
                              >
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
