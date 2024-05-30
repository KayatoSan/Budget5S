import { Route, Routes, BrowserRouter } from "react-router-dom";

// ACCOUNTS
import Accounts from "./finances/accounts/Accounts";
import AddAccounts from "./finances/accounts/AddAccounts";
import EditAccount from "./finances/accounts/EditAccount";
// BUCKETS
import Buckets from "./finances/buckets/Buckets";
import CreateBucket from "./finances/buckets/CreateBucket";
import ListBuckets from "./finances/buckets/ListBucket";
import EditBucket from "./finances/buckets/EditBucket";
// VAULTS
import Vaults from "./finances/vaults/Vaults";
import CreateVault from "./finances/vaults/CreateVault";
import ListVaults from "./finances/vaults/ListVault";
import EditVault from "./finances/vaults/EditVault";
// TRANSACTIONS
import AddTransactions from "./finances/transactions/AddTransactions";
import TransactionsVault from "./finances/transactions/TransactionsVault";
import TransactionsVaultList from "./finances/vaults/ListVaultTransactions";
import ListTransactions from "./finances/transactions/ListTransaction";
// EXPENSES
import AddExpense from "./finances/expense/AddExpense";
import ListExpenses from "./finances/expense/ListExpenses";
// MISC
import Listing from "./finances/Listing";
import Layout from "./Layout";
import Footer from "./Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Listing />} />
            <Route path="/bucket/" element={<Buckets />} />
            <Route path="/bucket/create" element={<CreateBucket />} />

            <Route path="/buckets/list" element={<ListBuckets />} />
            <Route path="/buckets/edit/:id" element={<EditBucket />} />

            <Route path="/vault/" element={<Vaults />} />
            <Route path="/vault/create" element={<CreateVault />} />
            <Route path="/accounts/all" element={<Accounts />} />
            <Route path="/accounts/add" element={<AddAccounts />} />
            <Route path="/expense/add" element={<AddExpense />} />
            <Route path="/transactions/add" element={<AddTransactions />} />
            <Route path="/transactions/vault" element={<TransactionsVault />} />
            <Route path="/vault/edit/:id" element={<EditVault />} />
            <Route path="/account/edit/:id" element={<EditAccount />} />

            <Route path="/transactions/list" element={<ListTransactions />} />
            <Route path="/expenses/list" element={<ListExpenses />} />
            <Route path="/vaults/list" element={<ListVaults />} />
            <Route
              path="/transactions/vault/list"
              element={<TransactionsVaultList />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
