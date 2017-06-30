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

    if (action === 'message') {
      if(message) {
        onSendMessage(receiverId, message);
      } else {
        Alert.error('Tienes que escribir un mensaje.');
      }
    } else {
      onUpdatingScheduleStatus(role, data, status, selectedPage);
    }
  }

  render() {
    const { isOpen, action } = this.props;

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
            : action === 'rejected' ? 'Rechazar Tutoria' : 'Enviar Mensaje'}
            </h2>
            <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
          </div>
          <div className="Modal__body Modal__body--center">
            {action === 'confirmed' || action === 'accepted_awaiting_payment' ?
              <p>¿Estas seguro que quieres aceptar esta tutoria?</p>
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
};

export default ModalScheduleAction;
