import React, { useEffect } from 'react';
import './style.css';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import LocalPropTypes from '../prop-types/LocalPropTypes';

const Header = (props) => {
  const {
    children,
    settings,
  } = props;

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [settings]);

  return (
    <header className="header-and-settings">
      <div className="header-content">
        <div className="colum-1">
          <img
            className="logo"
            alt="Logo"
            src={logo}
          />
        </div>
        <div className="colum-2">
          {children}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  children: LocalPropTypes.children,
  settings: LocalPropTypes.settings,
};

Header.defaultProps = {
  children: null,
  settings: {},
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Header);
