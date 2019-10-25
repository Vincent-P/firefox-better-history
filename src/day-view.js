import React from 'react';
import Moment from 'moment';
import Icon from 'icon';


const NoHistory = () => (
    <div className="history-item">Empty</div>
);

const History = ({visits}) => (
    <div className="history-week-day-items">
        { visits.map(visit => (
            <div className="history-item">
                <span className="history-item-date">
                    { Moment(visit.lastVisitTime).format("h:mm:ss A") }
                </span>

                <div className="history-item-icon">
                    <Icon className="img-icon" src="globe"/>
                </div>

                <span className="history-item-url ellipsis-text">
                    { visit.title != "" ? visit.title : visit.url }
                </span>

                <div className="history-item-link">
                    <a href={ visit.url } target="_blank" rel="noopener noreferrer">Link</a>
                </div>
            </div>
        ))}
    </div>
);

const DayView = ({visits}) => (
    !visits || !visits.length || !visits[0].length ? <NoHistory/> : <History visits={visits[0]} />
);

export default DayView;
