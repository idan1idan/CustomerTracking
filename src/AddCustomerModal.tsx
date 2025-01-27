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
import { useAddCustomer } from "./actions";

export default function AddCustomerModal() {
  const [open, setOpen] = useState(false);
  const { mutate: addCustomer } = useAddCustomer();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    addCustomer({
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      photoshootType: formData.get("photoshootType") as string,
      photoshootDate: formData.get("photoshootDate") as string,
      status: "Lead",
      location: formData.get("location") as string,
      statusUpdates: [],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Add New Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber">Phone</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoshootType">Photoshoot Type</Label>
            <Input
              id="photoshootType"
              name="photoshootType"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoshootDate">Photoshoot Date</Label>
            <Input
              id="photoshootDate"
              name="photoshootDate"
              type="datetime-local"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoshootDate">Location</Label>
            <Input id="location" name="location" className="col-span-3" />
          </div>
          <Button type="submit">Add Customer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
