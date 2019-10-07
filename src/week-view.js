import React from 'react';
import Moment from 'moment';


const NoHistory = () => (
    <div className="history-item">Empty</div>
);

const History = ({visits}) =>
      visits.map((visit) => (
        <div className="history-item">
            <div className="history-item-icon">
                <img className="img-icon" src="/globe.svg"/>
            </div>

            <span className="history-item-url history-item-full ellipsis-text">
                <abbr title={ Moment(visit.lastVisitTime).format("MMMM Do YYYY, h:mm:ss a") }>
                    { visit.title != "" ? visit.title : visit.url }
                </abbr>
            </span>

            <div className="history-item-link">
                <a href={ visit.url } target="_blank" rel="noopener noreferrer"></a>
            </div>
        </div>
    ))
;

const Column = ({date, visits}) => (
    <div className="history-week-day">
        <div className="history-week-day-header">
            <div className="history-item">
                <p>{date.format("dddd, MMMM Do YYYY")}</p>
            </div>
        </div>
        <div className="history-week-day-items">
            {visits.length == 0 ? <NoHistory/> : <History visits={visits} />}
        </div>
    </div>
);

const WeekView = ({visits, date}) => {
    let columns = [];
    for (let i = 0; i < 7; i++) {
        columns.push(<Column date={date.clone().add(i, 'days')} visits={visits[i]}/>);
    }

    return (
        <div className="history-week-container">
            { columns }
        </div>
    );
};

export default WeekView;
