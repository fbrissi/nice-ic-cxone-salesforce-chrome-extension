import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const EditableInput = (props) => {
  const {
    text, onChange,
  } = props;

  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [textLocal, setTextLocal] = useState(text);

  const onClickOutSide = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
    }
  };

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener('mousedown', onClickOutSide);
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  });

  return (
    <>
      {inputVisible ? (
        <input
          className="editable"
          ref={inputRef}
          value={textLocal}
          onChange={(e) => {
            setTextLocal(e.target.value);
            onChange(e.target.value);
          }}
        />
      ) : (
        <span
          className="editable"
          onClick={() => setInputVisible(true)}
          aria-hidden="true"
        >
          {text}
        </span>
      )}
    </>
  );
};

EditableInput.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableInput;
