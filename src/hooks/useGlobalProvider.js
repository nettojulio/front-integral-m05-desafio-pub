import { useState } from "react";

function useGlobalProvider() {
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
  const [filter, setFilter] = useState('idCob');
  const [orderClient, setOrderClient] = useState('asc');
  const [orderCharge, setOrderCharge] = useState('asc');
  const [searchCharge, setSearchCharge] = useState([]);
  const [searchClient, setSearchClient] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(0);
  const [cardNotFound, setCardNotFound] = useState(false);
  const [openEditChargeModal, setOpenEditChargeModal] = useState(false);
  const [loader, setLoader] = useState(true);
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
    setLoader
  };
}

export default useGlobalProvider;
