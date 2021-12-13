import "./style.css";
import edit from "../../../assets/editCustomerGreen.svg";
import useGlobal from "../../../hooks/useGlobal";

function ClientDetailData() {
  const { setOpenEditClientModal, clientDetailData } = useGlobal();

  return (
    <div className="client-data">
      <div className="client-data-title">
        <h2>Dados do cliente</h2>
        <div
          onClick={() => setOpenEditClientModal(true)}
          className="btn edit-client"
        >
          <img src={edit} alt="Icon" />
          <span>Editar Cliente</span>
        </div>
      </div>
      <div className="client-data-personal">
        <div className="personal-info">
          <h3>E-mail</h3>
          <span>{clientDetailData.email}</span>
        </div>
        <div className="personal-info">
          <h3>Telefone</h3>
          <span>{`(${clientDetailData.telefone.slice(0,2)}) ${clientDetailData.telefone.slice(2,7)}-${clientDetailData.telefone.slice(7)}`}</span>
        </div>
        <div className="personal-info">
          <h3>CPF</h3>
          <span>{`${clientDetailData.cpf.slice(0,3)}.${clientDetailData.cpf.slice(3,6)}.${clientDetailData.cpf.slice(6,9)}-${clientDetailData.cpf.slice(9)}`}</span>
        </div>
        <div className="empty-div"></div>
      </div>

      <div className="client-data-address">
        <div className="address-info">
          <h3>Endereço</h3>
          <span>{clientDetailData.endereco}</span>
        </div>
        <div className="address-info">
          <h3>Bairro</h3>
          <span>{clientDetailData.bairro}</span>
        </div>
        <div className="address-info">
          <h3>Complemento</h3>
          <span>{clientDetailData.complemento}</span>
        </div>
        <div className="address-info">
          <h3>CEP</h3>
          <span>{`${clientDetailData.cep.slice(0,5)}-${clientDetailData.cep.slice(5)}`}</span>
        </div>
        <div className="address-info">
          <h3>Cidade</h3>
          <span>{clientDetailData.cidade}</span>
        </div>
        <div className="address-info">
          <h3>UF</h3>
          <span>{clientDetailData.estado}</span>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailData;
