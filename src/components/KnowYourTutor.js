import React, { PropTypes } from 'react';
import Footer from './Footer';
import TextFieldGroup from './TextFieldGroup';

class KnowYourTutor extends React.Component {
  constructor(props) {
    super(props);
    const { firstName, lastName } = this.props;
    this.state = {
      tutorName: firstName + ' ' +  lastName,
      date: '',
      hour: '',
      minute: '',
      message: '',
    };
  }


  render() {
    return (
      <div>
        <div className="hero__blue">
          <h1 className="hero__blue-title">Conoce a tu tutor en una entrevista de 15 minutos</h1>
          <span className="hero__blue-subtitle">Es gratis, sin ningún compromiso.</span>
        </div>
        <div className="box__form">
          <div className="box__form-header">
            <img className="box__form-header-icon" src={require('../assets/images/screen-user-icon.png')} />
            <span className="box__form-header-title">Tu entrevista gratuita</span>
          </div>
          <div className="box__form-body">
            <form autoComplete="off">
              <TextFieldGroup
                value={this.state.tutorName}
                onChange={this.onChangeForm}
                type="text"
                field="tutorName"
                label="Tu Tutor"
                disabled={true}
              />
              <div className="box__form-select-group box__form-select-group--first">
                <label className="main-form__label">Fecha</label>
                <select
                  className="main-form__input"
                  value={this.state.date}
                  onChange={this.onChangeForm}
                  name="date"
                >
                  <option value="">Selecciona una fecha</option>
                  <option value="27 Marzo 2017">27 Marzo 2017</option>
                  <option value="28 Marzo 2017">28 Marzo 2017</option>
                  <option value="29 Marzo 2017">29 Marzo 2017</option>
                  <option value="30 Marzo 2017">30 Marzo 2017</option>
                </select>
              </div>
              <div className="box__form-select-group">
                <label className="main-form__label">Hora</label>
                <select
                  className="main-form__input"
                  value={this.state.hour}
                  onChange={this.onChangeForm}
                  name="hour"
                >
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                </select>
              </div>
              <span> : </span>
              <div className="box__form-select-group">
                <select
                  className="main-form__input"
                  value={this.state.minute}
                  onChange={this.onChangeForm}
                  name="minute"
                >
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
              <label className="main-form__label">Mensaje</label>
              <textarea
                className="main-form__textarea"
                value={this.state.message}
                onChange={this.onChangeForm}
                name="message"
              />
              <button
                className="button button--large button--block button--blue push-half--top push--bottom"
              >Agendar</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

KnowYourTutor.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
};

export default KnowYourTutor;