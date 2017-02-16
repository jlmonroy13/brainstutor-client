import React from 'react';

const SignupTutorsProcess = () => {
  return (
    <div className="section__auth">
      <div className="hero__tutor" />
      <div className="container container--small">
        <p className="push--ends soft--ends Amaranth weight--light text--larger">Completa los siguientes pasos para registrarte satisfactoriamente como tutor en Brains-Tutors.</p>
        <div className="box">
          <img className="box__icon" src={require('../assets/images/form-icon.png')} />
          <span className="box__description">Para continuar con el proceso de registro primero debes completar tu información.</span>
          <button className="box__button button button--dark-green">Completar</button>
        </div>
        <div className="box">
          <img className="box__icon" src={require('../assets/images/mail-icon.png')} />
          <span className="box__description">En estos momentos estamos verificando tus datos, te llegará un correo notificando que puedes continuar con el proceso de registro.</span>
        </div>
        <div className="box">
          <img className="box__icon" src={require('../assets/images/money-icon.png')} />
          <span className="box__description">Por favor suministra tu información bancaria donde podemos transferir el pago por tus clases realizadas.</span>
          <button className="box__button button button--dark-green">Completar</button>
        </div>
      </div>
    </div>
  );
};

export default SignupTutorsProcess;
