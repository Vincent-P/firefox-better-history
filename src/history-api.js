import Moment from "moment";

export default class HistoryApi {
    /**
     * Return a Promise containing the visits of a day, most recent first
     */
    static async getDayVisits(today) {
        const todayStart = Moment(today).startOf('day').toDate();
        const todayEnd = Moment(today).endOf('day').toDate();

        let historyItems = await browser.history.search({
            text: "",
            startTime: todayStart,
            endTime: todayEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        });

        for (const historyItem of historyItems) {
            let visits = await browser.history.getVisits({ url: historyItem.url });

            // Look for the latest visit item of this day
            const todayFirstVisit = visits.reverse().find(
                visitItem => Moment(visitItem.visitTime).isSame(Moment(today), 'day')
            );

            // Sometimes there aren't any visits (during first load usually)
            if (todayFirstVisit) {
                historyItem.lastVisitTime = todayFirstVisit.visitTime;
            }
        }

        return [historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime)];
    }

    /**
     */
    static async getWeekVisits(date) {
        const dateStart = Moment(date).startOf('week').toDate();
        const dateEnd = Moment(date).endOf('week').toDate();

        let historyItems = await browser.history.search({
            text: "",
            startTime: dateStart,
            endTime: dateEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        });

        const daysArray = new Array([], [], [], [], [], [], []);

        for (const historyItem of historyItems) {
            daysArray[Moment(historyItem.lastVisitTime).weekday()].push(historyItem);
        }

        return daysArray;
    }

    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    static async getMonthVisits(date) {
        return [];
    }
}
