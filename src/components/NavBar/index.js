import "./style.css";
import arrowDown from "../../assets/arrowDown.svg";
import edit from "../../assets/edit.svg";
import logOut from "../../assets/logOut.svg";
import UserModal from "../UserModal";
import useSignup from "../../hooks/useSignup";
import { useState, useEffect } from "react";

const NavBar = () => {
  const {
    openUserModal,
    setOpenUserModal,
    handleLogout,
    userData,
    changePages,
  } = useSignup();
  const [openOptions, setOpenOptions] = useState(false);
  const [display, setDisplay] = useState({});

  useEffect(() => {
    adjustName(userData);
  }, [userData]);

  /*TESTE*/
  function adjustName(userName) {
    /*TO DO - Não carrega ao acessar endereço manualmente*/
    if (!userName) {
      setDisplay({avatar: "", complete: ""})
      return;
    }
    /*TO DO - Não carrega ao acessar endereço manualmente*/
    
    if (userName.nome.includes(" ")) {
      const names = userName.nome.split(" ");
      const namesData = {
        avatar: names[0].slice(0, 1) + ' ' + names[1].slice(0, 1),
        complete: names[0]
      }
      setDisplay(namesData);
    } else {
      const namesData = {
        avatar: userName.nome.slice(0, 1),
        complete: userName.nome
      }
      setDisplay(namesData);
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-info">
        <h1>
          {changePages === "resume"
            ? "Resumo das cobranças"
            : changePages === "client"
            ? "Clientes"
            : "Cobrança"}
        </h1>
        <div className="navbar-info-profile">
          <div className="navbar-icon">{display.avatar}</div>
          <span className="navbar-username">{display.complete}</span>
          <img
            onClick={() => setOpenOptions(!openOptions)}
            src={arrowDown}
            alt="Arrow Down"
          />
          {/* TESTE */}
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
          {/* TESTE */}
        </div>
      </div>
      <div className="divisor"></div>
      {openUserModal && <UserModal />}
    </div>
  );
};

export default NavBar;
