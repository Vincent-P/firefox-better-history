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
                <li>
                    <span>
                        { Moment(visit.visitTime).toString() + ' ' }
                    </span>
                    <span>
                        { visitInfo.title + ' ' }
                    </span>
                    <span>
                        { visitInfo.url }
                    </span>
                </li>
            );
        });

        return formattedVisits;
    }

    render() {
        return (
            <div>
                <h1>
                    { this.props.date.format("Do MMMM YYYY") }
                </h1>
                <ul>
                    { this.renderDayOccurences() }
                </ul>
            </div>
        );
    }
}

export default DayVue;
