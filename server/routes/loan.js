const express = require("express");
const router = express.Router();

const {
  createLoan,
  getLoansByUserId,
  getRepaymentsByLoanId,
  getAllLoans,
  updateLoanState,
  makeRepayment,
} = require("../controllers/loan");

router.post("/create", createLoan);
router.get("/loans/:id", getLoansByUserId);
router.get("/repayments/:id", getRepaymentsByLoanId);
router.get("/all-loans", getAllLoans);
router.post("/update", updateLoanState);
router.post("/make-repayment", makeRepayment);

module.exports = router;
