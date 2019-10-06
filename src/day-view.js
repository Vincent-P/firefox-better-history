import React from 'react';
import Moment from 'moment';


const NoHistory = () => (
    <div className="website-day">Empty</div>
);

const History = ({visits}) => (
    <div>
        { visits.map(([visit, info]) => (
            <div className="website-day">
                <span>
                    { Moment(visit.visitTime).format("MMMM Do YYYY, h:mm:ss a") }
                </span>
                <img src="/globe.svg"/>
                <span>
                    { info.title != "" ? info.title : info.url }
                </span>
                <a href={ info.url } target="_blank" rel="noopener noreferrer">Link</a>
            </div>
        ))}
    </div>
);

const DayView = ({visits}) => (
    visits.length == 0 ? <NoHistory/> : <History visits={visits} />
);

export default DayView;
