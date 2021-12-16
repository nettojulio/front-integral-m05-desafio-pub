import "./style.css";
import { ReactComponent as Home } from "../../../assets/home.svg";
import { ReactComponent as HomeSelected } from "../../../assets/homeSelected.svg";
import { ReactComponent as CustomersSidebar } from "../../../assets/customersSidebar.svg";
import { ReactComponent as CustomersSidebarSelected } from "../../../assets/customersSidebarSelected.svg";
import { ReactComponent as Billings } from "../../../assets/billings.svg";
import { ReactComponent as BillingsSelected } from "../../../assets/billingsSelected.svg";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import useGlobal from "../../../hooks/useGlobal";

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
  const { setChangePages, setOpenClientDetail, value, setValue } = useGlobal();
  let path = window.location.pathname;

  React.useEffect(() => {
    if (
      (path === "/resume" || path === "/" || path === "/dashboard") &&
      value !== 0
    )
      setValue(0);
    else if (path === "/client" && value !== 1) setValue(1);
    else if (path === "/charge" && value !== 2) setValue(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePages = (page) => {
    if (page === "resume") {
      setChangePages(page);
      setOpenClientDetail(false);
      navigate("/resume");
    } else if (page === "client") {
      setChangePages(page);
      setOpenClientDetail(false);
      navigate("/client");
    } else {
      setChangePages(page);
      setOpenClientDetail(false);
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
            window.location.pathname === "/resume" ? (
              <HomeSelected />
            ) : window.location.pathname === "/dashboard" ? (
              <HomeSelected />
            ) : window.location.pathname === "/" ? (
              <HomeSelected />
            ) : (
              <Home />
            )
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
          icon={
            window.location.pathname === "/charge" ? (
              <BillingsSelected />
            ) : (
              <Billings />
            )
          }
          onClick={() => handleChangePages("charge")}
        />
      </Tabs>
    </Box>
  );
}
