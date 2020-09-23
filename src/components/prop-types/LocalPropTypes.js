import PropTypes from 'prop-types';

const LocalPropTypes = {
  settings: PropTypes.shape({
    darkMode: PropTypes.bool,
    links: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.string.isRequired,
    ]),
  }),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  messages: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    itens: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      number: PropTypes.string.isRequired,
    })),
  })),
};

export default LocalPropTypes;
