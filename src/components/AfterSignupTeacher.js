import React from 'react';

class AfterSignupTeacher extends React.Component {
  render() {
    return (
      <div>
        <div className="hero__tutor">
          <h1 className="hero__tutor-title-center">¡Gracias por registrarte!</h1>
        </div>
        <div className="section section--gray">
          <div className="container">
            <h2>Solo falta algo...</h2>
            <p className="flush">Te hemos enviado un correo electrónico para que confirmes tu cuenta. Por favor sigue el link en el correo para activar tu cuenta</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AfterSignupTeacher;
