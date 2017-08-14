import React, { PropTypes, Component } from 'react';
import ReactModal from 'react-modal';
import Alert from 'react-s-alert';

class ModalScheduleAction extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onConfirmAction = this.onConfirmAction.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onRenderCoupons = this.onRenderCoupons.bind(this);
  }

  handleCloseModal() {
    this.props.onSetScheduleAction({ action: '', scheduleId: '' });
    this.setState({ message: '' });
  }

  onChangeMessage(e) {
    this.setState({ message: e.target.value });
  }

  onConfirmAction() {
    const {
      role,
      action,
      scheduleId,
      receiverId,
      onUpdatingScheduleStatus,
      onSendMessage,
      status,
      selectedPage,
    } = this.props;
    const { message } = this.state;

    const data = {
      id: scheduleId,
      status: action,
      message,
    };

    const sendMsg = (msg, type) => {
      if(msg) {
        if(type === 'rejected') onUpdatingScheduleStatus(role, data, status, selectedPage);
        onSendMessage(receiverId, msg);
      } else {
        Alert.error('Tienes que escribir un mensaje.');
      }
    };

    if (action === 'message') {
      sendMsg(message, action);
    } else if (action === 'rejected') {
      sendMsg(message, action);
    } else {
      onUpdatingScheduleStatus(role, data, status, selectedPage);
    }
  }

  onRenderCoupons(coupon, index) {
    return (
      <div className="coupon-list__item push--bottom" key={index}>
        <p className="coupon-list__item-title">{coupon.code}</p>
        <p className="coupon-list__item-description">{coupon.description}.</p>
        <p className="coupon-list__item-date push-half--bottom"><span className="coupon-list__item-bold">Valido:</span> {coupon.valid_from} a {coupon.valid_until}.</p>
        <button
          className="button button--blue"
        >Usar Promo</button>
      </div>
    );
  }

  render() {
    const { isOpen, action, couponsList } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Acciones Agendar"
      >
        <div className="Modal__content">
          <div className="Modal__header">
            <h2 className="Modal__header-title">{action === 'confirmed' || action === 'accepted_awaiting_payment' ? 
              'Aceptar Tutoria'
            : action === 'rejected' ? 'Rechazar Tutoria' 
            : action === 'promo' ? 'Elegir Código Promocional' : 'Enviar Mensaje'}
            </h2>
            <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
          </div>
          <div className="Modal__body Modal__body--center">
            {action === 'confirmed' || action === 'accepted_awaiting_payment' ?
              <p>¿Estas seguro que quieres aceptar esta tutoria?</p>
            : action === 'promo' ?
              couponsList.map(this.onRenderCoupons)
            :
              <div className="push--bottom">
                {action !== 'message' ? <p>Para poder rechazar esta tutoria debes escribirle un mensaje a tu estudiante.</p> : null}
                <textArea
                  className="main-form__textarea"
                  onChange={this.onChangeMessage}
                  value={this.state.message}
                />
              </div>
            }
            { action !== 'promo' ?
              <div>
                <button
                  className="button button--blue push-half--right"
                  onClick={this.onConfirmAction}
                >{action === 'message' ? 'Enviar' : 'Aceptar'}</button>
                <button
                  className="button button--transparent-blue"
                  onClick={this.handleCloseModal}
                >Salir</button>
              </div>
            : null}
          </div>
        </div>
      </ReactModal>
    );
  }
}

ModalScheduleAction.propTypes = {
  isOpen: PropTypes.bool,
  scheduleId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  receiverId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  role: PropTypes.string,
  action: PropTypes.string,
  onSetScheduleAction: PropTypes.func,
  onSendMessage: PropTypes.func,
  onUpdatingScheduleStatus: PropTypes.func,
  status: PropTypes.string,
  selectedPage: PropTypes.number,
  couponsList: PropTypes.array,
};

export default ModalScheduleAction;
