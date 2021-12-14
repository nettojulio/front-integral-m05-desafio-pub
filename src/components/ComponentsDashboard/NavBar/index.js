import "./style.css";
import arrowDown from "../../../assets/arrowDown.svg";
import edit from "../../../assets/edit.svg";
import logOut from "../../../assets/logOut.svg";
import UserModal from "../../ComponentsResume/UserModal";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { handleLogout, userData, loadUserProfile } = useFunctions();

  const {
    openUserModal,
    setOpenUserModal,
    changePages,

    openOptions,
    setOpenOptions,
    openClientDetail,
    setOpenClientDetail,
  } = useGlobal();

  const [display, setDisplay] = useState({});

  useEffect(() => {
    loadUserProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    adjustName(userData);
  }, [userData]);

  function adjustName(userName) {
    if (!userName) {
      setDisplay({ avatar: "", complete: "" });
      return;
    }

    if (userName.nome.includes(" ")) {
      const names = userName.nome.split(" ");
      const namesData = {
        avatar: names[0].slice(0, 1) + names[1].slice(0, 1),
        complete: names[0],
      };
      setDisplay(namesData);
    } else {
      const namesData = {
        avatar: userName.nome.slice(0, 1),
        complete: userName.nome,
      };
      setDisplay(namesData);
    }
  }

  function handleModalOptions(e) {
    e.stopPropagation();
    setOpenOptions(!openOptions);
  }

  return (
    <div className="navbar">
      <div className="navbar-info">
        <h1
          onClick={() => setOpenClientDetail(false)}
          className={changePages === "resume" ? "" : "title-client"}
        >
          {changePages === "resume"
            ? "Resumo das cobranças"
            : changePages === "client"
            ? "Clientes"
            : "Cobrança"}
          {openClientDetail ? (
            <>
              <span className="detail-client">{`>`}</span>
              <span className="detail-client">Detalhes do cliente</span>
            </>
          ) : (
            <span></span>
          )}
        </h1>
        <div className="navbar-info-profile">
          <div className="navbar-icon">{display.avatar}</div>
          <span className="navbar-username">{display.complete}</span>
          <div className="userOptionsContainer">
            <img
              onClick={(e) => handleModalOptions(e)}
              src={arrowDown}
              alt="Arrow Down"
              /*Mudar Alt*/
              className="userOptionsGateway"
            />
            {openOptions && (
              <div className="userOptions">
                <div className="arrowUpUserOptions"></div>
                <div
                  onClick={() => setOpenUserModal(true)}
                  className="userOptionsButtons"
                >
                  <img src={edit} alt="Editar" />
                  <span className="userOptionLabel">Editar</span>
                </div>
                <div
                  onClick={() => handleLogout()}
                  className="userOptionsButtons"
                >
                  <img src={logOut} alt="Sair" />
                  <span className="userOptionLabel">Sair</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="divisor"></div>
      {openUserModal && <UserModal />}
    </div>
  );
};

export default NavBar;
