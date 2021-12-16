import "./style.css";
function CardBills({ bgColor, title, img, value }) {
  return (
    <div className="container-card-bills">
      <div className={`card-bills ${bgColor}`}>
        <img src={img} alt={`${bgColor} bills`} />
        <div className="info-card-bills">
          <h3 className="paid-bills color-card">{title}</h3>
          <p className={`paid-bills-value color-card`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default CardBills;
