import React, {PropTypes} from 'react';
import Footer from './Footer';
import ObjectUtils from '../utils/object';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

class FindTutor extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { teachers } = this.props;
    const teacherArray = ObjectUtils.toArray(teachers);

    function renderTeacher(teacher) {
      return (
        <Link to={`/perfil-tutor/${teacher.id}`}>
          <div className="card">
            <div className="card__header">
              <p className="flush">{teacher.first_name + '' + teacher.last_name} / { teacher.role }</p>
            </div>
            <div className="card__body">
              <div className="grid">
                <div className="grid__item two-fifths">
                  <Gravatar email={teacher.email} className="card__image" size={250} />
                </div>
                <div className="grid__item three-fifths">
                  <p className="card__description">
                    Ingeniera egresada de la Universidad de Medellín texto, texto texto texto, texto texto texto, texto texto, Ingeniera egresada de la Universidad de Medellín texto, texto texto texto, texto texto texto, texto texto
                  </p>
                </div>
              </div>  
            </div>
          </div>
        </Link>
      );
    }

    return (
      <div>
        <div className="hero__find-tutor">
          <div className="container">
            <h1 className="hero__find-tutor-title">Encuentra tu tutor</h1>
            <span className="hero__find-tutor-subtitle">Tu tutor online, estara disponible en las áreas de trabajo que necesitas.</span>
          </div>
        </div>
        <div className="hero__find-tutor-selector">
          <input className="hero__tutor-input" />
          <img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon.png')} />
          <span className="hero__tutor-selector-button">Tema</span>
        </div>
        <div className="container container--small">
          <div className="cards-container">
            {teacherArray.map(renderTeacher)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }  
}

FindTutor.propTypes = {
  teachers: PropTypes.shape(),
};

export default FindTutor;
