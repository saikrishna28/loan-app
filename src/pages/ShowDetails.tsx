import { ExtendedLoanData, LoanData } from "../model/LoanData";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { BiSolidChevronLeft } from "react-icons/bi";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function ShowDetails() {
  const location = useLocation();
  const extLoanData = location.state as ExtendedLoanData | undefined;
  //   const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dayjs(extLoanData?.loanTakenDate)
  );
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs());
  const [totalPayable, setTotalPayable] = useState<number>(0);
  if (!extLoanData) {
    return <div>No data available</div>;
  }

  const entries = Object.entries(extLoanData);
  const fields = [];
  for (let i = 0; i < entries.length; i += 2) {
    const pair = entries.slice(i, i + 2);
    fields.push(
      <div key={i} style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        {pair.map(([key, val]) => (
          <div key={key} style={{ flex: 1 }}>
            <TextField
              id={`outlined-${key}`}
              label={key}
              InputProps={{ readOnly: true }}
              defaultValue={
                val == null
                  ? ""
                  : typeof val === "number"
                  ? String(val.toFixed(2)) + ("roi" === key ? " %" : "")
                  : String(key === "loanTakenDate" ? val.toDateString() : val)
              }
              fullWidth
            />
          </div>
        ))}
        {pair.length === 1 && <div style={{ flex: 1 }} />}
      </div>
    );
  }

  const calculateLoan = () => {
    if (!!fromDate && !!toDate) {
      const currentDate = new Date();
      const timeDifferenceInMonths = toDate.diff(fromDate, "month", true); // fractional months
      const timeDifferenceInDays = toDate.diff(fromDate, "days", true); // fractional months
      //   const monthsWhole = Math.floor(timeDifference);
      console.log(
        "Months (fractional):",
        timeDifferenceInMonths,
        "Days (fractional):",
        timeDifferenceInDays
      );
      const totalInMonths =
        (extLoanData.loanAmt * extLoanData.roi * timeDifferenceInMonths) / 1200;
      setTotalPayable(totalInMonths);
    } else {
      alert("Please select both From Date and To Date");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          paddingBottom: "1rem",
          textAlign: "justify",
          paddingLeft: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BiSolidChevronLeft />
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onMouseEnter={(e: any) => {
            const el = e.currentTarget as HTMLSpanElement;
            el.style.color = "blue";
            el.style.textDecoration = "underline";
          }}
          onMouseLeave={(e: any) => {
            const el = e.currentTarget as HTMLSpanElement;
            el.style.color = "";
            el.style.textDecoration = "none";
          }}
          onClick={() => {
            window.history.back();
          }}
        >
          HOME
        </span>
      </div>
      <div>{fields}</div>
      <div style={{ marginTop: "2rem", fontStyle: "italic", color: "#555" }}>
        <h2>Calculate Loan</h2>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
            />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={calculateLoan}>
            Calculate
          </Button>
        </div>
        <br></br>
      </div>
      {totalPayable !== 0 && (
        <div>
          <span style={{ fontSize: "large", fontWeight: "bold" }}>
            Total Payable is : ₹ {totalPayable.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
