const Loan = require("../models/loan");
const Repayment = require("../models/repayment");

const calculateScheduledRepayments = (loan, repayments) => {
  const { _id } = loan;
  const scheduledRepayments = [];
  for (let i = 0; i < repayments.length; i++) {
    const repayment = new Repayment({
      loanId: _id,
      amount: repayments[i].amount,
      totalAmount : repayments[i].amount,  
      date: repayments[i].date,
      satus: "PENDING",
    });
    scheduledRepayments.push(repayment);
  }

  return scheduledRepayments;
};

exports.createLoan = async (req, res) => {
  try {
    const { userId, amount, term, repayments } = req.body;

    const loan = await Loan.create({ userId, amount, term });

    const scheduledRepayments = calculateScheduledRepayments(loan, repayments);

    await Repayment.insertMany(scheduledRepayments);

    return res.status(200).json({
      message: "success",
    });
  } catch {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

exports.getLoansByUserId = async (req, res) => {
  try {
    const  userId  = req.params.id;

    const loans = await Loan.find({ userId });

    return res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRepaymentsByLoanId = async (req, res) => {
  try {
    const loanId = req.params.id;

    const repayments = await Repayment.find({ loanId });
    return res.json(repayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find({}).populate('userId')

    return res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

exports.updateLoanState = async (req, res) => {
  try {
    const { loanId, state } = req.body;

    const loan = await Loan.findOne({ _id: loanId });

    if (!loan) {
      return res.status(404).json({ message: "loan Request not found" });
    }

    if (loan.state !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Request has already been processed" });
    }

    loan.state = state;
    await loan.save();

    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.makeRepayment = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId);

    if (!loan || loan.state === "PAID") {
      return res.status(404).json({ error: "Loan not found or already paid." });
    }

    const pendingRepayments = await Repayment.find({
      loanId,
      status: "PENDING",
    }).sort("dueDate");

    if (pendingRepayments.length === 0) {
      return res.status(400).json({ error: "No pending repayments found." });
    }

    const firstRepayment = pendingRepayments[0];

    if (amount >= firstRepayment.amount) {
      firstRepayment.status = "PAID";
     

      const remainingAmount = amount - firstRepayment.amount;
      const remainingRepayments = pendingRepayments.slice(1);

      firstRepayment.amount = 0;
      await firstRepayment.save();

      if (remainingRepayments.length > 0 && remainingAmount > 0) {
        let remainingRepaymentAmount = remainingAmount;

        for (const repayment of remainingRepayments) {
          if (remainingRepaymentAmount > 0) {
            const remAmt = repayment.amount - remainingRepaymentAmount;
            let newAmount = Math.max(remAmt, 0);
            repayment.amount = newAmount.toString();
            remainingRepaymentAmount =
              remainingRepaymentAmount - repayment.amount;
            if (newAmount === 0) {
              repayment.status = "PAID";
            }
            await repayment.save();
          } else {
            break;
          }
        }
      }

      const allRepaymentsPaid = pendingRepayments.every(
        (repayment) => repayment.status === "PAID"
      );

      if (allRepaymentsPaid) {
        loan.state = "PAID";
        await loan.save();
      }

      res.json({ message: "Repayment successful." });
    } else {
      res.status(400).json({ error: "Repayment amount is insufficient." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
