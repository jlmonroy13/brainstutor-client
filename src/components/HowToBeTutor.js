import React, { PropTypes } from 'react';
import Footer from './Footer';
import Alert from 'react-s-alert';

class HowToBeTutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(e) {
    this.setState({ university: e.target.value });
  }

  onSave() {
    const { setTeacherUniversity } = this.props;
    const { university } = this.state;
    if (university) {
      setTeacherUniversity(university);
    } else {
      Alert.error(`Seleccione una Universidad`);
    }
  }

  render() {
    return (
      <div>
        <div className="hero__tutor">
          <div className="container">
            <div className="hero__tutor-title-container">
              <h1 className="hero__tutor-title">¿Cómo ser un Tutor?</h1>
              <span className="hero__tutor-description">Una buena forma de obtener ingresos extras ayudando a los demás.</span>
            </div>
            <div className="hero__tutor-selector-container">
              <select
                className="hero__tutor-selector"
                onChange={this.onChange}
                value={this.state.university}
              >
                <option value="">Elige tu Universidad</option>
                <option value="Pascual Bravo">Pascual Bravo</option>
                <option value="ITM(Instituto Tecnológico Metropolitano)">ITM(Instituto Tecnológico Metropolitano)</option>
                <option value="Colegio Mayor de Antioquia">Colegio Mayor de Antioquia</option>
              </select>
              <img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon.png')} />
              <span onClick={this.onSave} className="hero__tutor-selector-button">¡Registrate aquí!</span>
            </div>
          </div>
        </div>
        <div className="section section--gray section--padding-btm">
          <div className="container">
            <section className="section-tutor__steps-container">
              <div className="grid no-space push--bottom">
                <div className="grid__item one-third">
                  <img className="full-width" src={require('../assets/images/tutor-step1.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
                <div className="grid__item one-third">
                  <img className="full-width" src={require('../assets/images/tutor-step2.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
                <div className="grid__item one-third">
                  <img className="full-width" src={require('../assets/images/tutor-step3.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
              </div>
            </section>  
            <section className="section-tutor__banner-container">
              <div className="section-tutor__banner">
                <h2 className="section-tutor__banner-title">¿Por qué ser un Tutor?</h2>
              </div>
              <div className="grid no-space push--bottom grid--middle">
                <div className="grid__item one-quarter">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-search-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Busca los estudiantes</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item one-quarter">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-time-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Horarios Flexibles</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item one-quarter">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-money-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Ingresos extras</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item one-quarter">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-ok-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Ayudar a otros</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div>
                <img className="section-tutor__icon section-tutor__icon--small push--left" src={require('../assets/images/question-icon.png')} />
                <h2 className="section-tutor__title section-tutor__title--medium">Preguntas Frecuentes:</h2>
                <p className="section-tutor__questions-text">-¿Cómo puedo acceder a la plataforma?</p>
                <p className="section-tutor__questions-text">-¿Cómo puedo acceder a la plataforma?</p>
                <p className="section-tutor__questions-text">-¿Cómo puedo acceder a la plataforma?</p>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HowToBeTutor.propTypes = {
  setTeacherUniversity: PropTypes.func.isRequired,
};

export default HowToBeTutor;
