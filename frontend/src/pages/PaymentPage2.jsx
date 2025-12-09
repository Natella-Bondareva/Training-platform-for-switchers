import React from 'react';
import '../styles/PaymentPage2.css';

const PaymentPage2 = () => {
  return (
    <div className="payment-page-wrapper">
      <main className="payment-page">
        <div className="payment-page__content">

          {/* Ліва колонка — форма оплати */}
          <section className="payment-card">
            <h2 className="payment-card__title">Payment method</h2>
            <p className="payment-card__required">* Required</p>

            <div className="payment-card__method">
              <span className="payment-card__method-label">Payment method</span>
              <label className="payment-radio">
                <input type="radio" name="method" defaultChecked />
                <span>Credit/debit card</span>
              </label>
              <label className="payment-radio">
                <input type="radio" name="method" />
                <span>PayPal</span>
              </label>
            </div>

            <form className="payment-form">
              <div className="payment-form__row">
                <div className="payment-field payment-field--full">
                  <label>
                    Card number*
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                  </label>
                  <div className="payment-card__brands">
                    <span>VISA</span>
                    <span>Mastercard</span>
                    <span>AmEx</span>
                  </div>
                </div>
              </div>

              <div className="payment-form__row">
                <div className="payment-field">
                  <label>
                    Expiration date*
                    <input type="text" placeholder="MM/YY" />
                  </label>
                </div>
                <div className="payment-field">
                  <label>
                    CVV*
                    <input type="password" placeholder="***" />
                  </label>
                </div>
              </div>

              <div className="payment-form__row">
                <div className="payment-field">
                  <label>
                    First name*
                    <input type="text" />
                  </label>
                </div>
                <div className="payment-field">
                  <label>
                    Last name*
                    <input type="text" />
                  </label>
                </div>
              </div>

              <div className="payment-form__row">
                <div className="payment-field">
                  <label>
                    Country*
                    <select defaultValue="Ukraine">
                      <option value="Ukraine">Ukraine</option>
                      <option value="Poland">Poland</option>
                      <option value="Germany">Germany</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="payment-field">
                  <label>
                    Postal code*
                    <input type="text" />
                  </label>
                </div>
              </div>
            </form>
          </section>

          {/* Права колонка — підсумок замовлення */}
          <aside className="summary-card">
            <h2 className="summary-card__title">Review and confirm</h2>

            <div className="summary-row">
              <div className="summary-label">Plan</div>
              <div className="summary-value">Pro</div>
            </div>

            <div className="summary-row">
              <div className="summary-label">Billing</div>
              <div className="summary-value">Monthly</div>
            </div>

            <div className="summary-row">
              <div className="summary-label summary-label--muted">
                Price
              </div>
              <div className="summary-value">$50/month</div>
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <div className="summary-label">Tax</div>
              <div className="summary-value">–</div>
            </div>

            <div className="summary-row summary-row--total">
              <div className="summary-label">Today’s total</div>
              <div className="summary-total">$50</div>
            </div>

            <button className="summary-button">
              Complete payment
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage2;