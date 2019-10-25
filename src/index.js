import React from 'react';
import ReactDOM from 'react-dom';
import Moment from "moment";

import './index.scss';
import App from './app';

const language = browser.i18n.getUILanguage();
Moment.locale(language);

ReactDOM.render(<App />, document.getElementById('root'));
