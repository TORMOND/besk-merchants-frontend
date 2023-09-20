import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    // Function to create an order on your server
    const createOrder = () => {
      return axios.post('/api/orders', {
        cart: [
          {
            sku: 'YOUR_PRODUCT_STOCK_KEEPING_UNIT',
            quantity: 'YOUR_PRODUCT_QUANTITY',
          },
        ],
      })
        .then((response) => response.data.id);
    };

    // Function to capture the payment
    const capturePayment = (orderId) => {
      return axios.post(`/api/orders/${orderId}/capture`)
        .then((response) => response.data)
        .then((orderData) => {
          const transaction = orderData.purchase_units[0].payments.captures[0];
          alert(`Transaction ${transaction.status}: ${transaction.id}`);
        })
        .catch((error) => {
          alert('Payment could not be captured! ' + JSON.stringify(error));
        });
    };

    // Render PayPal buttons
    paypal.Buttons({
      createOrder: createOrder,
      onApprove: (data) => {
        return capturePayment(data.orderID);
      },
    }).render('#paypal-button-container');

    // Check if Hosted Fields are eligible and render them
    if (paypal.HostedFields.isEligible()) {
      const orderIdRef = React.createRef();

      paypal.HostedFields.render({
        createOrder: createOrder,
        styles: {
          '.valid': {
            color: 'green',
          },
          '.invalid': {
            color: 'red',
          },
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123',
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY',
          },
        },
      }).then((cardFields) => {
        document.querySelector('#card-form').addEventListener('submit', (event) => {
          event.preventDefault();
          cardFields.submit({
            cardholderName: document.getElementById('card-holder-name').value,
            billingAddress: {
              streetAddress: document.getElementById('card-billing-address-street').value,
              extendedAddress: document.getElementById('card-billing-address-unit').value,
              region: document.getElementById('card-billing-address-state').value,
              locality: document.getElementById('card-billing-address-city').value,
              postalCode: document.getElementById('card-billing-address-zip').value,
              countryCodeAlpha2: document.getElementById('card-billing-address-country').value,
            },
          }).then(() => {
            capturePayment(orderIdRef.current);
          });
        });
      });
    } else {
      document.querySelector('#card-form').style.display = 'none';
    }
  }, []);

  return (
    <div className="App">
      <div id="paypal-button-container" className="paypal-button-container"></div>
      <div className="card_container">
        <form id="card-form">
          <label htmlFor="card-number">Card Number</label>
          <div id="card-number" className="card_field"></div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <label htmlFor="expiration-date">Expiration Date</label>
              <div id="expiration-date" className="card_field"></div>
            </div>
            <div style={{ marginLeft: '10px' }}>
              <label htmlFor="cvv">CVV</label>
              <div id="cvv" className="card_field"></div>
            </div>
          </div>
          <div>
            <label htmlFor="card-holder-name">Name on Card</label>
            <input
              type="text"
              id="card-holder-name"
              name="card-holder-name"
              autoComplete="off"
              placeholder="card holder name"
            />
          </div>
          <div>
            <label htmlFor="card-billing-address-street">Billing Address</label>
            <input
              type="text"
              id="card-billing-address-street"
              name="card-billing-address-street"
              autoComplete="off"
              placeholder="street address"
            />
          </div>
          <div>
            <label htmlFor="card-billing-address-unit">&nbsp;</label>
            <input
              type="text"
              id="card-billing-address-unit"
              name="card-billing-address-unit"
              autoComplete="off"
              placeholder="unit"
            />
          </div>
          <div>
            <input
              type="text"
              id="card-billing-address-city"
              name="card-billing-address-city"
              autoComplete="off"
              placeholder="city"
            />
          </div>
          <div>
            <input
              type="text"
              id="card-billing-address-state"
              name="card-billing-address-state"
              autoComplete="off"
              placeholder="state"
            />
          </div>
          <div>
            <input
