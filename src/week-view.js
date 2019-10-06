import React from 'react';
import Moment from 'moment';

const WeekView = ({date, historyApi}) => {
    const visits = historyApi.getWeekVisits(date);
    const infos = visits.map(visit => [visit, historyApi.getVisitInfos(visit)]);

    return (
        <div>
            { infos.map(([visit, info]) => (
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
}

export default WeekView;
