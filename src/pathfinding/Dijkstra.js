class HeapEntry {
    constructor(vertex=999999, distance=999999) {
        this.vertex = vertex
        this.distance = distance
    }
}

export default function dijkstra(graph, startVertex, endVertex) {
    let path = []
    let edgesExplored = []
    let distances = new Array(graph.vertexCount)
    for (let i = 0; i < graph.vertexCount; i++) {
        distances[i] = 999999
    }
    let entryMap = new Map()
    let visitedVertices = new Set()
    let unvisitedNodes = []
    let parentMap = new Array(graph.vertexCount)
    distances[startVertex] = 0
    entryMap.set(startVertex, new HeapEntry(startVertex, 0))
    unvisitedNodes.push(entryMap.get(startVertex))
    while (unvisitedNodes.length !== 0) {
        const minVertex = unvisitedNodes.pop()
        const currentVertex = minVertex.vertex
        if (distances[currentVertex] === 999999 || currentVertex === endVertex) break
        const incidentEdges = graph.getIncidentEdges(currentVertex)
        incidentEdges.forEach(edge => {
            const neighbour = edge.second
            const newDistance = distances[currentVertex] + edge.weight
            if (!visitedVertices.has(neighbour) && newDistance < distances[neighbour]) {
                edgesExplored.push(edge)
                if (!entryMap.has(neighbour)) {
                    entryMap.set(neighbour, new HeapEntry(neighbour, newDistance))
                    unvisitedNodes.push(entryMap.get(neighbour))
                } else {
                    entryMap.get(neighbour).distance = newDistance
                }
                unvisitedNodes.sort((a, b) => b.distance - a.distance)
                distances[neighbour] = newDistance
                parentMap[neighbour] = currentVertex
            }
        });
        visitedVertices.add(currentVertex)
        
    }
    let current = endVertex
    while (current !== startVertex) {
        path.push(current)
        current = parentMap[current]
    }
    path.push(startVertex)
    return {path: path.reverse(), edgesExplored: edgesExplored}
}