import React from 'react';
import Moment from 'moment';


const NoHistory = () => (
    <div className="history-item">Empty</div>
);

const History = ({visits}) => (
    <div>
        { visits.map(visit => (
            <div className="history-item">
                <span className="history-item-date">
                    { Moment(visit.lastVisitTime).format("MMMM Do YYYY, h:mm:ss a") }
                </span>

                <div className="history-item-icon">
                    <img className="img-icon" src="/globe.svg"/>
                </div>

                <span className="history-item-url ellipsis-text">
                    <abbr title={ Moment(visit.visitTime).format("MMMM Do YYYY, h:mm:ss a") }>
                        { visit.title != "" ? visit.title : visit.url }
                    </abbr>
                </span>

                <div className="history-item-link">
                    <a href={ visit.url } target="_blank" rel="noopener noreferrer">Link</a>
                </div>
            </div>
        ))}
    </div>
);

const DayView = ({visits}) => (
    visits.length == 0 ? <NoHistory/> : <History visits={visits} />
);

export default DayView;
