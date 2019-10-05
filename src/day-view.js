import React from 'react';
import Moment from 'moment';

const DayView = ({date, historyApi}) => {
    const visits = historyApi.getDayVisits(date);
    console.log("Day view");
    console.log("All items", historyApi.historyItems);
    console.log("visits:", visits);
    const infos = visits.map(visit => historyApi.getVisitInfos(visit));
    console.log("infos:", infos);

    return (
        <div>
            { infos.map(info => (
                <div className="website-day">
                    <span>
                        { Moment(info.visitTime).format("hh:mm A") }
                    </span>
                    <img src="/globe.svg"/>
                    <span>
                        { info.title }
                    </span>
                    <a href={ info.url } target="_blank" rel="noopener noreferrer">Link</a>
                </div>
            ))}
        </div>
    );
}

export default DayView;
