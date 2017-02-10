import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router';

const SignupIndex = () => {
  return (
    <div className="section__auth">
      <img className="full-width" src={require('../assets/images/hero-authentication.jpg')} />
      <div className="section--padding-btm">
        <div className="section__auth-container">
          <div></div>
          <Link className="button button--block button--dark-green" to="/registro-estudiantes">Estudiantes</Link>
          <Link className="button button--block button--blue" to="/registro-tutores">Tutores</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupIndex;
