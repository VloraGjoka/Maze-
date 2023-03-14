import Queue from "../models/Queue"

export default function bfs(graph, startVertex, endVertex) {
    let path = []
    let edgesExplored = []
    let vertexQueue = new Queue()
    let visitedVertices = new Set()
    visitedVertices.add(startVertex)
    vertexQueue.enqueue(startVertex)
    let parentMap = new Array(graph.vertexCount)
    while (!vertexQueue.empty()) {
        const currentVertex = vertexQueue.dequeue()
        if (currentVertex === endVertex) break
        const incidentEdges = graph.getIncidentEdges(currentVertex)
        incidentEdges.forEach(edge => {
            edgesExplored.push(edge)
            if (!visitedVertices.has(edge.second)) {
                visitedVertices.add(edge.second)
                vertexQueue.enqueue(edge.second)
                parentMap[edge.second] = currentVertex
            }
        });
    }
    let current = endVertex
    while (current !== startVertex) {
        path.push(current)
        current = parentMap[current]
    }
    path.push(startVertex)
    return {path: path.reverse(), edgesExplored: edgesExplored}
}