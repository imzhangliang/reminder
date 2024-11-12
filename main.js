import Item from './Item.js';
import ScheduledList from './ScheduledList.js';
import TodoList from './TodoList.js';
import DB from './DB.js';

let doneBtn = document.querySelector("#doneBtn");
let dateInput = document.querySelector("#date");
let textInput = document.querySelector("#text");
let addBtn = document.querySelector("#addBtn");


let todoList = new TodoList(document.querySelector('#todoList .body'));
let scheduledList = new ScheduledList(document.querySelector('#scheduledList .body'));
const db = new DB({ todoList, scheduledList });
db.loadData();
todoList.render();
scheduledList.render();
todoList.onChange(() => db.saveData());
scheduledList.onChange(() => db.saveData());


doneBtn.addEventListener('click', function() {
    todoList.removeSelectedItems();
});

addBtn.addEventListener('click', function() {
    let date = new Date(dateInput.value);
    let text = textInput.value;
    let repeatUnit = document.querySelector("#repeatUnit").value || '';
    let repeatNum = parseInt(document.querySelector("#repeatNum").value) || 0;

    if (!isNaN(date) && text && repeatUnit && repeatNum) {
        let item = new Item(date, text, (repeatUnit && repeatNum) ? { unit: repeatUnit, repeat: repeatNum } : null);
        scheduledList.add(item);
    } else {
        console.error('invalid arguments');
    }
 
});


setInterval(() => {
    let item = scheduledList.peekLatestItem();
    if (!item) {
        return;
    }
    //console.log(item.getText(), item.nextDate(), new Date());
    if (item.nextDate() <= new Date()) {
        todoList.add(scheduledList.removeLatestItem());
    }
}, 1000);
