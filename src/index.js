import React from 'react';
import ReactDOM from 'react-dom';
import Moment from "moment";

import './index.scss';
import App from './app';

async function main() {
    const language = browser.i18n.getUILanguage();
    Moment.locale(language);

    const data = await browser.storage.local.get();
    ReactDOM.render(<App defaultView={data.last_visited}/>, document.getElementById('root'));
}

main();
