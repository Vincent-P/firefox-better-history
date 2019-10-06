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
        const todayStart = Moment(today).startOf('day').toDate();
        const todayEnd = Moment(today).endOf('day').toDate();

        return browser.history.search({
            text: "",
            startTime: todayStart,
            endTime: todayEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        })
            .then(historyItems => {
                    const getVisitsPromises = [];

                    for (const historyItem of historyItems) {
                        getVisitsPromises.push(browser.history.getVisits({ url: historyItem.url })
                            .then(visitItems => {
                                // Look for the latest visit item of this day
                                const todayFirstVisit = visitItems.reverse().find(
                                    visitItem => Moment(visitItem.visitTime).isSame(Moment(today), 'day')
                                );

                                historyItem.lastVisitTime = todayFirstVisit.visitTime;
                            })
                        );
                    }

                    return Promise.all(getVisitsPromises)
                        .then(() => {
                            historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime);

                            return historyItems;
                        });
                }
            )
    }

    /**
     */
    getWeekVisits(date) {
        const dateStart = Moment(date).startOf('week').toDate();
        const dateEnd = Moment(date).endOf('week').toDate();

        return browser.history.search({
            text: "",
            startTime: dateStart,
            endTime: dateEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        })
            .then(historyItems => {
                    const getVisitsPromises = [];

                    for (const historyItem of historyItems) {
                        getVisitsPromises.push(browser.history.getVisits({ url: historyItem.url })
                            .then(visitItems => {
                                // Look for the latest visit item of this day
                                const todayFirstVisit = visitItems.reverse().find(
                                    visitItem => Moment(visitItem.visitTime).isSame(Moment(date), 'week')
                                );

                                historyItem.lastVisitTime = todayFirstVisit.visitTime;
                            })
                        );
                    }

                    return Promise.all(getVisitsPromises)
                        .then(() => {
                            const daysArray = new Array([], [], [], [], [], [], []);

                            for (const historyItem of historyItems) {
                                daysArray[Moment(historyItem.lastVisitTime).weekday()].push(historyItem);
                            }

                            daysArray.forEach(day => {
                                day.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
                            });

                            return daysArray;
                        });
                }
            )
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
