import './style.css';
function CardBills({ bgColor, title, img, value }) {
  // if (img === 'paidBillings') {
  //   return paidBillings;
  // } else if (img === 'expiredBillings') {
  //   return expiredBillings;
  // } else {
  //   return expiredBillings;
  // }
  return (
    <div className="container-card-bills">
      <div className={`card-bills ${bgColor}`} >
        <img src={img} alt={`${bgColor} bills`} />
        <div className="info-card-bills">
          <h3 className="paid-bills">{title}</h3>
          <p className="paid-bills-value">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default CardBills;