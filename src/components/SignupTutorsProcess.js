import React, {PropTypes} from 'react';
import { Link } from 'react-router';

function getTutorStatus(status) {
  const tutorStatus = {
    firstStep: {},
    secondStep: {},
    thirdStep: {},
  };
  switch(status) {
    case 'pending':
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = false;
      tutorStatus.secondStep.active = false;
      tutorStatus.secondStep.success = false;
      tutorStatus.secondStep.failure = false;
      tutorStatus.thirdStep.active = false;
      tutorStatus.thirdStep.success = false;
      break;
    case 'waiting':
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = true;
      tutorStatus.secondStep.active = true;
      tutorStatus.secondStep.success = false;
      tutorStatus.secondStep.failure = false;
      tutorStatus.thirdStep.active = false;
      tutorStatus.thirdStep.success = false;
      break;
    case 'accepted':
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = true;
      tutorStatus.secondStep.active = true;
      tutorStatus.secondStep.success = true;
      tutorStatus.secondStep.failure = false;
      tutorStatus.thirdStep.active = true;
      tutorStatus.thirdStep.success = false;
      break;
    case 'rejected':
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = true;
      tutorStatus.secondStep.active = true;
      tutorStatus.secondStep.success = false;
      tutorStatus.secondStep.failure = true;
      tutorStatus.thirdStep.active = false;
      tutorStatus.thirdStep.success = false;
      break;
    case 'complete':
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = true;
      tutorStatus.secondStep.active = true;
      tutorStatus.secondStep.success = true;
      tutorStatus.secondStep.failure = false;
      tutorStatus.thirdStep.active = true;
      tutorStatus.thirdStep.success = true;
      break;
    default:
      tutorStatus.firstStep.active = true;
      tutorStatus.firstStep.success = false;
      tutorStatus.secondStep.active = false;
      tutorStatus.secondStep.success = false;
      tutorStatus.secondStep.failure = false;
      tutorStatus.thirdStep.active = false;
      tutorStatus.thirdStep.success = false;
  }
  return tutorStatus;
}

class SignupTutorsProcess extends React.Component {
  render() {
    const { status } = this.props;
    const tutorStatus = getTutorStatus(status);
    const enableStep2Class = tutorStatus.secondStep.active ? 'box box--enabled' : '';
    const enableStep3Class = tutorStatus.thirdStep.active ? 'box box--enabled' : '';

    function renderStep1(tutorStatus) {
      if(tutorStatus.firstStep.success) {
        return (
          <div>
            <img className="box__icon" src={require('../assets/images/check-icon-complete.png')} />
            <span className="box__description">Has completado tu perfil satisfactoriamente en nuestra base de datos.</span>
          </div>
        );
      }
      return (
        <div>
          <img className="box__icon" src={require('../assets/images/form-icon.png')} />
          <span className="box__description">Para continuar con el proceso de registro primero debes completar tu información.</span>
          <Link className="box__button button button--dark-green" to="/tutores/perfil" >Completar</Link>
        </div>
      );
    }

    function renderStep2(tutorStatus) {
      if(tutorStatus.secondStep.failure) {
        return (
          <div>
            <img className="box__icon" src={require('../assets/images/failure-icon.png')} />
            <span className="box__description">Lamentablemente no pasaste el filtro para ser aceptado como tutor en nuestra plataforma.</span>
          </div>
        );
      } else if(tutorStatus.secondStep.success && tutorStatus.thirdStep.active) {
        return (
          <div>
            <img className="box__icon" src={require('../assets/images/check-icon-complete.png')} />
            <span className="box__description">¡Felicidades!. Has pasado el filtro que te permite continuar con el proceso de registro como tutor.</span>
          </div>
        );
      }
      return (
        <div>
          <img className="box__icon" src={require('../assets/images/mail-icon.png')} />
          <span className="box__description">Te llegará un correo con un enlace para que agendes una entrevista con nosotros en donde validaremos tus aptitudes y conocimientos como Tutor.</span>
        </div>
      );
    }

    return (
      <div className="section__auth">
        <div className="hero__tutor" />
        <div className="container container--small">
          <p className="push--ends soft--ends Amaranth weight--light text--larger">Completa los siguientes pasos para registrarte satisfactoriamente como tutor en Brains-Tutors.</p>
          <div className="box box--enabled">
            { renderStep1(tutorStatus) }
          </div>
          <div className={`box ${enableStep2Class}`} >
            { renderStep2(tutorStatus) }
          </div>
          <div className={`box ${enableStep3Class}`}>
            <img className="box__icon" src={require('../assets/images/money-icon.png')} />
            <span className="box__description">Completa tu información bancaria en la cual podamos transferir el pago por tus clases realizadas.</span>
            <Link className="box__button button button--dark-green" disabled={!tutorStatus.thirdStep.active} to="/tutores/informacion-bancaria">Completar</Link>
          </div>
        </div>
      </div>
    );
  }
}

SignupTutorsProcess.propTypes = {
  status: PropTypes.string,
};

export default SignupTutorsProcess;
