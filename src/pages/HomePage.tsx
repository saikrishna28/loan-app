import CustomTable from "../components/CustomTable";
import Header from "../components/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import IndividualLendings from "../components/IndividualLendings";
import IndividualClosedLendings from "../components/IndividualClosedLendings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function HomePage() {
  const location = useLocation();
  const username = localStorage.getItem("username") || "";
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  return (
    <>
      <Header title="Loan Details" username={username} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Combined Open Loans" />
          <Tab label="Individual Loans" />
          <Tab label="Closed Loans" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="home-div">
          <CustomTable />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <IndividualLendings />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <IndividualClosedLendings />
      </CustomTabPanel>
    </>
  );
}
