import Moment from "moment";

export default class HistoryApi {
    constructor() {
        this.historyItems = [];
        this.visits = [];
        this.start = null;
    }


    /**
     * BROWSER API WRAPPERS
     */

    /**
     * Return a Promise containing all the HistoryItem since startTime
     */
    getHistoryItems(startTime) {
        return browser.history.search({ text: "", maxResults: Number.MAX_SAFE_INTEGER, startTime });
    }

    /**
     * Returns a Promise containing an array of VisiItem for each HistoryItem
     */
    getVisits(historyItems) {
        const visitsPromises = [];

        historyItems.forEach(lastVisit => {
            visitsPromises.push(browser.history.getVisits({ url: lastVisit.url }));
        });

        return Promise.all(visitsPromises);
    }

    /**
     * Get the HistoryItem associated to a VisitItem
     */
    getVisitInfos(visit) {
        return this.historyItems.find(historyItem => historyItem.id === visit.id);
    }

    /**
     * Return a Promise containing all the VisitItem since start
     */
    updateVisits(start) {
        if (start != null && start.isAfter(this.start, 'day')) {
            return new Promise((resolve, reject) => {
                resolve(this.visits);
            });
        }

        return this.getHistoryItems(start.valueOf())
            .then((historyItems) => {
                this.historyItems = historyItems;
                return this.getVisits(this.historyItems);
            })
            .then((visits) => {
                this.visits = visits.flat().sort((a, b) => a.visitTime - b.visitTime);
                return this.visits;
            })
    }

    /**
     * APPLICATION API
     */

    /**
     * Return a Promise containing the visits of a day, most recent first
     */
    getDayVisits(today) {
        const yesterday = today.clone().subtract(1, 'days');

        return this.updateVisits(yesterday)
            .then((visits) => {
                let today_start = -1;
                let today_end = -1;

                for (const i in visits) {
                    if (today_start == -1 && Moment(visits[i].visitTime).isSame(today, 'day')) {
                        today_start = i;
                    }

                    if (today_end == -1 && Moment(visits[i].visitTime).isAfter(today, 'day')) {
                        today_end = i;
                        break;
                    }
                }

                let dayHistory = [];

                if (today_start != -1) {
                    if (today_end != -1) {
                        dayHistory = visits.slice(today_start, today_end);
                    }
                    else {
                        dayHistory = visits.slice(today_start);
                    }
                }

                return dayHistory.map(visit => [visit, this.getVisitInfos(visit)]).reverse();
            });
    }

    /**
     */
    getWeekVisits(date) {
        const dayHistory = [];

        for (const visit of this.visits) {
            const visitDate = Moment(visit.visitTime);

            // See the moment documentation https://momentjs.com/docs/#/query/is-same/
            // NOTE: moment().isSame() has undefined behavior and should not be used!
            // If the code runs fast the initial created moment would be the same as the one
            // created in isSame to perform the check, so the result would be true.
            // But if the code runs slower it's possible that the moment created in isSame
            // is measurably after the one created in moment(), so the call would return false.
            if (visitDate.isSame(date, 'week')) {
                dayHistory.push(visit);
            }
        }

        return dayHistory;
    }

    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    getMonthVisits(date) {
        const monthHistory = [];

        for (const visit of this.visits) {
            const visitDate = Moment(visit.visitTime);

            if (visitDate.isSame(date, 'month')) {
                monthHistory.push(visit);
            }
        }

        return monthHistory;
    }
}
