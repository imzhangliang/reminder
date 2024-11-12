Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMonths = function(months) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
}


class Item {
    #nextDate = null;
    #currDate = null;
    #text = null;
    #recurring = null;
    /*
     * recurring format:
     * {
     *      unit: "day" or "week" or "month" or "year"
     *      repeat: <number>
     * }
     *
     * for example:
     * {
     *      unit: "day",
     *      repeat: 5,
     * }
     *
     * means this items recurrs every 5 days
    */

    constructor (date, text, recurring = null, currDate = null) {
        this.#nextDate = date;
        this.#text = text;
        this.#recurring = recurring;
        this.#currDate = currDate;
    }

    toJSON() {
        return JSON.stringify({
            nextDate: this.#nextDate,
            currDate: this.#currDate,
            text: this.#text,
            recurring: this.#recurring,
        });
    }

    static fromJSON(jsonStr) {
        return Item.fromObject(JSON.parse(jsonStr));
    }

    static fromObject(jsonObj) {
        const { currDate, nextDate, text, recurring } = jsonObj;
        return new Item(nextDate && new Date(nextDate), text, recurring, currDate && new Date(currDate));
    }

    // change currDate to nextDate and caculate nextDate. This method is used when the item 
    // is moved from queue to todo list
    caculateNextDate() {
        this.#currDate = this.#nextDate;
        if (this.#recurring) {
            let now = new Date();
            while (this.#nextDate <= now) {
                switch(this.#recurring.unit) {
                    case 'day':
                        this.#nextDate = this.#nextDate.addDays(this.#recurring.repeat);
                        break;
                    case 'week':
                        this.#nextDate = this.#nextDate.addDays(this.#recurring.repeat * 7);
                        break;
                    case 'month':
                        this.#nextDate = this.#nextDate.addMonths(this.#recurring.repeat);
                        break;
                    case 'year':
                        this.#nextDate = this.#nextDate.addMonths(this.#recurring.repeat * 12);
                        break;
                }
            }
        } else {
            this.#nextDate = null;
        }

        return this.#nextDate;
    }

    getText() {
        return this.#text;
    }

    // for the items in the sheduled list
    nextDate() {
        return this.#nextDate;
    }

    // for the items which have been put in todo list
    // If this item is a recurring item, then it can have both currDate() and nextDate() value, and they are actually the same object in both two lists
    currDate() {
        return this.#currDate;
    }

}

export default Item;
