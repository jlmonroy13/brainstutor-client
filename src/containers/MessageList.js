import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { onLoading } = state.userInfo;
  return {
    type,
    onLoading,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MessageList);