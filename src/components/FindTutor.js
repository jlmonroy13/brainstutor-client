import React, {PropTypes} from 'react';
import Footer from './Footer';
import subjects from '../consts/subjects';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';
import Autosuggest from 'react-autosuggest';

class FindTutor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentWillMount() {
    const { onGetTutorsRequest } = this.props;
    onGetTutorsRequest(1);
  }

  renderPagination(page) {
    const { currentPage, onGetTutorsRequest } = this.props;
    const activeClass = page === currentPage ? 'active' : '';
    const onChangeSchedulesPage = (page) => () => {
      onGetTutorsRequest(page);
    };

    return (
      <span
        className={`pagination__item ${activeClass}`}
        onClick={onChangeSchedulesPage(page)}
        key={page}
      >{page}</span>
    );
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : subjects.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  } 

  render() {
    const { teachers, totalPages } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Buscar por materia',
      value,
      onChange: this.onChange
    };

    const renderSuggestion = suggestion => (
      <div>
        {suggestion.name}
      </div>
    );

    function renderTeacher(teacher) {
      return (
        <Link to={`/perfil-tutor/${teacher.id}`} key={teacher.id}>
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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <span className="hero__tutor-selector-button">Buscar</span>
        </div>
        <div className="container container--small">
          <div className="cards-container">
            {teachers && teachers.map(renderTeacher)}
            <div className="pagination">
              {totalPages && totalPages.map(this.renderPagination)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }  
}

FindTutor.propTypes = {
  teachers: PropTypes.array,
  totalPages: PropTypes.array,
  currentPage: PropTypes.number,
  onGetTutorsRequest: PropTypes.func,
};

export default FindTutor;
