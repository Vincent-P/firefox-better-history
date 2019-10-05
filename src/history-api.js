export default class HistoryApi {
    constructor() {
        console.log(browser.history);

        browser.history.search({ text: "" })
            .then((historyItems) => { this.historyItems = historyItems; })
            .then(() => this.getVisits())
            .then((visits) => {
                this.visits = visits;
                console.log("History cached")

                console.log("Last visits history : ", this.historyItems);
                console.log("Each visits history : ", this.visits);
            });
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
                const visitDate = new Date(visit.visitTime);

                if (date.getDate() === visitDate.getDate()
                    && date.getMonth() === visitDate.getMonth()
                    && date.getYear() === visitDate.getYear()) {
                    dayHistory.push(visit);
                }
            });
        });

        return dayHistory;
    }


    /**
     */
    getWeekVisits(date) {
    }


    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    getMonthVisits(date) {
        const monthHistory = [];

        this.visits.forEach(visitArray => {
            visitArray.forEach(visit => {
                const visitDate = new Date(visit.visitTime);

                if (date.getMonth() === visitDate.getMonth()
                    && date.getYear() === visitDate.getYear()) {
                    monthHistory.push(visit);
                }
            });
        });

        return monthHistory;
    }

    /**
     */
    getVisitInfos(visit) {
        return this.historyItems.find(historyItem => historyItem.id === visit.id);
    }
}
