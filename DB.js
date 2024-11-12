
class DB {
    todoList = null;
    scheduledList = null;
    dbKey = 'reminder';
    constructor({ todoList, scheduledList }) {
        this.todoList = todoList;
        this.scheduledList = scheduledList;
    }

    loadData() {
        console.log('load data from db....', this.dbKey);
        let dbData = this.get(this.dbKey);
        if (dbData) {
            const { todoList: todoListData, scheduledList: scheduledListData } = JSON.parse(dbData);
            console.log(todoListData, scheduledListData);
            console.log(this.todoList, this.scheduledList);
            this.todoList.loadFromJSON(todoListData);
            this.scheduledList.loadFromJSON(scheduledListData);
            console.log(this.todoList, this.scheduledList);
        }
    }

    saveData() {
        console.log('save data to db....');
        let todoListData = this.todoList.saveAsJSON();
        let scheduledListData = this.scheduledList.saveAsJSON();

        let dbData = JSON.stringify({ todoList: todoListData, scheduledList: scheduledListData });
        this.set(this.dbKey, dbData);
    }

    set(key, value) {
        localStorage.setItem(key, value);
    }

    get(key) {
        return localStorage.getItem(key);
    }
}


export default DB;

