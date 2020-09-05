import React from 'react';
import Moment from 'moment';
import HistoryApi from "history-api";

import Icon from 'icon';

const NoHistory = () => (
    <div></div>
);

const History = ({visits}) =>
      visits.map((visit) => (
        <div className="history-item">
            <div className="history-item-icon">
                <Icon className="img-icon" default="globe" faviconUrl={visit.url}/>
            </div>

            <span className="history-item-url history-item--full ellipsis-text">
                <abbr title={ 'Last visit: ' + Moment(visit.lastVisitTime).format("MMMM Do YYYY, h:mm:ss a") }>
                    { visit.title != "" ? visit.title : visit.url }
                </abbr>
            </span>

            <div className="history-item-link">
                <a href={ visit.url } target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    ))
;

const GridItem = ({date, visits, sameMonth, viewDay}) => {
    let classes = "history-month-day";
    if (!sameMonth) {
        classes += " disabled";
    }

    return (
        <div className={classes}>
            <div className="history-day-header">
                <div className="history-item" onClick={() => viewDay(date)}>
                    <p>{HistoryApi.formatHistoryItem(date)}</p>
                </div>
            </div>
            <div className="history-month-day-items">
                {visits.length == 0 ? <NoHistory/> : <History visits={visits} />}
            </div>
        </div>
    );
};

const MonthView = ({visits, date, viewDay}) => {
    if (!visits || !date) {
        return <div>{'Something went wrong :('}</div>;
    }

    const firstDayOfMonth = date.clone().startOf('month');
    const firstDayOfWeekBeforeMonth = firstDayOfMonth.startOf('week');
    // dont use firstDayOfMonth anymore

    let days = [];
    for (let i = 0; i < 35; i++) {
        const day = firstDayOfWeekBeforeMonth.clone().add(i, 'days');
        days.push(<GridItem date={day} visits={visits[i]} sameMonth={day.isSame(date, 'month')} viewDay={viewDay}/>);
    }

    return (
        <div className="history-month-container">
            { days }
        </div>
    );
};

export default MonthView;
