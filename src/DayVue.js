import React from 'react';

class DayVue extends React.Component {
    renderDayOccurences() {
        const visits = this.props.historyApi.getDayVisits(this.props.date);

        const formattedVisits = visits.map(visit => {
            const visitInfo = this.props.historyApi.getVisitInfos(visit);

            console.log(visitInfo);

            if (!visitInfo) {
                return (<li> Visit not found </li>);
            }

            return (
                <li>
                    <span>
                        { new Date(visit.visitTime).toDateString() + ' ' }
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
                <ul>
                    { this.renderDayOccurences() }
                </ul>
            </div>
        );
    }
}

export default DayVue;
