import React from 'react';
import logo from './logo.svg';

import DayVue from "DayVue";
import WeekVue from "WeekVue";
import MonthVue from "MonthVue";

import HistoryApi from "history-api";

const VUES = {
    DAY: 1,
    WEEK: 2,
    MONTH: 3,
};


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentVue: VUES.MONTH,
            date: new Date(),
            historyApi: new HistoryApi()
        };
    }

    setVue (newVue) {
        this.setState({ currentVue: newVue });
    }

    render() {
        let HistoryVue = null;
        
        if (this.state.currentVue === VUES.DAY) {
                HistoryVue = <DayVue date={this.state.date} historyApi={this.state.historyApi}/>
        } else if(this.state.currentVue === VUES.WEEK) {
                HistoryVue = <WeekVue/>
        } else if(this.state.currentVue === VUES.MONTH) {
                HistoryVue = <MonthVue/>
        }

        return (
            <div>
                <header>
                    <h1>History</h1>
                </header>
                <div className="toolbar">
                    <button className="default-button" onClick={ () => this.setVue(VUES.DAY) }>Day</button>
                    <button className="default-button" onClick={ () => this.setVue(VUES.WEEK) }>Week</button>
                    <button className="default-button" onClick={ () => this.setVue(VUES.MONTH) }>Month</button>
                    <button className="primary-button">Done</button>
                </div>
                { HistoryVue }
                <p>
                    <button className="primary-button primary-button--micro">Micro</button>
                </p>
                <p>
                    <button className="primary-button primary-button--puffy">Puffy</button>
                </p>
                <form>
                    <label for="name">Name (4 to 8 characters):</label>
                    <input className="default-input" type="text" id="name" name="name" placeholder="Placeholder" required/>
                </form>
            </div>
        );
    }
}

export default App;
