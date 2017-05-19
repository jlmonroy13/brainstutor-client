import React, { PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';

function validateForm(e) {
  if(e.accountNumber && e.ownerId && e.accountType && e.ownerName && e.bankName) {
    return true;
  }
  return false;
}

class UpdateBankInfo extends React.Component {
  constructor(props) {
    super(props);

    const {
      account_number: accountNumber,
      account_type: accountType,
      bank_name: bankName,
      owner_id: ownerId,
      owner_name: ownerName,
    } = this.props.userInfo.bank_information;

    this.state = {
      accountNumber,
      ownerId,
      accountType,
      ownerName,
      bankName,
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChangeForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitForm(e) {
    const { accountNumber } = this.state;
    e.preventDefault();
    if (validateForm(this.state) && accountNumber.length <= 11 && accountNumber.length >= 8) {
      this.props.userUpdateBankInfo(this.state);
    } else if(!(accountNumber.length <= 11 && accountNumber.length >= 8)) {
      Alert.error(`El número de cuenta debe ser de 11 digitos`);
    } else {
      Alert.error(`Todos los campos deben ser completados`);
    }
  }

  render() {
    const { onLoading } = this.props;
    return (
      <div className="section__auth">
        <img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
        <div className="section__auth-container section__auth-container--form section__auth-container--large">
          <form onSubmit={this.onSubmitForm} autoComplete="off">
            <h1 className="section__auth-title section__auth-title--form">Información Bancaria</h1>
            <TextFieldGroup
              value={this.state.bankName}
              onChange={this.onChangeForm}
              type="text"
              field="bankName"
              label="Nombre del Banco"
            />
            <TextFieldGroup
              value={this.state.accountType}
              onChange={this.onChangeForm}
              type="text"
              field="accountType"
              label="Tipo de Cuenta"
            />
            <TextFieldGroup
              value={this.state.accountNumber}
              onChange={this.onChangeForm}
              type="text"
              field="accountNumber"
              label="Numero de Cuenta"
            />
            <TextFieldGroup
              value={this.state.ownerName}
              onChange={this.onChangeForm}
              type="text"
              field="ownerName"
              label="Nombre del titular"
            />
            <TextFieldGroup
              value={this.state.ownerId}
              onChange={this.onChangeForm}
              type="text"
              field="ownerId"
              label="Identificación del titular (C.C.)"
            />
            <button
              className="button button--large button--block button--blue push-half--top push--bottom"
              disabled={onLoading}
            >Actualizar información</button>
          </form>
        </div>
      </div>
    );
  }
}

UpdateBankInfo.propTypes = {
  userInfo: PropTypes.shape(),
  userUpdateBankInfo: PropTypes.func.isRequired,
  onLoading: PropTypes.bool,
};

export default UpdateBankInfo;
