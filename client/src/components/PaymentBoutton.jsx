import React from "react";

export default function PaymentButton({ type, onClick }) {
  let label = "";
  switch (type) {
    case "paypal":
      label = "Payer avec PayPal";
      break;
    case "wave":
      label = "Payer avec Wave";
      break;
    case "orange":
      label = "Payer avec Orange Money";
      break;
    default:
      label = "Payer";
  }

  return (
    <button
      className={`payment-button ${type}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
