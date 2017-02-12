import React from 'react';
import { Link } from 'react-router';

const SignupIndex = () => {
  return (
    <div className="section__auth section__auth--index">
      <img className="full-width" src={require('../assets/images/hero-authentication.jpg')} />
      <div className="section__auth-container section__auth-container--index">
        <div className="section__auth-circle">registro</div>
        <Link
          className="button button--large button--block button--dark-green push-half--bottom"
          to="/registro-estudiantes"
        >Estudiantes</Link>
        <Link
          className="button button--large button--block button--blue push--bottom"
          to="/registro-tutores"
        >Tutores</Link>
        <span className="section__auth-description">¿Ya tienes una cuenta?</span>
        <Link
          className="button button--link hard--left"
          to="/ingresar"
        >Ingresa</Link>
      </div>
    </div>
  );
};

export default SignupIndex;
