import React from 'react';
import Moment from 'moment';


const NoHistory = () => (
    <div className="history-week-day">
        <div className="history-item">Empty</div>
    </div>
);

const History = ({visits}) => (
    <div className="history-week-day">
        { visits.map((visit) => (
            <div className="history-item">
                <div className="history-item-icon">
                    <img className="img-icon" src="/globe.svg"/>
                </div>

                <span className="history-item-url ellipsis-text">
                    <abbr title={ Moment(visit.lastVisitTime).format("MMMM Do YYYY, h:mm:ss a") }>
                        { visit.title != "" ? visit.title : visit.url }
                    </abbr>
                </span>

                <div className="history-item-link">
                    <a href={ visit.url } target="_blank" rel="noopener noreferrer"></a>
                </div>
            </div>
        ))}
    </div>
);

const Column = ({visits}) => (
    visits.length == 0 ? <NoHistory/> : <History visits={visits} />
);

const WeekView = ({visits}) => (
    <div className="history-week-container">
        <Column visits={visits[0]}/>
        <Column visits={visits[1]}/>
        <Column visits={visits[2]}/>
        <Column visits={visits[3]}/>
        <Column visits={visits[4]}/>
        <Column visits={visits[5]}/>
        <Column visits={visits[6]}/>
    </div>
);

export default WeekView;
