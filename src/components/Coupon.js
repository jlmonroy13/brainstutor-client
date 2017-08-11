import React, { PropTypes } from 'react';
import Footer from './Footer';


class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.onRenderCoupons = this.onRenderCoupons.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onApplyCode = this.onApplyCode.bind(this);
  }


  onRenderCoupons(coupon, index) {
    return (
      <div className="coupon-list__item" key={index}>
        <p className="coupon-list__item-title">{coupon.code}</p>
        <p className="coupon-list__item-description">{coupon.description}.</p>
        <span className="coupon-list__item-date"><span className="coupon-list__item-bold">Valido:</span> {coupon.valid_from} a {coupon.valid_until}.</span>
      </div>
    );
  }

  onChangeCode(e) {
    const { onSetCoupon } = this.props;
    onSetCoupon(e.target.value);
  }

  onApplyCode() {
    const { onApplyPromoCode, coupon } = this.props;
    onApplyPromoCode(coupon);
  }

  render() {
    const { couponsList, coupon } = this.props;
    return (
      <div>
        <div className="coupon">
          <div className="container">
            <div className="grid grid--rev">
              <div className="grid__item one-whole large--one-half">
                <div className="coupon-card">
                  <div className="coupon-card__header">
                    <img className="coupon-card__icon" src={require('../assets/images/gift.png')} />
                    <h2 className="coupon-card__header-title">Obten descuento en tus tutorías</h2>
                  </div>
                  <div className="coupon-card__body">
                    <p>Si has recibido un código promocional ingrésalo a continuación.</p>
                    <p>Agregaremos el código a tu cuenta para que puedas usarlo en tus próximas tutorías.</p>
                    <p className="coupon-card__small-text">(Ten en cuenta la fecha de validación de tu código para poder usarlo. Este código no tiene ningún valor en dinero).</p>
                    <label htmlFor="coupon-code" className="coupon-card__label">Ingresa tu código</label>
                    <input
                      type="text"
                      placeholder="Escribe tu código promocional"
                      id="coupon-code"
                      className="coupon-card__input"
                      value={coupon}
                      onChange={this.onChangeCode}
                    />
                    <button
                      className="button button--light-green button--block button--large"
                      onClick={this.onApplyCode}
                    >Registra tu código</button>
                  </div>
                </div>
              </div>
              <div className="grid__item one-whole large--one-half">
                <h2 className="coupon-list__title">Tus códigos activos</h2>
                <div className={couponsList.length < 4 ? 'coupon-list' : 'coupon-list coupon-list--scroll'}>
                  { couponsList.length === 0 ? 
                    <p className="coupon-list__no-item">Aún no tienes códigos registrados</p>
                  : couponsList.map(this.onRenderCoupons)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Coupon.propTypes = {
  couponsList: PropTypes.array,
  coupon: PropTypes.string,
  onApplyPromoCode: PropTypes.func.isRequired,
  onSetCoupon: PropTypes.func.isRequired,
};

export default Coupon;
