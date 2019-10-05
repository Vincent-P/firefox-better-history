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
            currentView: VUES.DAY,
            date: Moment(),
            historyApi: new HistoryApi(),
            loaded: false
        };

        this.state.historyApi.init()
            .then(() => {
                this.setState({loaded: true});
                console.log("loaded!");
            });
    }

    setVue (newVue) {
        this.setState({ currentView: newVue });
    }

    previous () {
        const newDate = this.state.date;

        if (this.state.currentView === VUES.DAY) {
            newDate.subtract(1, 'days');
        } else if(this.state.currentView === VUES.WEEK) {
            newDate.subtract(1, 'weeks');
        } else if(this.state.currentView === VUES.MONTH) {
            newDate.subtract(1, 'months');
        }

        this.setState({ date: newDate });
    }

    next () {
        const newDate = this.state.date;

        if (this.state.currentView === VUES.DAY) {
            newDate.add(1, 'days');
        } else if(this.state.currentView === VUES.WEEK) {
            newDate.add(1, 'weeks');
        } else if(this.state.currentView === VUES.MONTH) {
            newDate.add(1, 'months');
        }

        this.setState({ date: newDate });
    }

    render() {
        const { currentView, historyApi, date, loaded } = this.state;

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

                { !loaded ? <p>Loading...</p>
                  : currentView == VUES.DAY ? <DayView date={date} historyApi={historyApi}/>
                  : currentView == VUES.WEEK ? <WeekVue date={date} historyApi={historyApi}/>
                  : <MonthVue date={date} historyApi={historyApi}/>
                }
            </div>
        );
    }
}

export default App;
