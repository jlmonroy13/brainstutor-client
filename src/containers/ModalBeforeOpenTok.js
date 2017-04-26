import { connect } from 'react-redux';
import ModalBeforeOpenTok from '../components/ModalBeforeOpenTok';
import { getSessionStatus, setSessionModalState } from '../actions/openTokSession';


const mapStateToProps = (state) => {
	const { openTokSession: { isModalOpen, data } } = state;
  return {
  	isModalOpen,
  	data,
  };
};

const mapDispatchToProps = dispatch => ({
	onGetSessionStatus: (type, id) => {
	  dispatch(getSessionStatus(type, id));
	},
	onSetSessionModalState: (state) => {
	  dispatch(setSessionModalState(state));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalBeforeOpenTok);
