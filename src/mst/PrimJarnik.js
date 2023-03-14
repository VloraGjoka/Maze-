import Graph from "../models/Graph"

class PQEntry {
    constructor(weight=9999999, vertex=9999999, edge=null) {
        this.weight = weight
        this.vertex = vertex
        this.edge = edge
    }
}

export default function primJarnik(graph) {
    let maze = new Graph(graph.width, graph.height)
    let mst = []
    let treeBounds = new Array(graph.vertexCount)
    let priorityQueue = []
    let entryMap = new Map()
    for (let vertex = 0; vertex < graph.vertexCount; vertex++) {
        treeBounds[vertex] = treeBounds.size === 0 ? 0 : 9999999
        entryMap.set(vertex, new PQEntry(treeBounds[vertex], vertex, null))
        priorityQueue.push(entryMap.get(vertex))
    }
    priorityQueue.sort((a, b) => b.weight - a.weight)
    while (priorityQueue.length !== 0) {
        const minElement = priorityQueue.pop()
        if (minElement.edge !== null) {
            maze.addEdge(minElement.edge.first, minElement.edge.second)
            mst.push(minElement.edge)
        }
        const incidentEdges = graph.getIncidentEdges(minElement.vertex)
        incidentEdges.forEach(edge => {
            if (entryMap.has(edge.second) && edge.weight < treeBounds[edge.second]) {
                treeBounds[edge.second] = edge.weight
                entryMap.get(edge.second).weight = edge.weight
                entryMap.get(edge.second).edge = edge
                priorityQueue.sort((a, b) => b.weight - a.weight)
            }
        });
        entryMap.delete(minElement.vertex)
    }
    return {mst: mst, maze: maze}
}