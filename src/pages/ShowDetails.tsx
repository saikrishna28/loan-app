import { ExtendedLoanData, LoanData } from "../model/LoanData";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { BiSolidChevronLeft } from "react-icons/bi";
import { getTimeElapsed } from "../utils/helper";

export default function ShowDetails() {
  const location = useLocation();
  const row = location.state as ExtendedLoanData | undefined;
  console.log("row in details:", row);
  if (!row) {
    return <div>No data available</div>;
  }

  const entries = Object.entries(row);
  const fields = [];
  for (let i = 0; i < entries.length; i += 2) {
    const pair = entries.slice(i, i + 2);
    fields.push(
      <div key={i} style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        {pair.map(
          ([key, val]) => (
            console.log("key, val:", key, val, typeof val),
            (
              <div key={key} style={{ flex: 1 }}>
                <TextField
                  id={`outlined-${key}`}
                  label={key}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  defaultValue={
                    val == null
                      ? ""
                      : typeof val === "number"
                      ? String(val.toFixed(2)) + ("roi" === key ? " %" : "")
                      : String(
                          key === "loanTakenDate" ? val.toDateString() : val
                        )
                  }
                  fullWidth
                />
              </div>
            )
          )
        )}
        {pair.length === 1 && <div style={{ flex: 1 }} />}
      </div>
    );
  }

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
    </div>
  );
}
