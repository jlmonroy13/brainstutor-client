import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router';

const StepToStepInfo = () => {
  return (
    <div>
      <div className="hero__step-to-step">
        <div className="container">
          <div className="grid no-space">
            <div className="grid__item one-fifth">
              <h1 className="hero__step-to-step-title">Paso</h1>
              <h1 className="hero__step-to-step-title">a Paso</h1>
              <span className="hero__step-to-step-subtitle">Como funciona nuestra plataforma</span>
            </div>
            <div className="grid__item one-half">
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/2ApkwovNqpY"
                frameBorder="0"
                allowFullScreen
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
              <img className="section__image" src={require('../assets/images/step2.png')} />
            </div>
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Selecciona</h2>
              <p className="section__description">Revisa el perfil de los tutores para verificar que si es lo que estabas buscando.</p>
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
              <img className="section__image" src={require('../assets/images/step4.png')} />
            </div>
            <div className="grid__item one-half">
              <h2 className="section__subtitle">Empecemos</h2>
              <p className="section__description">¡Estamos listos! Con nuestra plataforma puedes tomar tu tutoria desde cualquier lugar con acceso a Internet</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section section--gray">
        <div className="container">
          <div className="section-tutor__banner">
            <h2 className="section-tutor__banner-title">Tu espacio de tutoria</h2>
          </div>
        </div>
      </div>
      <div className="section section--gray hard--top">
        <div className="container container--small">
          <div className="grid no-space push--bottom grid--middle text-center">
            <div className="grid__item one-half">
              <img className="section__image--small" src={require('../assets/images/cam-icon.png')} />
              <h2 className="section__subtitle">Contacto por Cámara web</h2>
              <p className="section__description">Al agendar tu cita podras tener contacto desde cualquier lugar con acceso a internet y hablar con tu tutor cara a cara desde la Cámara web.</p>
            </div>
            <div className="grid__item one-half">
              <img className="section__image--small" src={require('../assets/images/document-icon.png')} />
              <h2 className="section__subtitle">Comparte documentos</h2>
              <p className="section__description">Si tienes algún documento que necesite ser revisado por nuestros tutores los puedes compartir por medio de nuestra plataforma web.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__universities">
        <div className="container">
          <h1 className="hero__universities-title">Conoce nuestros tutores</h1>
          <p className="hero__universities-description">Escogemos los mejores tutores de las universidades del pais para brindarte tutorias de excelente calidad</p>
          <Link className="button button--dark-green button--large button--larger" to="ver-tutores">Ver Tutores</Link>
        </div>
      </div>
      <div className="section section--gray section--padding-btm">
        <div className="container container--small text-center">
          <h2 className="section__title">Paga por lo que usas</h2>
          <div className="section__box">
            <p className="section__box-title section__box-title--first">Conoce lo que vas a pagar</p>
            <img className="section__image--small" src={require('../assets/images/time-money-icon.png')} />
          </div>
          <div className="section__box">
            <p className="section__box-title">Conoce tu tutor</p>
            <img className="section__image--small" src={require('../assets/images/screen-icon.png')} />
          </div>
          <div className="section__box">
            <p className="section__box-title">Pago seguro</p>
            <img className="section__image--small" src={require('../assets/images/price-icon.png')} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StepToStepInfo;
