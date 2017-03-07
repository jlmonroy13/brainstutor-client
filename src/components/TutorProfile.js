import React, {PropTypes} from 'react';
import Footer from './Footer';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';
import { showUser } from '../requests/users';
import ReactModal from 'react-modal';
import TextFieldGroup from './TextFieldGroup';

class TutorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor: {},
      showModal: false,
      isSignUp: true,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.activateSignUp = this.activateSignUp.bind(this);
    this.activateLogIn = this.activateLogIn.bind(this);
  }

  componentWillMount() {
    const id = this.props.params.id; 
    showUser(id, 'teacher').then((response) => {
      this.setState({ tutor: response.data });
    });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
    
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  activateLogIn() {
    this.setState({ isSignUp: false });
  }
    
  activateSignUp() {
    this.setState({ isSignUp: true });
  }

  render() {
    const { tutor, isSignUp } = this.state;
    const { profile } = tutor;

    return (
      <div>
        <div className="profile__container">
          <div className="container">
            <div className="grid">
              <div className="grid__item three-fifths">
                <div className="profile">
                  <div className="profile__main">
                    <Gravatar email={tutor.email} size={150} className="profile__main-image" />
                    <div className="profile__main-description">
                      <h1 className="profile__main-title">{`${tutor.first_name} ${tutor.last_name}`}</h1>
                      <p className="profile__main-subtitle">Profesión: {tutor.role} - {profile && profile.university}</p>
                      <span className="profile__main-top-corner">${profile && profile.rate}</span>
                    </div>
                  </div>
                  <div className="profile__body">
                    <h2>Acerca de mi</h2>
                    <p>{profile && profile.about}</p>
                  </div>
                </div>
              </div>
              <div className="grid__item two-fifths">
                <div className="box-message">
                  <div className="box-message__header">
                    <img className="box-message__icon" src={require('../assets/images/mail-icon.png')} />
                    <span className="box-message__header-title">Enviar un mensaje</span>
                  </div>
                  <div className="box-message__body">
                    <label className="main-form__label main-form__label--large">Tu mensaje*</label>
                    <textarea className="main-form__textarea push--bottom" />
                    <button
                      className="button button--dark-green button--block button--large"
                      onClick={this.handleOpenModal}
                    >{`Contactar a ${tutor.first_name}`}</button>
                  </div>
                </div>
                <div className="grid">
                  <div className="grid__item one-half">
                    <Link className="button button--light-green button--block button--large" to="/sesion-conoce-tu-tutor">Conoce a tu tutor</Link>
                  </div>
                  <div className="grid__item one-half">
                    <Link className="button button--blue button--block button--large" to="/estudiantes/agendar-tutoria">Agendar Tutoria</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReactModal 
          isOpen={this.state.showModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="Modal__content">
            <div className="Modal__header">
              <h2 className="Modal__header-title">Tu mensaje esta listo para ser enviado</h2>
              <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
            </div>
            <div className="Modal__body">
              <form onSubmit={this.onSubmitForm} autoComplete="off">
                {isSignUp ?
                  <div>
                    <p className="Modal__body-description">Para poder enviar tu mensaje y recibir respuesta, por favor crea una cuenta gratuita.</p>
                    <TextFieldGroup
                      value={this.state.firstName}
                      onChange={this.onChangeForm}
                      type="text"
                      field="firstName"
                      label="Nombre"
                    />
                    <TextFieldGroup
                      value={this.state.lastName}
                      onChange={this.onChangeForm}
                      type="text"
                      field="lastName"
                      label="Apellido"
                    />
                    <TextFieldGroup
                      value={this.state.email}
                      onChange={this.onChangeForm}
                      type="email"
                      field="email"
                      label="Correo Electrónico"
                    />
                    <TextFieldGroup
                      value={this.state.password}
                      onChange={this.onChangeForm}
                      type="password"
                      field="password"
                      label="Contraseña"
                    />
                    <TextFieldGroup
                      value={this.state.passwordConfirmation}
                      onChange={this.onChangeForm}
                      type="password"
                      field="passwordConfirmation"
                      label="Confirmar Contraseña"
                    />
                    <button
                      className={`button button--large button--block button--blue push-half--top`}
                    >Registrarse</button>
                    <p className="Modal__body-footer">¿Ya tienes una cuenta? <span className="Modal__body-footer-link" onClick={this.activateLogIn}>¡Ingresa ya!</span></p>
                  </div>
                :
                  <div>
                    <p className="Modal__body-description">Para poder enviar tu mensaje y recibir respuesta, por favor ingresa con tu cuenta.</p>
                    <TextFieldGroup
                      value={this.state.email}
                      onChange={this.onChangeForm}
                      type="email"
                      field="email"
                      label="Correo Electrónico"
                    />
                    <TextFieldGroup
                      value={this.state.password}
                      onChange={this.onChangeForm}
                      type="password"
                      field="password"
                      label="Contraseña"
                    />
                    <button
                      className={`button button--large button--block button--blue push-half--top`}
                    >Ingresar</button>
                    <p className="Modal__body-footer">¿Aún no tienes una cuenta? <span className="Modal__body-footer-link" onClick={this.activateSignUp}>¡Registrate!</span></p>
                  </div>
                }
                
              </form>
            </div>
          </div>
        </ReactModal>
        <Footer />
      </div>
    );
  }
}

TutorProfile.propTypes = {
  teachers: PropTypes.shape(),
  params: PropTypes.shape(),
};

export default TutorProfile;
