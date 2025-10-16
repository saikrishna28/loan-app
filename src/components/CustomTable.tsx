import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { loanData } from "../data/loanData";
import { BiSpreadsheet } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  calculateAccumulatedInterest,
  calculateMonthlyInterest,
  getTimeElapsed,
} from "../utils/helper";
import { ExtendedLoanData, LoanData } from "../model/LoanData";

export default function CustomTable() {
  let totalPrincipalAccumulated: number = 0;
  let monthlyInterestAccumulated: number = 0;
  let totalInterestAccumulated: number = 0;
  let totalPendingInterest: number = 0;
  let totalAmountAccumulated: number = 0;
  let extendedLoanData: ExtendedLoanData[] = [...loanData];
  const updatedExtendedLoanData: ExtendedLoanData[] = [];
  const navigate = useNavigate();

  const showDetails = (row: ExtendedLoanData) => {
    navigate("/details", { state: row });
  };

  const tableData = extendedLoanData.map((row) => {
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
    row.monthlyInterest = monthlyInterest;
    row.totalInterest = totalInterest;
    row.interestPending = interestPending;
    row.totalPending = totalAmount;
    updatedExtendedLoanData.push(row);
    return (
      <TableRow
        key={row.borrower}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
          "&:nth-of-type(odd)": { backgroundColor: "#ffffff" },
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
            <span style={{ cursor: "pointer" }}>{row.borrower}</span>
            <BiSpreadsheet
              style={{ fontSize: "x-large" }}
              onClick={() => showDetails(row)}
            />
          </div>
        </TableCell>
        <TableCell align="right">{row.loanAmt}</TableCell>
        <TableCell align="right">{row.loanTakenDate.toDateString()}</TableCell>
        <TableCell align="right">{getTimeElapsed(row.loanTakenDate)}</TableCell>
        <TableCell align="right">{row.roi}</TableCell>
        <TableCell align="right">{monthlyInterest.toFixed(2)}</TableCell>
        <TableCell align="right">
          {row.borrower.includes("Chinna")
            ? (totalInterest - 1000).toFixed(2)
            : totalInterest.toFixed(2)}
        </TableCell>
        <TableCell align="right">{row.interestPaid}</TableCell>
        <TableCell align="right">{interestPending.toFixed(2)}</TableCell>
        <TableCell align="right">{totalAmount.toFixed(2)}</TableCell>
      </TableRow>
    );
  });
  console.log("updatedExtendedLoanData:", updatedExtendedLoanData);
  const lendersData: Record<string, ExtendedLoanData[]> =
    extendedLoanData.reduce(
      (acc: Record<string, ExtendedLoanData[]>, data: ExtendedLoanData) => {
        if (!acc[data.lender]) {
          acc[data.lender] = [];
        }
        acc[data.lender].push(data);
        return acc;
      },
      {}
    );
  console.log("Lenders Data:", lendersData);
  console.log("Object.entries(lendersData)", Object.entries(lendersData));

  return (
    <>
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
            {tableData}
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h2>Individual Lendings</h2>
        {Object.entries(lendersData).map(([lender, loans]) => {
          let totalPrincipalAccumulated2: number = 0;
          let totalMonthlyInterestAccumulated: number = 0;
          let totalInterestAccumulated: number = 0;
          let totalPendingInterest: number = 0;
          let totalAmountAccumulated: number = 0;
          return (
            <>
              <h3 key={lender}>{lender}</h3>
              <div key={lender + "div"} style={{ marginBottom: "2rem" }}>
                <TableContainer component={Paper} key={lender + "table"}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow key={lender + "head"}>
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
                      {loans.map((loan) => {
                        totalPrincipalAccumulated2 += loan.loanAmt;
                        totalMonthlyInterestAccumulated +=
                          loan.monthlyInterest || 0;
                        totalInterestAccumulated += loan.totalInterest || 0;
                        totalPendingInterest += loan.interestPending || 0;
                        totalAmountAccumulated += loan.totalPending || 0;
                        return (
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
                            <TableCell>{loan.borrower}</TableCell>
                            <TableCell align="right">{loan.loanAmt}</TableCell>
                            <TableCell align="right">
                              {loan.loanTakenDate.toDateString()}
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
                        );
                      })}
                      <TableRow key={lender + "total"}>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">
                          {totalPrincipalAccumulated2}
                        </TableCell>
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
            </>
          );
        })}
      </div>
    </>
  );
}
