import React, { PropTypes, Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router';

class ModalBeforeOpenTok extends Component {
  constructor() {
    super();

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.props.onSetSessionModalState(false);
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
            <h2 className="Modal__header-title">{data.error ? `¡Ups!` : `Antes de empezar tu tutoria..`}</h2>
            <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
          </div>
          <div className="Modal__body Modal__body--center">
            {data.error ? 
              <div>
                <p className="push-half--bottom">{data.error.substr(0, 41)}</p>
                <p>{data.error.substr(41)}</p>
              </div>
            :
              <div>
                <p>Te recomendamos usar el navegador Google Chrome e instalar la siguiente extensión para tener una mejor experiencia en tu tutoria.</p>
                <a
                  href="https://chrome.google.com/webstore/detail/brains-tutors-sharing/lnelddcefbaegccapdffdfmccgbakgje?hl=es-419&authuser=1"
                  target="_blank"
                  className="push--bottom inline-block underline"
                >Instalar Extensión Brains-Tutors Sharing</a>
                <div>
                  <Link className="button button--blue" to={`/opentok/${data.meetingId}`}>Ir a la tutoria</Link>
                </div>
              </div>
            }
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
