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

const Column = ({date, visits, viewDay}) => (
    <div className="history-week-day">
        <div className="history-day-header">
            <div className="history-item" onClick={() => viewDay(date)}>
                <p>{HistoryApi.formatHistoryItem(date)}</p>
            </div>
        </div>
        <div className="history-week-day-items">
            {visits.length == 0 ? <NoHistory/> : <History visits={visits} />}
        </div>
    </div>
);

const WeekView = ({visits, date, viewDay}) => {
    if (!visits || !date) {
        return <div>{'Something went wrong :('}</div>;
    }

    let columns = [];
    for (let i = 0; i < 7; i++) {
        columns.push(<Column date={date.clone().weekday(0).add(i, 'days')} visits={visits[i]} viewDay={viewDay}/>);
    }

    return (
        <div className="history-week-container">
            { columns }
        </div>
    );
};

export default WeekView;
