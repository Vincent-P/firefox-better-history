import React from 'react';

class WeekVue extends React.Component {
    renderWeekOccurences() {
        const visits = this.props.historyApi.getWeekVisits(this.props.date);

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
                    { 'Week ' + this.props.date.format("w, YYYY") }
                </h1>
            </div>
        );
    }
}

export default WeekVue;
