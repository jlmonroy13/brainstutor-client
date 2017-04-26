import React, { PropTypes, Component } from 'react';
import ReactModal from 'react-modal';
// import { Link } from 'react-router';

class ModalBeforeOpenTok extends Component {
  constructor() {
    super();

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onConfirmAction = this.onConfirmAction.bind(this);
  }

  handleCloseModal() {
    this.props.onSetSessionModalState(false);
  }

  onConfirmAction() {
    const {
      role,
      action,
      scheduleId,
      onUpdatingScheduleStatus,
      status,
      selectedPage,
    } = this.props;

    const data = {
      id: scheduleId,
      status: action,
      message: this.state.message,
    };

    onUpdatingScheduleStatus(role, data, status, selectedPage);
  }

  render() {
    const { isModalOpen, data } = this.props;

    return (
      <ReactModal
        isOpen={isModalOpen}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Acciones Agendar"
      >
        <div className="Modal__content">
          <div className="Modal__header">
            <h2 className="Modal__header-title">la vida</h2>
            <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
          </div>
          <div className="Modal__body Modal__body--center">
            <p>¿Estas seguro que quieres aceptar esta tutoria?</p>
            <div>
              <button
                className="button button--blue push-half--right"
                onClick={this.onConfirmAction}
              >Aceptar</button>
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

ModalBeforeOpenTok.propTypes = {
  isModalOpen: PropTypes.bool,
  data: PropTypes.object,
  onSetSessionModalState: PropTypes.func,
};

export default ModalBeforeOpenTok;
