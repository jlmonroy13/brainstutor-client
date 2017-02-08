import React from 'react';

const HomePage = () => {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="grid no-space">
            <div className="grid__item two-fifths">
              <h1 className="hero__description">Bienvenido a la plataforma de tutores</h1>
            </div>
            <div className="grid__item three-fifths">
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/2ApkwovNqpY"
                frameborder="0"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section section--gray">
        <h1 className="hidden">Como funciona</h1>
        <div className="container container--small">
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item one-half">
              <img className="section__image" src={require('../assets/images/step1.png')} />
            </div>
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Busca tu tutor</h2>
              <p className="section__description">Encuentra el tutor que necesitas, ya sea por tema, universidad o ubicación.</p>
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Selecciona</h2>
              <p className="section__description">Revisa el perfil de los tutores para verificar que si es lo que estabas buscando.</p>
            </div>
            <div className="grid__item one-half">
              <img className="section__image" src={require('../assets/images/step2.png')} />
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item one-half">
              <img className="section__image" src={require('../assets/images/step3.png')} />
            </div>
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Contacta tu tutor</h2>
              <p className="section__description">Conoce a tu tutor previamente a empezar la tutoria y define si es la persona adecuada para despejar tus dudas.</p>
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Empecemos</h2>
              <p className="section__description">¡Estamos listos! Con nuestra plataforma puedes tomar tu tutoria desde cualquier lugar con acceso a Internet</p>
            </div>
            <div className="grid__item one-half">
              <img className="section__image" src={require('../assets/images/step4.png')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
