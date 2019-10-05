import React from 'react';
import logo from './logo.svg';

import DayVue from "DayVue";
import WeekVue from "WeekVue";
import MonthVue from "MonthVue";

import Moment from "moment";
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
            date: Moment(),
            historyApi: new HistoryApi()
        };
    }

    setVue (newVue) {
        this.setState({ currentVue: newVue });
    }

    previous () {
        const newDate = this.state.date;

        if (this.state.currentVue === VUES.DAY) {
            newDate.subtract(1, 'days');
        } else if(this.state.currentVue === VUES.WEEK) {
            newDate.subtract(1, 'weeks');
        } else if(this.state.currentVue === VUES.MONTH) {
            newDate.subtract(1, 'months');
        }

        this.setState({ date: newDate });
    }

    next () {
        const newDate = this.state.date;

        if (this.state.currentVue === VUES.DAY) {
            newDate.add(1, 'days');
        } else if(this.state.currentVue === VUES.WEEK) {
            newDate.add(1, 'weeks');
        } else if(this.state.currentVue === VUES.MONTH) {
            newDate.add(1, 'months');
        }

        this.setState({ date: newDate });
    }

    renderVue() {
        if (this.state.currentVue === VUES.DAY) {
                return (<DayVue date={this.state.date} historyApi={this.state.historyApi}/>);
        } else if(this.state.currentVue === VUES.WEEK) {
                return (<WeekVue date={this.state.date} historyApi={this.state.historyApi}/>);
        } else if(this.state.currentVue === VUES.MONTH) {
                return (<MonthVue date={this.state.date} historyApi={this.state.historyApi}/>);
        }

        return (<span> Vue not found </span>);
    }

    render() {

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
                    <button className="default-button" onClick={ () => this.previous() }> { '<' }</button>
                    <button className="default-button" onClick={ () => this.next() }> { '>' } </button>
                </div>
                { this.renderVue() }
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
