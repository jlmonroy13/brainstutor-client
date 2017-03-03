import React, {PropTypes} from 'react';
import Footer from './Footer';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';
import { showUser } from '../requests/users';

class TutorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor: {},
    };

  }

  componentWillMount() {
    const id = this.props.params.id; 
    showUser(id, 'teacher').then((response) => {
      this.setState({ tutor: response.data });
    });
  }

  render() {
    const { tutor } = this.state;
    const { profile } = tutor;
    return (
      <div>
        <div className="profile__container">
          <div className="container">
            <div className="grid">
              <div className="grid__item three-fifths">
                <div className="profile">
                  <div className="profile__main">
                    <Gravatar email={tutor.email} size={150} className="profile__main-image" />
                    <div className="profile__main-description">
                      <h1 className="profile__main-title">{`${tutor.first_name} ${tutor.last_name}`}</h1>
                      <p className="profile__main-subtitle">Profesión: {tutor.role} - {profile && profile.university}</p>
                      <span className="profile__main-top-corner">${profile && profile.rate}</span>
                    </div>
                  </div>
                  <div className="profile__body">
                    <h2>Acerca de mi</h2>
                    <p>{profile && profile.about}</p>
                  </div>
                </div>
              </div>
              <div className="grid__item two-fifths">
                <div className="box-message">
                  <div className="box-message__header">
                    <img className="box-message__icon" src={require('../assets/images/mail-icon.png')} />
                    <span className="box-message__header-title">Enviar un mensaje</span>
                  </div>
                  <div className="box-message__body">
                    <label className="main-form__label main-form__label--large">Tu mensaje*</label>
                    <textarea className="main-form__textarea push--bottom" />
                    <button className="button button--dark-green button--block button--large">{`Contactar a ${tutor.first_name}`}</button>
                  </div>
                </div>
                <div className="grid">
                  <div className="grid__item one-half">
                    <Link className="button button--light-green button--block button--large" to="/sesion-conoce-tu-tutor">Conoce a tu tutor</Link>
                  </div>
                  <div className="grid__item one-half">
                    <Link className="button button--blue button--block button--large" to="/estudiantes/agendar-tutoria">Agendar Tutoria</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

TutorProfile.propTypes = {
  teachers: PropTypes.shape(),
  params: PropTypes.shape(),
};

export default TutorProfile;
