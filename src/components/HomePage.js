import React from 'react';
import Footer from './Footer';

const HomePage = () => {
  const wistia1Styles = {
    padding: '56.25% 0 0 0', 
    position: 'relative',
  };
  const wistia2Styles = {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  };
  const wistia3Styles = {
    height: '100%',
    width: '100%',
  };
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="grid no-space">
            <div className="grid__item medium--two-fifths one-whole">
              <h1 className="hero__title">Bienvenido a la plataforma de tutores</h1>
            </div>
            <div className="grid__item medium--three-fifths one-whole">
              <div className="wistia_responsive_padding" style={wistia1Styles}>
                <div className="wistia_responsive_wrapper" style={wistia2Styles}>
                  <div className="wistia_embed wistia_async_031ny7tr3t videoFoam=true" style={wistia3Styles}>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section--gray section--padding-btm">
        <h1 className="hidden">Como funciona</h1>
        <div className="container container--small">
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item medium--one-half one-whole">
              <img className="section__image" src={require('../assets/images/step1.png')} />
            </div>
            <div className="grid__item medium--one-half one-whole">
              <h2 className="section__subtitle">Busca tu tutor</h2>
              <p className="section__description">Encuentra el tutor que necesitas. Contamos con una lista de tutores que podras filtrar por materia.</p>
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle grid--rev">
            <div className="grid__item medium--one-half one-whole">
              <img className="section__image" src={require('../assets/images/step2.png')} />
            </div>
            <div className="grid__item medium--one-half one-whole">
              <h2 className="section__subtitle">Selecciona</h2>
              <p className="section__description">Revisa el perfil de los tutores para verificar si es el indicado para ti.</p>
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle">
            <div className="grid__item medium--one-half one-whole">
              <img className="section__image" src={require('../assets/images/step3.png')} />
            </div>
            <div className="grid__item medium--one-half one-whole">
              <h2 className="section__subtitle">Contacta tu tutor</h2>
              <p className="section__description">Conoce a tu tutor previamente con nuestra modalidad gratuita de "conoce a tu tutor" y define si es la persona adecuada para despejar tus dudas.</p>
            </div>
          </div>
          <div className="grid no-space push--bottom grid--middle grid--rev">
            <div className="grid__item medium--one-half one-whole">
              <img className="section__image" src={require('../assets/images/step4.png')} />
            </div>
            <div className="grid__item medium--one-half one-whole">
              <h2 className="section__subtitle">Empecemos</h2>
              <p className="section__description">¡Estamos listos! Con nuestra plataforma puedes tomar tu tutoría desde cualquier lugar con acceso a Internet</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
