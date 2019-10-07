import React from 'react';

import DayView from "day-view";
import WeekView from "week-view";
import MonthView from "month-view";

import Moment from "moment";
import HistoryApi from "history-api";

const VIEWS = {
    DAY: 0,
    WEEK: 1,
    MONTH: 2,
};

const VIEW_UNITS = [
    'days',
    'weeks',
    'months',
];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: VIEWS.DAY,
            date: Moment(),
            loading: true,
            visits: []
        };
    }

    setView (newView) {
        this.setState({ currentView: newView, date: Moment(), loading: true });
    }

    previous () {
        const {currentView, date} = this.state;
        date.subtract(1, VIEW_UNITS[currentView]);
        this.setState({ date, loading: true });
    }

    next () {
        const {currentView, date} = this.state;
        date.add(1, VIEW_UNITS[currentView]);
        this.setState({ date, loading: true });
    }

    render() {
        const { currentView, date, loading, visits } = this.state;


        if (loading) {
            if (currentView === VIEWS.DAY) {
                HistoryApi.getDayVisits(date)
                    .then((newVisits) => {
                        this.setState({loading: false, visits: newVisits});
                    });
            }
            else if (currentView === VIEWS.WEEK) {
                HistoryApi.getWeekVisits(date)
                    .then((newVisits) => {
                        this.setState({loading: false, visits: newVisits});
                    });
            }
            else if (currentView === VIEWS.MONTH) {
                HistoryApi.getMonthVisits(date)
                    .then((newVisits) => {
                        this.setState({loading: false, visits: newVisits});
                    });
            }
        }

        let selectedDate =
            currentView == VIEWS.DAY ? date.format("Do MMMM YYYY")
            : currentView == VIEWS.WEEK ?  'Week ' + date.format("w, YYYY")
            : date.format("MMMM, YYYY");


        return (
            <div className="container">
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

                { loading ? <div className="spinner"></div>
                  : currentView == VIEWS.DAY ? <DayView visits={visits}/>
                  : currentView == VIEWS.WEEK ? <WeekView date={date} visits={visits}/>
                  : <MonthView date={date} visits={visits}/>
                }
            </div>
        );
    }
}

export default App;
