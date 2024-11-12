import Item from './Item.js';

class PriorityQueue {
    #queue = []
    #comparator = null;

    constructor(comparator) {
        this.#comparator = comparator;
        this.#queue = [];
    }

    loadFromJSON(jsonStr) {
        this.#queue = JSON.parse(jsonStr).map(item => Item.fromJSON(item));
    }

    saveAsJSON() {
        return JSON.stringify(this.#queue.map(item => item.toJSON()));
    }

    getList() {
        return this.#queue;
    }

    enqueue(item) {
        this.#queue.push(item);
        this.#queue.sort(this.#comparator);
    }

    peek() {
        return this.#queue[0];
    }

    dequeue() {
        return this.#queue.shift();
    }

    size() {
        return this.#queue.length;
    }

    remove(index) {
        if (index >= 0 && index < this.#queue.length) {
            this.#queue.splice(index, 1);
            return true;
        }

        return false;
    }

    isEmpty() {
        return this.size() == 0;
    }
}

export default PriorityQueue;
