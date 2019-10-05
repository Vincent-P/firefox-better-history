import React from 'react';

import DayView from "day-view";
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
            currentVue: VUES.DAY,
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
                return (<DayView date={this.state.date} historyApi={this.state.historyApi}/>);
        } else if(this.state.currentVue === VUES.WEEK) {
                return (<WeekVue date={this.state.date} historyApi={this.state.historyApi}/>);
        } else if(this.state.currentVue === VUES.MONTH) {
                return (<MonthVue date={this.state.date} historyApi={this.state.historyApi}/>);
        }

        return (<span> View not found </span>);
    }

    render() {
        return (
            <div>
                <header>
                    <h1>History</h1>
                </header>

                <div className="toolbar">
                    <h2>{ this.state.date.format("Do MMMM YYYY") }</h2>
                    <button className="ghost-button" onClick={ () => this.previous() }><img src="/back.svg"/></button>
                    <button className="ghost-button" onClick={ () => this.next() }><img src="/forward.svg"/></button>
                    <button className="default-button" onClick={ () => this.setVue(VUES.DAY) }>Day</button>
                    <button className="default-button" onClick={ () => this.setVue(VUES.WEEK) }>Week</button>
                    <button className="default-button" onClick={ () => this.setVue(VUES.MONTH) }>Month</button>
                </div>

                <div className="search-wrapper">
                    <input className="default-input search-input" placeholder="Search a website"/>
                    <button className="search-button search-button--cancel" title="Foward"/>
                </div>
                { this.renderVue() }
            </div>
        );
    }
}

export default App;
