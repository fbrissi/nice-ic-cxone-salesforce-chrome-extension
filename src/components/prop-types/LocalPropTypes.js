import PropTypes from 'prop-types';

const LocalPropTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    itens: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })),
  })),
};

export default LocalPropTypes;
