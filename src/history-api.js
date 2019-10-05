import Moment from "moment";

export default class HistoryApi {
    constructor() {
        this.historyItems = [];
        this.visits = [];
    }

    init() {
        return this.getHistoryItems()
            .then((historyItems) => {
                this.historyItems = historyItems;
            })
            .then(() => this.getVisits())
            .then((visits) => {
                this.visits = visits;
            })
            .then(() => {
                console.log("History cached");
                console.log(this.visits);
            });
    }


    /**
     * Warning: Direct call to the browser internal api
     * This function is called when creating the history api and it's result is cached
     */
    getHistoryItems() {
        return browser.history.search({ text: "", maxResult: Number.MAX_SAFE_INTEGER });
    }

    /**
     */
    getVisits() {
        const visitsPromises = [];

        this.historyItems.forEach(lastVisit => {
            visitsPromises.push(browser.history.getVisits({ url: lastVisit.url }));
        });

        return Promise.all(visitsPromises);
    }

    /**
     */
    getDayVisits(date) {
        const dayHistory = [];

        this.visits.forEach(visitArray => {
            visitArray.forEach(visit => {
                const visitDate = Moment(visit.visitTime);

                if (visitDate.isSame(date, 'day')) {
                    dayHistory.push(visit);
                }
            });
        });

        return dayHistory;
    }


    /**
     */
    getWeekVisits(date) {
        const dayHistory = [];

        this.visits.forEach(visitArray => {
            visitArray.forEach(visit => {
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
            });
        });

        return dayHistory;
    }


    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    getMonthVisits(date) {
        const monthHistory = [];

        this.visits.forEach(visitArray => {
            visitArray.forEach(visit => {
                const visitDate = Moment(visit.visitTime);

                if (visitDate.isSame(date, 'month')) {
                    monthHistory.push(visit);
                }
            });
        });

        return monthHistory;
    }

    /**
     */
    getVisitInfos(visit) {
        const { url, title, visitCount } = this.historyItems.find(historyItem => historyItem.id === visit.id);

        return {
            url,
            title,
            visitCount,
            visitTime: visit.visitTime,
        };
    }
}
