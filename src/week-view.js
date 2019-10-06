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
                    <abbr title={ Moment(visit.visitTime).format("MMMM Do YYYY, h:mm:ss a") }>
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
        <Column visits={visits}/>
        <Column visits={visits}/>
        <Column visits={visits}/>
        <Column visits={visits}/>
        <Column visits={visits}/>
        <Column visits={visits}/>
        <Column visits={visits}/>
    </div>
);

export default WeekView;
