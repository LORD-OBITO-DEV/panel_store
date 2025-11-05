import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

export default function PaymentButton({ price, panelId }){
  return (
    <div style={{marginTop:12}}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: price.toString() } }]
          })
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture()
          // envoi preuve au backend pour création définitive
          await fetch('/api/paypal/capture', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ orderID: order.id, panelId }) })
          window.location.href = '/success'
        }}
      />
    </div>
  )
}
