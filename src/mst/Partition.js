export default class Partition {
    constructor(vertexCount) {
        this.positions = new Array(vertexCount)
        for (let i = 0; i < this.positions.length; i++) {
            this.positions[i] = {parent: i, size: 1}
        }
    }

    find(vertex) {
        if (this.positions[vertex].parent !== vertex)
            this.positions[vertex].parent = this.find(this.positions[vertex].parent)
        return this.positions[vertex].parent
    }

    union(x, y) {
        const xRoot = this.find(x)
        const yRoot = this.find(y)
        if (this.positions[xRoot].size < this.positions[yRoot].size)
		    this.positions[xRoot].parent = yRoot;
	    else if (this.positions[xRoot].size > this.positions[yRoot].size)
		    this.positions[yRoot].parent = xRoot;
        else
        {
            this.positions[yRoot].parent = xRoot;
            this.positions[xRoot].size++;
        }
    }

    doesMakeCycle(edge) {
        return (this.find(edge.first) === this.find(edge.second))
    }

    addEdge(edge) {
        this.union(this.find(edge.first), this.find(edge.second))
    }
}