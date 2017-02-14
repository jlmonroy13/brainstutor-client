import React from 'react';
import { Link } from 'react-router';

const LogInIndex = () => {
  return (
    <div className="section__auth section__auth--index">
      <img className="full-width" src={require('../assets/images/hero-authentication.jpg')} />
      <div className="section__auth-container section__auth-container--index">
        <div className="section__auth-circle">ingresa</div>
        <Link className="button button--large button--block button--dark-green push-half--bottom" to="/estudiantes/ingresar">Estudiantes</Link>
        <Link className="button button--large button--block button--blue push--bottom" to="/tutores/ingresar">Tutores</Link>
        <span className="section__auth-description">¿Aún no tienes una cuenta?</span>
        <Link className="button button--link hard--left" to="/registro" >Registrate</Link>
      </div>
    </div>
  );
};

export default LogInIndex;
