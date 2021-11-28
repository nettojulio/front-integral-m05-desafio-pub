import "./style.css";
import arrowDown from "../../assets/arrowDown.svg";
import edit from "../../assets/edit.svg";
import logOut from "../../assets/logOut.svg";
import UserModal from '../UserModal'
import useSignup from "../../hooks/useSignup";
import {useState} from 'react';

const NavBar = () => {
  const {openUserModal, setOpenUserModal, handleLogout, userData} = useSignup();
  const [openOptions, setOpenOptions] = useState(false)

  return (
    <div className="navbar">
       <div className="navbar-info">
        <h1>Resumo das cobranças</h1>
        <div className="navbar-info-profile">
          <div className="navbar-icon">{userData.nome.slice(0, 1)}</div>
          <span className="navbar-username">{userData.nome}</span>
          <img
            onClick={() => setOpenOptions(!openOptions)}
            src={arrowDown}
            alt="Arrow Down"
          />
          {/* TESTE */}
         {openOptions && <div className="userOptions">
            <div className="arrowUpUserOptions"></div>
            <div onClick={() => setOpenUserModal(true)} className="userOptionsButtons">
              <img src={edit} alt="Editar" />
              <span className="userOptionLabel">Editar</span>
            </div>
            <div onClick={() => handleLogout()} className="userOptionsButtons">
              <img src={logOut} alt="Sair" />
              <span className="userOptionLabel">Sair</span>
            </div>
          </div>}
          {/* TESTE */}
        </div>
      </div>
      <div className="divisor"></div>
      {openUserModal && <UserModal/>}
    </div>
  );
};

export default NavBar;
