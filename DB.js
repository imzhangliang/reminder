import config from './config.js';

class DB {
    #apiBaseUrl = config.httpmap
    todoList = null;
    scheduledList = null;
    dbKey = 'reminder';
    constructor({ todoList, scheduledList }) {
        this.todoList = todoList;
        this.scheduledList = scheduledList;
    }

    async loadData() {
        console.log('load data from db....', this.dbKey);
        let dbData = await this.get(this.dbKey);
        if (dbData) {
            const { todoList: todoListData, scheduledList: scheduledListData } = JSON.parse(dbData);
            console.log(todoListData, scheduledListData);
            console.log(this.todoList, this.scheduledList);
            this.todoList.loadFromJSON(todoListData);
            this.scheduledList.loadFromJSON(scheduledListData);
            console.log(this.todoList, this.scheduledList);
        }
    }

    async saveData() {
        console.log('save data to db....');
        let todoListData = this.todoList.saveAsJSON();
        let scheduledListData = this.scheduledList.saveAsJSON();

        let dbData = JSON.stringify({ todoList: todoListData, scheduledList: scheduledListData });
        await this.set(this.dbKey, dbData);
    }

    async get(key) {
        let url = `${this.#apiBaseUrl}/get?key=${key}`;

        return fetch(url).then(resp => resp.json());
    }

    async set(key, value) {
        let url = `${this.#apiBaseUrl}/set`;
        let data = { key, value };

        let resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

}


export default DB;

