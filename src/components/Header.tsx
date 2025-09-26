import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  username?: string;
}
const Header: React.FC<HeaderProps> = ({ title, username }) => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        backgroundColor: "#f5f5f5",
        padding: "16px 24px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        className="header-div"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <div
          className="user-div"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <div
            className="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {username && (
              <>
                <BiSolidUser />
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    fontWeight: 500,
                  }}
                >
                  {username}
                </span>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                      navigate("/", { state: { username } });
                      localStorage.removeItem("isAuthenticated");
                      localStorage.removeItem("username");
                    }
                  }}
                >
                  <BiPowerOff />
                </div>
              </>
            )}
          </div>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 600,
            color: "#333",
            width: "15rem",
          }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
