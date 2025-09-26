import CustomTable from "../components/CustomTable";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const username = location.state?.userName || "";
  return (
    <>
      <Header title="Loan Details" username={username} />
      <div className="home-div">
        <CustomTable />
      </div>
    </>
  );
}
