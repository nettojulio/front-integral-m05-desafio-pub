import './style.css';

import NavBar from '../../components/NavBar' ;
import SideBar from '../../components/SideBar';
import ClientModal from '../../components/ClientModal';
import useSignup from "../../hooks/useSignup";

function Client() {
  const { openClientModal, setOpenClientModal } = useSignup();
  
  return (
    <div className="clientContainer">
    <NavBar/>
    <SideBar/>
    <div>Client</div>
    <button onClick={() => setOpenClientModal(true)} className="addNewClient">Add Client</button>
    {openClientModal && <ClientModal/>}
    </div>
  )
}

export default Client;