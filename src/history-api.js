import Moment from "moment";

function capitalize(word) {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

export default class HistoryApi {
    /**
     * Return a Promise containing the visits of a day, most recent first
     */
    static async getDayVisits(today, repeatedVisits) {
        const todayStart = Moment(today).startOf('day').toDate();
        const todayEnd = Moment(today).endOf('day').toDate();

        let historyItems = await browser.history.search({
            text: "",
            startTime: todayStart,
            endTime: todayEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        });

        var allHistoryItems = []; // multi-visits separated
        for (const historyItem of historyItems) {
            let visits = await browser.history.getVisits({ url: historyItem.url });

            if (repeatedVisits) {
                // add all separately visits
                for (const visit of visits) {
                    if (visit.visitTime !== undefined) {
                        // create new HistoryItem's with different lastVisitTime
                        var newHistoryItem = {title:historyItem.title, url:historyItem.url, lastVisitTime:visit.visitTime};
                        allHistoryItems.push(newHistoryItem);
                    }
                }
            } else { // add only last visit
                // Look for the latest visit item of this day
                const todayFirstVisit = visits.reverse().find(
                    visitItem => Moment(visitItem.visitTime).isSame(Moment(today), 'day')
                );

                // Sometimes there aren't any visits (during first load usually)
                if (todayFirstVisit) {
                    historyItem.lastVisitTime = todayFirstVisit.visitTime;
                }
            }
        }
        if (repeatedVisits) {
          return [allHistoryItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime)];
        } else {
          return [historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime)];
        }
    }

    /**
     */
    static async getWeekVisits(date, repeatedVisits) {
        const dateStart = date.clone().startOf('week').toDate();
        const dateEnd = date.clone().endOf('week').toDate();

        let historyItems = await browser.history.search({
            text: "",
            startTime: dateStart,
            endTime: dateEnd,
            maxResults: Number.MAX_SAFE_INTEGER
        });

        const daysArray = new Array([], [], [], [], [], [], []);

        if (repeatedVisits) {
            for (const historyItem of historyItems) {
                let visits = await browser.history.getVisits({ url: historyItem.url });
                // add all separate visits
                for (const visit of visits) {
                    if (visit.visitTime !== undefined) {
                        // create new HistoryItem's with different lastVisitTime
                        var newHistoryItem = {title:historyItem.title, url:historyItem.url, lastVisitTime:visit.visitTime};
                        daysArray[Moment(newHistoryItem.lastVisitTime).weekday()].push(newHistoryItem);
                    }
                }
            }
        } else {
            for (const historyItem of historyItems) {
                daysArray[Moment(historyItem.lastVisitTime).weekday()].push(historyItem);
            }
        }

        return daysArray;
    }

    /**
     * @param {Date} date a date used to check the month and year of each visits
     */
    static async getMonthVisits(date, repeatedVisits) {
        const firstDayOfMonth = date.clone().startOf('month');
        const firstDayOfWeekBeforeMonth = firstDayOfMonth.startOf('week');
        // dont use firstDayOfMonth anymore

        const dateStart = firstDayOfWeekBeforeMonth;
        const dateEnd = dateStart.clone().add(34, 'days');

        let historyItems = await browser.history.search({
            text: "",
            startTime: dateStart.toDate(),
            endTime: dateEnd.toDate(),
            maxResults: Number.MAX_SAFE_INTEGER
        });

        const daysArray = [];
        for (let i = 0; i < 35; i++) {
            daysArray.push([]);
        }

        if (repeatedVisits) {
            for (const historyItem of historyItems) {
                let visits = await browser.history.getVisits({ url: historyItem.url });
                // add all separate visits
                for (const visit of visits) {
                    if (visit.visitTime !== undefined) {
                        // create new HistoryItem's with different lastVisitTime
                        var newHistoryItem = {title:historyItem.title, url:historyItem.url, lastVisitTime:visit.visitTime};
                        const idx = Moment(newHistoryItem.lastVisitTime).dayOfYear() - dateStart.dayOfYear();
                        if (idx < 0 || idx >= 35)
                            continue;
                        daysArray[idx].push(newHistoryItem);
                    }
                }
            }
        } else {
            for (const historyItem of historyItems) {
                const idx = Moment(historyItem.lastVisitTime).dayOfYear() - dateStart.dayOfYear();
                if (idx < 0 || idx >= 35)
                    continue;
                daysArray[idx].push(historyItem);
            }
        }

        return daysArray;
    }

    static formatDayHeader(date) {
        const day_number = date.format('Do');
        const month = date.format('MMMM');
        const year = date.format('YYYY');

        return `${day_number} ${capitalize(month)} ${year}`;
    }

    static formatWeekHeader(date) {
        const week = 'Week';
        const week_number = date.format('w');
        const year = date.format('YYYY');
        return `${week} ${week_number}, ${year}`;
    }

    static formatMonthHeader(date) {
        const month = date.format('MMMM');
        const year = date.format('YYYY');

        return `${capitalize(month)} ${year}`;
    }

    static formatHistoryItem(date) {
        const day = date.format('dddd');
        const day_number = date.format('Do');
        const month = date.format('MMMM');

        return `${capitalize(day)} ${day_number} ${capitalize(month)}`;
    }
}
