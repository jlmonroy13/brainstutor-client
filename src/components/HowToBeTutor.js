import React, { PropTypes } from 'react';
import Footer from './Footer';
import Alert from 'react-s-alert';
import universities from '../consts/universities';

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
    const renderUOptions = (u) => {
      return <option value={u} key={u}>{u}</option>;
    };
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
                {universities.map(renderUOptions)}
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
                <div className="grid__item medium--one-third one-whole">
                  <img className="full-width hero__tutor-image-step" src={require('../assets/images/tutor-step1.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
                <div className="grid__item medium--one-third one-whole">
                  <img className="full-width hero__tutor-image-step" src={require('../assets/images/tutor-step2.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
                <div className="grid__item medium--one-third one-whole">
                  <img className="full-width hero__tutor-image-step" src={require('../assets/images/tutor-step3.png')} />
                  <p className="section-tutor__steps-description">Crea una cuenta y envía tu aplicación, te estaremos enviando respuesta para iniciar tus horas de trabajo.</p>
                </div>
              </div>
            </section>  
            <section className="section-tutor__banner-container">
              <div className="section-tutor__banner">
                <h2 className="section-tutor__banner-title">¿Por qué ser un Tutor?</h2>
              </div>
              <div className="grid no-space push--bottom grid--middle">
                <div className="grid__item medium--one-quarter one-whole push--bottom">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-search-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Busca los estudiantes</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item medium--one-quarter one-whole push--bottom">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-time-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Horarios Flexibles</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item medium--one-quarter one-whole push--bottom">
                  <img className="section-tutor__icon section-tutor__icon--medium" src={require('../assets/images/tutor-money-icon.png')} />
                  <div className="inline-block vertical-align--middle">
                    <p className="section-tutor__subtitle">Ingresos extras</p>
                    <p className="section-tutor__banner-description">Nuestra plataforma te ayudara a ver que estudiantes estan online buscando asesoria.</p>
                  </div>
                </div>
                <div className="grid__item medium--one-quarter one-whole push--bottom">
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
                <img className="section-tutor__icon section-tutor__icon--ask section-tutor__icon--small push--left" src={require('../assets/images/question-icon.png')} />
                <h2 className="section-tutor__title section-tutor__title--medium">Preguntas Frecuentes:</h2>
                <p className="section-tutor__questions-text section-tutor__questions-text--bold">-¿Que materias puedo ofrecer como tutor en BrainsTutor?</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--ans">En BrainsTutor puedes ofrecer materias de cualquier Ingeniería desde el ciclo básico hasta el ciclo profesional. Lo ideal sería que ofrecieras asignaturas en las cuales tengas un excelente dominio del tema y mucho experiencia.</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--bold">-¿Cómo puedo aplicar para ser tutor?</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--ans">Registrate en nuestra plataforma como tutor y revisaremos tu perfil, recibiras respuesta un dia hábil despúes de tu registro en donde te diremos si tu perfil esta acorde para ser tutor en BrainsTutor.</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--bold">-¿Cuales son los requerimientos para ser tutor?</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--ans">Nuestros tutores deben ser profesores o monitores de Universidades de Colombia.</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--bold">-¿Cuanto tiempo pasa para que agenden una tutoria?</p>
                <p className="section-tutor__questions-text section-tutor__questions-text--ans">Las tutorias dependen de la temporada del año, van haber ciertos meses donde se demore mucho más tiempo para agendarte una tutoria, sin embargo, la mayoria de nuestros tutores se les agenda tutorias un par de semanas después de haber sido aceptado como tutor de BrainsTutor.</p>
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
