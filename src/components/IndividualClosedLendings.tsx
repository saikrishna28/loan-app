import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiSpreadsheet } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { loanData } from "../data/loanData";
import { ExtendedLoanData } from "../model/LoanData";
import {
  calculateAccumulatedInterest,
  calculateMonthlyInterest,
  getTimeElapsed,
} from "../utils/helper";

export default function IndividualClosedLendings() {
  const navigate = useNavigate();

  const showDetails = (row: ExtendedLoanData) => {
    navigate("/details", { state: row });
  };

  const extendedLoanData: ExtendedLoanData[] = [...loanData];

  extendedLoanData.forEach((row) => {
    const monthlyInterest = calculateMonthlyInterest(
      row.loanAmt,
      row.roi,
      row.loanTakenDate,
    );
    const totalInterest = calculateAccumulatedInterest(
      row.loanAmt,
      row.roi,
      row.loanTakenDate,
      row.loanClosedDate,
    );
    const interestPending = row.borrower.includes("Chinna")
      ? totalInterest - row.interestPaid - 1000
      : totalInterest - row.interestPaid;
    const totalAmount = !!row.loanClosedDate
      ? interestPending
      : row.loanAmt + interestPending;
    row.monthlyInterest = monthlyInterest;
    row.totalInterest = totalInterest;
    row.interestPending = interestPending;
    row.totalPending = totalAmount;
  });

  const lendersData: Record<string, ExtendedLoanData[]> =
    extendedLoanData.reduce(
      (acc: Record<string, ExtendedLoanData[]>, data: ExtendedLoanData) => {
        if (!acc[data.lender]) acc[data.lender] = [];
        acc[data.lender].push(data);
        return acc;
      },
      {},
    );

  return (
    <div>
      <h2>Individual Lendings</h2>
      {Object.entries(lendersData).map(([lender, loans]) => {
        let totalPrincipalAccumulated2: number = 0;
        let totalMonthlyInterestAccumulated: number = 0;
        let totalInterestAccumulated: number = 0;
        let totalPendingInterest: number = 0;
        let totalAmountAccumulated: number = 0;
        return (
          <React.Fragment key={lender}>
            <h3>{lender}</h3>
            <div style={{ marginBottom: "2rem" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Loan Amount</TableCell>
                      <TableCell align="right">Loan Taken Date</TableCell>
                      <TableCell align="right">Loan Closed Date</TableCell>
                      <TableCell align="right">Total Time Elapsed</TableCell>
                      <TableCell align="right">R O I</TableCell>
                      <TableCell align="right">Monthly Interest</TableCell>
                      <TableCell align="right">Total Interest</TableCell>
                      <TableCell align="right">Interest Paid</TableCell>
                      <TableCell align="right">Interest Pending</TableCell>
                      <TableCell align="right">Total Pending</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loans.map((loan) => {
                      totalPrincipalAccumulated2 += loan.loanAmt;
                      totalMonthlyInterestAccumulated +=
                        loan.monthlyInterest || 0;
                      totalInterestAccumulated += loan.totalInterest || 0;
                      totalPendingInterest += loan.interestPending || 0;
                      totalAmountAccumulated += loan.totalPending || 0;
                      return (
                        loan.loanClosedDate && (
                          <TableRow
                            key={loan.borrower + loan.loanAmt}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:nth-of-type(odd)": {
                                backgroundColor: "#f5f5f5",
                              },
                              "&:nth-of-type(even)": {
                                backgroundColor: "#ffffff",
                              },
                            }}
                          >
                            <TableCell>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ cursor: "pointer" }}>
                                  {loan.borrower}
                                </span>
                                <BiSpreadsheet
                                  style={{ fontSize: "x-large" }}
                                  onClick={() => showDetails(loan)}
                                />
                              </div>
                            </TableCell>
                            <TableCell align="right">{loan.loanAmt}</TableCell>
                            <TableCell align="right">
                              {loan.loanTakenDate.toDateString()}
                            </TableCell>
                            <TableCell align="right">
                              {loan.loanClosedDate
                                ? loan.loanClosedDate.toDateString()
                                : "N/A"}
                            </TableCell>
                            <TableCell align="right">
                              {getTimeElapsed(loan.loanTakenDate)}
                            </TableCell>
                            <TableCell align="right">{loan.roi}</TableCell>
                            <TableCell align="right">
                              {loan.monthlyInterest?.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              {loan.totalInterest?.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              {loan.interestPaid}
                            </TableCell>
                            <TableCell align="right">
                              {loan.interestPending?.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              {loan.totalPending?.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        )
                      );
                    })}
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell align="right">
                        {totalPrincipalAccumulated2}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        {totalMonthlyInterestAccumulated.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {totalInterestAccumulated.toFixed(2)}
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        {totalPendingInterest.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {totalAmountAccumulated.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
