import React from "react"
import IntlCurrencyInput from "react-intl-currency-input"

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const BRLInputMask = ({ valorErrorMessage, setFormSignupUserModalInputs, formSignupUserModalInputs }) => {
  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();

    setFormSignupUserModalInputs({
      ...formSignupUserModalInputs,
      [event.target.name]: value,
    });
  };

  return (
    <IntlCurrencyInput
      name="valor"
      placeholder="Digite o valor"
      className={`inputCharge
                    ${valorErrorMessage ? "chargeErrorSinalization" : undefined}
                  `}
      currency="BRL" config={currencyConfig}
      onChange={handleChange} />
  );
}

export default BRLInputMask;