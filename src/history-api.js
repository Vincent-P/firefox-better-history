import Moment from "moment";

export default class HistoryApi {
    /**
     * Return a Promise containing the visits of a day, most recent first
     */
    static getDayVisits(today) {
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
                    getVisitsPromises.push(
                        browser.history.getVisits({ url: historyItem.url })
                            .then(visitItems => {
                                // Look for the latest visit item of this day
                                const todayFirstVisit = visitItems.reverse().find(
                                    visitItem => Moment(visitItem.visitTime).isSame(Moment(today), 'day')
                                );

                                historyItem.lastVisitTime = todayFirstVisit.visitTime;
                                return historyItem;
                            })
                    );
                }

                return Promise.all(getVisitsPromises);
            })
            .then(historyItems => {
                return [historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime)];
            })
    }

    /**
     */
    static getWeekVisits(date) {
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
                                               return historyItem;
                                           })
                                          );
                }

                console.log("promise all");
                return Promise.all(getVisitsPromises);
            })
            .then(historyItems => {
                const daysArray = new Array([], [], [], [], [], [], []);

                for (const historyItem of historyItems) {
                    daysArray[Moment(historyItem.lastVisitTime).weekday()].push(historyItem);
                }

                daysArray.forEach(day => {
                    day.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
                });
                console.log("daysArray", daysArray);
                return daysArray;
            });
    }

    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    static getMonthVisits(date) {
        const monthHistory = [];

        return monthHistory;
    }
}
