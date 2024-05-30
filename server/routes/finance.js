const express = require("express");
const router = express.Router();

// ACCOUNTS
const accounts = require("../controllers/accounts/accounts.controller");
// BUCKETS
const buckets = require("../controllers/buckets/buckets.controller");
const listBucket = require("../controllers/buckets/listBucket.controller");

// VAULTS
const vault = require("../controllers/vaults/vault.controller");
const vaultList = require("../controllers/vaults/vaultList.controller");
const createVault = require("../controllers/vaults/createVault.controller");
const transactionVaultList = require("../controllers/vaults/transactionVaultList.controller");
const transactionVault = require("../controllers/transactions/transactionVault.controller");
// TRANSACTIONS
const transactions = require("../controllers/transactions/transactions.controller");
const transactionsList = require("../controllers/transactions/transactionsList.controller");
// EXPENSES
const addExpense = require("../controllers/expense/addExpense.controller");
const expensesList = require("../controllers/expense/expensesList.controller");
// USEFUL
const notifications = require("../controllers/notifications/notifications.controller");
// MISC
const allCategory = require("../controllers/category/allCategory.controller");
const addCategory = require("../controllers/category/addCategory.controller");

// ROUTER

// ACCOUNTS 
router.get("/all/accounts", accounts.get); // GET the list of all accounts
router.post("/accounts/add", accounts.post); // POST for add an account
// BUCKETS
router.get("/buckets/list", listBucket.get);

router.get("/buckets/:year/:month/", buckets.get); // GET The bucket monthly
router.post("/buckets/create", buckets.post); // POST for creating an new bucket
router.get("/buckets/:year/:month/", buckets.get); // GET The bucket monthly

// VAULTS
router.get("/transactions/vaults/list", transactionVaultList.get);

router.get("/vaults/list", vaultList.get);

router.get("/transactions/vaults/", transactionVault.get);
router.post("/transactions/vaults/", transactionVault.post);
router.get("/vaults/:year/:month/", vault.get);
router.get("/vaults/create", createVault.get);
router.post("/vaults/create", createVault.post);
// TRANSACTIONS
router.get("/transactions/list/", transactionsList.get);

router.get("/transactions/add", transactions.get);
router.post("/transactions/add", transactions.post);
// EXPENSE
router.get("/expenses/list/", expensesList.get);

router.get("/expenses/add/", addExpense.get);
router.post("/expenses/add/", addExpense.post);
// MISC
router.get("/category/all", allCategory.get);
router.post("/category/add", addCategory.post);











router.get("/", notifications.get);
router.post("/", notifications.post);

module.exports = router;
