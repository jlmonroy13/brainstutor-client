import React from 'react';
import Gravatar from 'react-gravatar';
import Footer from './Footer';
import { Link } from 'react-router';

class ScheduleList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="hero__blue">
          <h1 className="hero__blue-title">Tutorias Agendadas</h1>
          <div className="grid grid--center">
            <div className="grid__item one-half">
              <div className="grid">
                <div className="grid__item one-half">
                  <button
                    className="button button--light-green button--block button--large"
                    onClick={this.onGoToKnowUTutor}
                  >Conoce a tu tutor</button>
                </div>
                <div className="grid__item one-half">
                  <button
                    className="button button--blue button--block button--large"
                    onClick={this.onGoToScheduleTutor}
                  >Agendar Tutoria</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule-list">
          <div className="grid grid--center">
            <div className="grid__item two-thirds">
              <div className="schedule-list__box">
                <div className="schedule-list__menu">
                  <button className="button schedule-list__menu-btn">Próximas</button>
                  <button className="button schedule-list__menu-btn disable">Completadas</button>
                </div>
                <div className="schedule-list__body">
                  <table className="schedule-list__table">
                    <tbody>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="hola@hola.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Sábado, 25 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">Jorge Monroy</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="hola@a.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Sábado, 25 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">Luis Herrera</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Cálculo Integral</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="ola@hola.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Sábado, 25 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">David Rodriguez</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="hola@ha.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Martes, 28 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">Jorge Monroy</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Física Mecánica</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="ha@hola.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Sábado, 25 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">Jorge Monroy</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="schedule-list__row">
                          <Gravatar  className="schedule-list__photo" email="hola@hola.com" size={50} />
                          <div className="schedule-list__description">
                            <p className="schedule-list__description-txt">Domingo, 29 Marzo 2017</p>
                            <p className="schedule-list__description-txt">19:00 - <Link className="schedule-list__link">Juan Giraldo</Link></p>
                          </div>
                        </td>
                        <td className="schedule-list__row">
                          <p className="schedule-list__description-txt">Primera Entrevista</p>
                          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
                        </td>
                        <td className="schedule-list__row">
                          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
                          <span className="schedule-list__description-highlight">Esperando confirmación del tutor</span>
                        </td>
                        <td className="schedule-list__row">
                          <button className="button button--blue">Volver a Agendar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default ScheduleList;