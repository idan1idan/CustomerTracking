import AddCustomerModal from "./AddCustomerModal";
import CustomerTable from "./CustomersTable";

function App() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Photography Customer Management
      </h1>
      <AddCustomerModal />
      <CustomerTable />
    </main>
  );
}

export default App;
