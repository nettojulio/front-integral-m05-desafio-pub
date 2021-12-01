import "./style.css";
import useSignup from "../../../hooks/useSignup";
import edit from '../../../assets/editCustomerGreen.svg';

function ClientDetailData() {
  const { setOpenEditClientModal, openClientDetail } = useSignup();

  return (
    <div className="client-data">
      <div className="client-data-title">
        <h2>Dados do cliente</h2>
        <div onClick={() => setOpenEditClientModal(true)} className="btn edit-client">
          <img src={edit} alt="Icon" />
          <span>Editar Cliente</span>
        </div>
      </div>
      <div className="client-data-personal">
        <div className="personal-info">
          <h3>E-mail</h3>
          <span>sarasilva@gmail.com</span>
        </div>
        <div className="personal-info">
          <h3>Telefone</h3>
          <span>71 9 9462 8654</span>
        </div>
        <div className="personal-info">
          <h3>CPF</h3>
          <span>054 365 255 87</span>
        </div>
        <div className="empty-div"></div>
      </div>

      <div className="client-data-address">
        <div className="address-info">
          <h3>Endereço</h3>
          <span>Rua das Cornélias, n°512</span>
        </div>
        <div className="address-info">
          <h3>Bairro</h3>
          <span>Oliveiras</span>
        </div>
        <div className="address-info">
          <h3>Complemento</h3>
          <span>Ap: 502</span>
        </div>
        <div className="address-info">
          <h3>CEP</h3>
          <span>03100 402</span>
        </div>
        <div className="address-info">
          <h3>Cidade</h3>
          <span>Salvador</span>
        </div>
        <div className="address-info">
          <h3>UF</h3>
          <span>BA</span>
        </div>

      </div>
    </div>
  );
}

export default ClientDetailData;