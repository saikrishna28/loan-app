import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { loanData } from "../data/loanData";
import {
  calculateAccumulatedInterest,
  calculateMonthlyInterest,
  getTimeElapsed,
} from "../utils/helper";

export default function CustomTable() {
  let totalPrincipalAccumulated: number = 0;
  let monthlyInterestAccumulated: number = 0;
  let totalInterestAccumulated: number = 0;
  let totalPendingInterest: number = 0;
  let totalAmountAccumulated: number = 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Loan Amount</TableCell>
            <TableCell align="right">Loan Taken Date</TableCell>
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
          {loanData.map((row) => {
            const monthlyInterest = calculateMonthlyInterest(
              row.loanAmt,
              row.roi,
              row.loanTakenDate
            );
            const totalInterest = calculateAccumulatedInterest(
              row.loanAmt,
              row.roi,
              row.loanTakenDate
            );
            const interestPending = row.borrower.includes("Chinna")
              ? totalInterest - row.interestPaid - 1000
              : totalInterest - row.interestPaid;
            const totalAmount = row.loanAmt + interestPending;
            totalPendingInterest += interestPending;
            totalPrincipalAccumulated += row.loanAmt;
            monthlyInterestAccumulated += monthlyInterest;
            totalInterestAccumulated += totalInterest;
            totalAmountAccumulated += totalAmount;
            return (
              <TableRow
                key={row.borrower}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.borrower}
                </TableCell>
                <TableCell align="right">{row.loanAmt}</TableCell>
                <TableCell align="right">
                  {row.loanTakenDate.toDateString()}
                </TableCell>
                <TableCell align="right">
                  {getTimeElapsed(row.loanTakenDate)}
                </TableCell>
                <TableCell align="right">{row.roi}</TableCell>
                <TableCell align="right">
                  {monthlyInterest.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {row.borrower.includes("Chinna")
                    ? (totalInterest - 1000).toFixed(2)
                    : totalInterest.toFixed(2)}
                </TableCell>
                <TableCell align="right">{row.interestPaid}</TableCell>
                <TableCell align="right">
                  {interestPending.toFixed(2)}
                </TableCell>
                <TableCell align="right">{totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">{totalPrincipalAccumulated}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              {monthlyInterestAccumulated.toFixed(2)}
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
  );
}
