import React, { Component, PropTypes } from 'react';
import Footer from './Footer';
import { Link } from 'react-router';
import moment from 'moment-timezone';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textMessage: '',
    };

    this.onRenderMessages = this.onRenderMessages.bind(this);
    this.onChangeTextMessage = this.onChangeTextMessage.bind(this);
    this.onSendTextMessage = this.onSendTextMessage.bind(this);
  }

  onRenderMessages(message) {
    const { user } = message;
    const { firstName } = this.props;
    const messageClass = user.first_name === firstName ? '--ligther-color' : '';
    const colorClass = user.first_name === firstName ? '--blue' : '--green';
    const name = user.first_name === firstName ? 'Tú' : `${user.first_name} ${user.last_name}`;
    const createdAt = moment(message.created_at).tz(moment.tz.guess()).format('ddd, MMMM Do YYYY, h:mm a');
    return (
      <div className={`chat__message chat__message${messageClass}`} key={message.id}>
        <span className="chat__message-title"><span className={`chat__message-title${colorClass}`}>{name}</span> - {createdAt}</span>
        <p className="flush--bottom">{message.body}</p>
      </div>
    );
  }

  onChangeTextMessage(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSendTextMessage() {
    const { textMessage } = this.state; 
    const { senderId, onCreateMessage, chatsList } = this.props;
    const chatId = this.props.params.id;
    const chat = chatsList.filter((chatItem)=> chatItem.id === parseInt(chatId))[0];
    const receiverId = senderId === chat.sender_id ? chat.recipient_id : chat.sender_id;

    onCreateMessage(receiverId, textMessage, chatId);
    this.setState({ textMessage: '' });
  }

  render() {
    const { messagesList } = this.props;
    return (
      <div>
        <div className="message-list message-list--less-padding message-list--height">
          <div className="container">
            <Link to="/mensajes" >{`<  Regresar a Mensajes`}</Link>
            <div className="grid">
              <div className="grid__item two-thirds">
                <div className="schedule-list__box">
                  <div className="chat">
                    {messagesList.map(this.onRenderMessages)}
                  </div>
                  <div className="chat__footer">
                    <textarea
                      className="chat__footer-textarea"
                      value={this.state.textMessage}
                      onChange={this.onChangeTextMessage}
                      name="textMessage"
                    />
                    <button
                      className="button button--blue chat__footer-button"
                      onClick={this.onSendTextMessage}
                      disabled={!this.state.textMessage}
                    >Enviar</button>
                  </div>                 
                </div>
              </div>
              <div className="grid__item one-third" />
            </div>  
          </div>
        </div>
        <Footer />
      </div>
    );
  }  
}

Chat.propTypes = {
  messagesList: PropTypes.array,
  chatsList: PropTypes.array,
  firstName: PropTypes.string,
  senderId: PropTypes.number,
  onCreateMessage: PropTypes.func,
  params: PropTypes.object,
};

export default Chat;
