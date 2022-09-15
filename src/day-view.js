import React from 'react';
import Moment from 'moment';
import Icon from 'icon';


const NoHistory = () => (
    <div className="history-item">Empty</div>
);

const History = ({visits}) => (
    <div className="history-week-day-items">
        { visits.map(visit => (
            <a className="history-item" href={ visit.url } target="_blank" rel="noopener noreferrer">
                <span className="history-item-date">
                    { Moment(visit.lastVisitTime).format("h:mm:ss A") }
                </span>

                <div className="history-item-icon">
                    <Icon className="img-icon" default="globe" faviconUrl={ visit.url }/>
                </div>

                <span className="history-item-url ellipsis-text">
                    { visit.title != "" ? visit.title : visit.url }
                </span>
            </a>
        ))}
    </div>
);

const DayView = ({visits}) => (
    !visits || !visits.length || !visits[0].length ? <NoHistory/> : <History visits={visits[0]} />
);

export default DayView;
