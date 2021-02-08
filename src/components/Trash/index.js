import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import './style.css';
import { FormattedMessage } from 'react-intl';
import { FaCheck, FaBan } from 'react-icons/fa';
import { cleanMessages } from '../../services/messages';
import { Creators as messagesActions } from '../../store/ducks/messages';

const Trash = (props) => {
  const {
    setMessages,
  } = props;

  const [confirm, setConfirm] = useState(false);

  const clean = async () => {
    setMessages([]);
    await cleanMessages();
    setConfirm(false);
  };

  return (
    <div>
      <Modal
        isOpen={confirm}
        className="react-modal"
        overlayClassName="overlay"
      >
        <h2>
          <FormattedMessage id="menu.clear.title" />
        </h2>

        <p>
          <FormattedMessage id="menu.clear.message" />
        </p>

        <div className="button-actions">
          <button
            type="button"
            onClick={() => clean()}
          >
            <FaCheck size={20} />
            <span className="margin-button">
              <FormattedMessage id="generic.button.confirm" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setConfirm(false)}
          >
            <FaBan size={20} />
            <span className="margin-button">
              <FormattedMessage id="generic.button.cancel" />
            </span>
          </button>
        </div>
      </Modal>

      <BsTrashFill
        size={20}
        className="icon-button margin-button"
        aria-label="Clean"
        onClick={() => setConfirm(true)}
      />
    </div>
  );
};

Trash.propTypes = {
  setMessages: PropTypes.func,
};

Trash.defaultProps = {
  setMessages: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(messagesActions, dispatch);

export default connect(null, mapDispatchToProps)(Trash);
