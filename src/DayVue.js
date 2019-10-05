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
                    <img src="/globe.svg"/>
                    <span>
                        { Moment(visit.visitTime).format("h:mm a") + ' ' }
                    </span>
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
                <h2>
                    { this.props.date.format("Do MMMM YYYY") }
                </h2>
                { this.renderDayOccurences() }
            </div>
        );
    }
}

export default DayVue;
