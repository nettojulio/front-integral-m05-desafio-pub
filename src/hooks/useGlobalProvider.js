import { useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [openPass, setOpenPass] = useState(false);
  const [signupPassword, setSignupPassword] = useState([]);
  const [signupDone, setSignupDone] = useState([]);
  const [changePages, setChangePages] = useState("resume");
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [openChargeModal, setOpenChargeModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [clientDetailData, setClientDetailData] = useState([]);
  const [chargeModalValue, setChargeModalValue] = useState([]);
  const [openFilteredCard, setOpenFilteredCard] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailChargeModal, setOpenDetailChargeModal] = useState(false);
  const [filter, setFilter] = useState("idCob");
  const [orderClient, setOrderClient] = useState("asc");
  const [orderCharge, setOrderCharge] = useState("asc");
  const [searchCharge, setSearchCharge] = useState([]);
  const [searchClient, setSearchClient] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(0);
  const [cardNotFound, setCardNotFound] = useState(false);
  const [openEditChargeModal, setOpenEditChargeModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [open, setOpen] = useState(false);
  const [formSignUp, setFormSignUp] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  });
  const [formsLogin, SetFormsLogin] = useState({ email: "", senha: "" });
  const [messageAlert, setMessageAlert] = useState(false);
  const [stateAlert, setStateAlert] = useState("success");
  const [togglePage, setTogglePage] = useState("");
  const [userData, setUserData] = useState("");
  const [clientData, setClientData] = useState([]);
  const [chargeData, setChargeData] = useState([]);
  const [currentCharge, setCurrentCharge] = useState({});


  return {
    signupPassword,
    setSignupPassword,
    signupDone,
    setSignupDone,
    openClientModal,
    setOpenClientModal,
    openEditClientModal,
    setOpenEditClientModal,
    openChargeModal,
    setOpenChargeModal,
    openUserModal,
    setOpenUserModal,
    changePages,
    setChangePages,
    openOptions,
    setOpenOptions,
    openClientDetail,
    setOpenClientDetail,
    clientDetailData,
    setClientDetailData,
    chargeModalValue,
    setChargeModalValue,
    openFilteredCard,
    setOpenFilteredCard,
    openDeleteModal,
    setOpenDeleteModal,
    orderClient,
    setOrderClient,
    orderCharge,
    setOrderCharge,
    filter,
    setFilter,
    inputValue,
    setInputValue,
    searchCharge,
    setSearchCharge,
    searchClient,
    setSearchClient,
    value,
    setValue,
    openDetailChargeModal,
    setOpenDetailChargeModal,
    cardNotFound,
    setCardNotFound,
    openEditChargeModal,
    setOpenEditChargeModal,
    loader,
    setLoader,
    openPass,
    setOpenPass,
    token,
    setToken,
    removeToken,
    open,
    setOpen,
    formSignUp,
    setFormSignUp,
    formsLogin,
    SetFormsLogin,
    messageAlert,
    setMessageAlert,
    stateAlert,
    setStateAlert,
    togglePage,
    setTogglePage,
    userData,
    setUserData,
    clientData,
    setClientData,
    chargeData,
    setChargeData,
    currentCharge,
    setCurrentCharge,
  };
}

export default useGlobalProvider;
