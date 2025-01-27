import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Customer, useUpdateCustomer } from "./actions";

interface EditCustomerModalProps {
  customer: Customer;
}

export default function EditCustomerModal({
  customer,
}: EditCustomerModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate: updateCustomer } = useUpdateCustomer();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateCustomer({
      id: customer.id,
      updatedCustomer: {
        name: formData.get("name") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        email: formData.get("email") as string,
        description: formData.get("description") as string,
        photoshootType: formData.get("photoshootType") as string,
        photoshootDate: formData.get("photoshootDate") as string,
        location: formData.get("location") as string,
      },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={customer.name}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={customer.phoneNumber}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={customer.email}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={customer.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoshootType" className="text-right">
              Photoshoot Type
            </Label>
            <Input
              id="photoshootType"
              name="photoshootType"
              defaultValue={customer.photoshootType}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoshootDate" className="text-right">
              Photoshoot Date
            </Label>
            <Input
              id="photoshootDate"
              name="photoshootDate"
              type="date"
              defaultValue={customer.photoshootDate}
              className="col-span-3"
              required
            />
          </div>
          <Button type="submit">Update Customer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
