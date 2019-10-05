import React from 'react';

import Moment from "moment";

class DayVue extends React.Component {
    renderDayOccurences() {
        const visits = this.props.historyApi.getDayVisits(this.props.date);

        const formattedVisits = visits.map(visit => {
            const visitInfo = this.props.historyApi.getVisitInfos(visit);

            if (!visitInfo) {
                return (<li> Visit not found </li>);
            }

            return (
                <div className="website-day">
                    <span>
                        { Moment(visit.visitTime).format("h:mm a") + ' ' }
                    </span>
                    <img src="/globe.svg"/>
                    <span>
                        { visitInfo.title + ' ' }
                    </span>
                    <a href={ visitInfo.url } target="_blank" rel="noopener noreferrer">Link</a>
                </div>);
        });

        return formattedVisits;
    }

    render() {
        return (
            <div>
                { this.renderDayOccurences() }
            </div>
        );
    }
}

export default DayVue;
