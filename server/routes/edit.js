const express = require("express");
const router = express.Router();

const editBucket = require("../controllers/buckets/editBucket.controller");
const editVault = require("../controllers/vaults/editVault.controller");
const editAccount = require("../controllers/accounts/editAccount.controller")


const bucketCell = require("../controllers/edit/bucketCell.controller")
const vaultCell = require("../controllers/edit/vaultCell.controller")

const deleteBucket = require("../controllers/edit/deleteBucket.controller")
const deleteVault = require("../controllers/edit/deleteVault.controller")
const deleteAccount = require("../controllers/edit/deleteAccount.controller")
const deleteTransaction = require("../controllers/edit/deleteTransaction.controller")
const deleteTransactionVault = require("../controllers/edit/deleteTransactionVault.controller")
const deleteExpense = require("../controllers/edit/deleteExpense.controller")

router.post("/edit/bucketcell", bucketCell.post);

router.post("/edit/vaultcell", vaultCell.post);

router.get("/edit/bucket/:id/", editBucket.get);
router.post("/edit/bucket/:id/", editBucket.post); 


router.get("/edit/vault/:id/", editVault.get);
router.post("/edit/vault/:id/", editVault.post); 

router.get("/edit/account/:id/", editAccount.get);
router.post("/edit/account/:id/", editAccount.post); 


// DELETE

router.post("/edit/bucket/delete/:id/", deleteBucket.post)
router.post("/edit/vault/delete/:id/", deleteVault.post)
router.post("/edit/account/delete/:id/", deleteAccount.post)
router.post("/edit/transaction/delete/:id/", deleteTransaction.post)
router.post("/edit/transaction/vault/delete/:id/", deleteTransactionVault.post)
router.post("/edit/expense/delete/:id/", deleteExpense.post)

module.exports = router;
