export default class Stack {
    constructor() {
        this.stack = []
    }

    empty() {
        return this.stack.length === 0
    }

    push(item) {
        this.stack.push(item)
    }

    pop() {
        return this.stack.pop()
    }
}