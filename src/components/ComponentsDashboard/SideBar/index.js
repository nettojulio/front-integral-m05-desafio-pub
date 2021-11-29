import "./style.css";
import { ReactComponent as Home } from "../../../assets/home.svg";
import { ReactComponent as HomeSelected } from "../../../assets/homeSelected.svg";
import { ReactComponent as CustomersSidebar } from "../../../assets/customersSidebar.svg";
import { ReactComponent as CustomersSidebarSelected } from "../../../assets/customersSidebarSelected.svg";
import { ReactComponent as Billings } from "../../../assets/billings.svg";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import useSignup from "../../../hooks/useSignup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SideBar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { setChangePages } = useSignup();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePages = (page) => {
    if (page === "resume") {
      setChangePages(page);
      navigate("/resume");
    } else if (page === "client") {
      setChangePages(page);
      navigate("/client");
    } else {
      setChangePages(page);
      navigate("/charge");
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", bgcolor: "#F8F8F9" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minHeight: "100vh",
          width: 108,
          bgcolor: "#F0F0F5",
          pt: 5,
        }}
      >
        <Tab
          label="Home"
          {...a11yProps(0)}
          icon={
            window.location.pathname === "/resume" ? <HomeSelected /> : <Home />
          }
          onClick={() => handleChangePages("resume")}
        />
        <Tab
          label="Clientes"
          {...a11yProps(1)}
          icon={
            window.location.pathname === "/client" ? (
              <CustomersSidebarSelected />
            ) : (
              <CustomersSidebar />
            )
          }
          onClick={() => handleChangePages("client")}
        />
        <Tab
          label="Cobrança"
          {...a11yProps(2)}
          icon={<Billings />}
          onClick={() => handleChangePages("charge")}
        />
      </Tabs>
    </Box>
  );
}
