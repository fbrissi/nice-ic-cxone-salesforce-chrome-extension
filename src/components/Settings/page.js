import React, { useEffect, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { bindActionCreators } from 'redux';
import {
  get, map, filter,
} from 'lodash';
import { RiSaveFill, RiAddCircleFill } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { MdRemoveCircle } from 'react-icons/md';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Header from '../Header';
import { Creators as settingsActions } from '../../store/ducks/settings';
import LocalPropTypes from '../prop-types/LocalPropTypes';
import linksTemplate from './links.json';
import languages from './language.json';
import EditableInput from '../EditableInput';

const Settings = (props) => {
  const {
    settings,
    setSettings,
  } = props;

  const history = useHistory();

  const [template, setTemplate] = useState();
  const [links, setLinks] = useState(get(settings, 'links', []));
  const [prefixCall, setPrefixCall] = useState(get(settings, 'call.prefix'));
  const [language, setLanguage] = useState(get(settings, 'language'));
  const [darkMode, setDarkMode] = useState(get(settings, 'darkMode', false));

  const applyTemplate = () => {
    setLinks(get(linksTemplate, template).itens);
    setTemplate('');
  };

  const addLink = () => {
    setLinks([
      ...links,
      { title: 'Title', url: 'URL' },
    ]);
  };

  const onChangeValue = (index, key, value) => {
    const newLinks = [...links];
    newLinks[index][key] = value;
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    setLinks(filter(links, (value, key) => index !== key));
  };

  useEffect(() => {
    setSettings({
      ...settings,
      darkMode,
      language,
      links,
      call: {
        prefix: prefixCall,
      },
    });
  }, [darkMode, links, language, prefixCall]);

  return (
    <motion.div
      className="content-setting"
      exit={{
        x: 100,
        opacity: 0,
      }}
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
    >
      <Header>
        <button
          type="button"
          className="header-back"
          onClick={() => history.push('/index.html')}
        >
          Voltar
        </button>
      </Header>

      <div className="settings-page">
        <label
          className="settings-page-item"
          htmlFor="material-switch"
        >
          <Switch
            id="material-switch"
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            uncheckedIcon={false}
            checkedIcon={false}
            checked={darkMode}
            onChange={(checked) => setDarkMode(checked)}
          />
          <span className="settings-page-item-margin">
            <FormattedMessage id="setting.dakr" />
          </span>
        </label>
        <label
          className="settings-page-item"
        >
          <span>
            <FormattedMessage id="setting.prefixCall" />
          </span>
          <input
            value={prefixCall}
            onChange={(e) => setPrefixCall(e.target.value)}
          />
        </label>
        <label
          className="settings-page-item settings-page-item-title"
          htmlFor="links"
        >
          <span>
            <FormattedMessage id="setting.language" />
          </span>
        </label>
        <div className="links-template">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <FormattedMessage id="generic.selectItem">
              {(message) => <option value="">{message}</option>}
            </FormattedMessage>
            {
              map(languages, (value, index) => (
                <option
                  key={index}
                  value={value.slug}
                >
                  {value.name}
                </option>
              ))
            }
          </select>
        </div>
        <label
          className="settings-page-item settings-page-item-title"
          htmlFor="links"
        >
          <span>
            <FormattedMessage id="setting.templates" />
          </span>
        </label>
        <div className="links-template">
          <select
            value={template}
            onChange={(event) => setTemplate(event.target.value)}
          >
            <FormattedMessage id="generic.selectItem">
              {(message) => <option value="">{message}</option>}
            </FormattedMessage>
            {
              map(linksTemplate, (value, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {value.title}
                </option>
              ))
            }
          </select>
          <RiAddCircleFill
            size={20}
            className="icon-button margin-icon"
            onClick={() => addLink()}
            aria-hidden="true"
          />
          <RiSaveFill
            size={20}
            className="icon-button margin-icon"
            onClick={() => applyTemplate()}
            aria-hidden="true"
          />
        </div>
        <section className="time-entry table">
          <header className="table">
            <div className="col_1">
              <FormattedMessage id="generic.name" />
            </div>
            <div className="col_2">
              <FormattedMessage id="generic.url" />
            </div>
          </header>
          {
            map(links, (value, index) => (
              <div
                key={index}
                className="row"
              >
                <div
                  title={value.title}
                  className="col_1 col-text"
                >
                  <EditableInput
                    onChange={(newValue) => onChangeValue(index, 'title', newValue)}
                    text={value.title}
                  />
                </div>
                <div
                  title={value.url}
                  className="col_2 col-text"
                >
                  <EditableInput
                    onChange={(newValue) => onChangeValue(index, 'url', newValue)}
                    text={value.url}
                  />
                </div>
                <MdRemoveCircle
                  size={20}
                  className="icon-button margin-icon"
                  onClick={() => removeLink(index)}
                  aria-hidden="true"
                />
              </div>
            ))
          }
        </section>
      </div>
    </motion.div>
  );
};

Settings.propTypes = {
  settings: LocalPropTypes.settings,
  setSettings: PropTypes.func,
};

Settings.defaultProps = {
  settings: {},
  setSettings: () => {
  },
};

const mapDispatchToProps = (dispatch) => bindActionCreators(settingsActions, dispatch);

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
