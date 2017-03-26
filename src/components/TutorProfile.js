import React, {PropTypes} from 'react';
import Footer from './Footer';
import Gravatar from 'react-gravatar';
import { showUser } from '../requests/users';
import ReactModal from 'react-modal';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';
import { browserHistory } from 'react-router';

class TutorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor: {},
      showModal: false,
      isSignUp: true,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      textMessage: '',
      goTo: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.activateSignUp = this.activateSignUp.bind(this);
    this.activateLogIn = this.activateLogIn.bind(this);
    this.onChangeFormLogin = this.onChangeFormLogin.bind(this);
    this.onSubmitFormLogin = this.onSubmitFormLogin.bind(this);
    this.onChangeFormSignup = this.onChangeFormSignup.bind(this);
    this.onSubmitFormSignup = this.onSubmitFormSignup.bind(this);
    this.validateEmptyFields = this.validateEmptyFields.bind(this);
    this.onSendTextMessage = this.onSendTextMessage.bind(this);
    this.onGoToKnowUTutor = this.onGoToKnowUTutor.bind(this);
    this.onGoToScheduleTutor = this.onGoToScheduleTutor.bind(this);
  }

  componentWillMount() {
    const id = this.props.params.id;
    showUser(id, 'teacher').then((response) => {
      this.setState({ tutor: response.data });
    });
  }

  onChangeFormLogin(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitFormLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.userLogInRequest(this.state);
      this.handleCloseModal();
    } else {
      Alert.error(`Debes llenar todos los campos`);
    }

  }

  onChangeFormSignup(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateEmptyFields() {
    const { state } = this;
    return !!state.email && !!state.firstName && !!state.lastName && !!state.password && !!state.passwordConfirmation;
  }

  onSubmitFormSignup(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordConfirmation && this.validateEmptyFields()) {
      this.props.userSignupRequest(this.state);
      this.handleCloseModal();
    } else  if (!this.validateEmptyFields()) {
      Alert.error(`Todos los campos deben ser completados.`);
    } else {
      Alert.error(`Las contraseñas no coinciden`);
    }
  }

  onSendTextMessage() {
    const { textMessage } = this.state;
    const { userInfo } = this.props;
    if (!textMessage) {
      Alert.error(`¡Escribe un mensaje!`);
    } else if (textMessage && !userInfo.first_name) {
      this.handleOpenModal();
    } else {
      Alert.success(`Tu mensaje ha sido enviado`);
    }
  }

  onGoToKnowUTutor() {
    this.setState({ goTo: 'know-your-tutor' });
    const { userInfo } = this.props;
    const { tutor } = this.state;
    delete tutor.bank_information;
    this.props.storeTutorInfo(tutor);
    this.props.onSetAppointmenteType('free');
    localStorage.setItem('tutorInfo', JSON.stringify(tutor));
    if (!userInfo.first_name) {
      this.handleOpenModal();
    } else {
      browserHistory.push('/estudiantes/conoce-tu-tutor');
    }
  }

  onGoToScheduleTutor() {
    this.setState({ goTo: 'schedule-tutor' });
    this.props.onSetAppointmenteType('paid');
    const { userInfo } = this.props;
    if (!userInfo.first_name) {
      this.handleOpenModal();
    } else {
      browserHistory.push('/estudiantes/agendar-tutoria');
    }
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
    const { tutor, isSignUp, textMessage } = this.state;
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
                    <textarea
                      className="main-form__textarea main-form__textarea--border push--bottom"
                      value={textMessage}
                      onChange={(e) => this.setState({ textMessage: e.target.value })}
                    />
                    <button
                      className="button button--dark-green button--block button--large"
                      onClick={this.onSendTextMessage}
                    >{`Contactar a ${tutor.first_name}`}</button>
                  </div>
                </div>
                <div className="grid">
                  <div className="grid__item one-half">
                    <button
                      className="button button--light-green button--block button--large"
                      onClick={this.onGoToKnowUTutor}
                    >Conoce a tu tutor</button>
                  </div>
                  <div className="grid__item one-half">
                    <button
                      className="button button--blue button--block button--large"
                      onClick={this.onGoToScheduleTutor}
                    >Agendar Tutoria</button>
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
          contentLabel="Autenticación"
        >
          <div className="Modal__content">
            <div className="Modal__header">
              <h2 className="Modal__header-title">Tu mensaje esta listo para ser enviado</h2>
              <span className="Modal__btn-close" onClick={this.handleCloseModal}>&#120;</span>
            </div>
            <div className="Modal__body">
              {isSignUp ?
                <form onSubmit={this.onSubmitFormSignup} autoComplete="off">
                  <p className="Modal__body-description">Para poder enviar tu mensaje y recibir respuesta, por favor crea una cuenta gratuita.</p>
                  <TextFieldGroup
                    value={this.state.firstName}
                    onChange={this.onChangeFormSignup}
                    type="text"
                    field="firstName"
                    label="Nombre"
                  />
                  <TextFieldGroup
                    value={this.state.lastName}
                    onChange={this.onChangeFormSignup}
                    type="text"
                    field="lastName"
                    label="Apellido"
                  />
                  <TextFieldGroup
                    value={this.state.email}
                    onChange={this.onChangeFormSignup}
                    type="email"
                    field="email"
                    label="Correo Electrónico"
                  />
                  <TextFieldGroup
                    value={this.state.password}
                    onChange={this.onChangeFormSignup}
                    type="password"
                    field="password"
                    label="Contraseña"
                  />
                  <TextFieldGroup
                    value={this.state.passwordConfirmation}
                    onChange={this.onChangeFormSignup}
                    type="password"
                    field="passwordConfirmation"
                    label="Confirmar Contraseña"
                  />
                  <button
                    className={`button button--large button--block button--blue push-half--top`}
                  >Registrarse</button>
                  <p className="Modal__body-footer">¿Ya tienes una cuenta? <span className="Modal__body-footer-link" onClick={this.activateLogIn}>¡Ingresa ya!</span></p>
                </form>
              :
                <form onSubmit={this.onSubmitFormLogin} autoComplete="off">
                  <p className="Modal__body-description">Para poder enviar tu mensaje y recibir respuesta, por favor ingresa con tu cuenta.</p>
                  <TextFieldGroup
                    value={this.state.email}
                    onChange={this.onChangeFormLogin}
                    type="email"
                    field="email"
                    label="Correo Electrónico"
                  />
                  <TextFieldGroup
                    value={this.state.password}
                    onChange={this.onChangeFormLogin}
                    type="password"
                    field="password"
                    label="Contraseña"
                  />
                  <button
                    className={`button button--large button--block button--blue push-half--top`}
                  >Ingresar</button>
                  <p className="Modal__body-footer">¿Aún no tienes una cuenta? <span className="Modal__body-footer-link" onClick={this.activateSignUp}>¡Registrate!</span></p>
                </form>
              }
            </div>
          </div>
        </ReactModal>
        <Footer />
      </div>
    );
  }
}

TutorProfile.propTypes = {
  userInfo: PropTypes.object,
  params: PropTypes.shape(),
  userLogInRequest: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  storeTutorInfo: PropTypes.func.isRequired,
  onSetAppointmenteType: PropTypes.func.isRequired,
};

export default TutorProfile;
