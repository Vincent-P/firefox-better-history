import React from 'react';
import Moment from 'moment';


const NoHistory = () => (
    <div className="website-day">Empty</div>
);

const History = ({visits}) => (
    <div>
        { visits.map(visit => (
            <div className="website-day">
                <span>
                    { Moment(visit.lastVisitTime).format("MMMM Do YYYY, h:mm:ss a") }
                </span>
                <img src="/globe.svg"/>
                <span>
                    { visit.title != "" ? visit.title : visit.url }
                </span>
                <a href={ visit.url } target="_blank" rel="noopener noreferrer">Link</a>
            </div>
        ))}
    </div>
);

const DayView = ({visits}) => (
    visits.length == 0 ? <NoHistory/> : <History visits={visits} />
);

export default DayView;
