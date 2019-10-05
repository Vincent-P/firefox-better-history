import React from 'react';

import DayView from "day-view";
import WeekView from "week-view";
import MonthView from "month-view";

import Moment from "moment";
import HistoryApi from "history-api";

const VIEWS = {
    DAY: 1,
    WEEK: 2,
    MONTH: 3,
};


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: VIEWS.DAY,
            date: Moment(),
            historyApi: new HistoryApi(),
            loading: true
        };

        this.state.historyApi.init()
            .then(() => {
                this.setState({loading: false});
            });
    }

    setView (newView) {
        this.setState({ currentView: newView, date: Moment() });
    }

    previous () {
        const newDate = this.state.date;

        if (this.state.currentView === VIEWS.DAY) {
            newDate.subtract(1, 'days');
        } else if(this.state.currentView === VIEWS.WEEK) {
            newDate.subtract(1, 'weeks');
        } else if(this.state.currentView === VIEWS.MONTH) {
            newDate.subtract(1, 'months');
        }

        this.setState({ date: newDate });
    }

    next () {
        const newDate = this.state.date;

        if (this.state.currentView === VIEWS.DAY) {
            newDate.add(1, 'days');
        } else if(this.state.currentView === VIEWS.WEEK) {
            newDate.add(1, 'weeks');
        } else if(this.state.currentView === VIEWS.MONTH) {
            newDate.add(1, 'months');
        }

        this.setState({ date: newDate });
    }

    render() {
        const { currentView, historyApi, date, loading } = this.state;

        let selectedDate =
            currentView == VIEWS.DAY ? date.format("Do MMMM YYYY")
            : currentView == VIEWS.WEEK ?  'Week ' + date.format("w, YYYY")
            : date.format("MMMM, YYYY");


        return (
            <div>
                <header>
                    <h1>History</h1>
                </header>

                <div className="search-wrapper center">
                    <input className="default-input search-input" placeholder="Search a website"/>
                    <button className="search-button search-button--cancel" title="Foward"/>
                </div>

                <div className="toolbar">
                    <h2>{ selectedDate }</h2>
                    <button className="toolbar-item-right ghost-button" onClick={ () => this.previous() }><img src="/back.svg"/></button>
                    <button className="toolbar-item-right ghost-button" onClick={ () => this.next() }><img src="/forward.svg"/></button>
                    <button className="toolbar-item-right default-button" onClick={ () => this.setView(VIEWS.DAY) }>Day</button>
                    <button className="toolbar-item-right default-button" onClick={ () => this.setView(VIEWS.WEEK) }>Week</button>
                    <button className="toolbar-item-right default-button" onClick={ () => this.setView(VIEWS.MONTH) }>Month</button>
                </div>

                { loading ? <p>Loading...</p>
                  : currentView == VIEWS.DAY ? <DayView date={date} historyApi={historyApi}/>
                  : currentView == VIEWS.WEEK ? <WeekView date={date} historyApi={historyApi}/>
                  : <MonthView date={date} historyApi={historyApi}/>
                }
            </div>
        );
    }
}

export default App;
