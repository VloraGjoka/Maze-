import Stack from '../models/Stack'

export default function dfs(graph, startVertex, endVertex) {
    let vertexStack = new Stack()
    let path = []
    let edgesExplored = []
    let visitedVertices = new Set()
    vertexStack.push(startVertex)
    let parentMap = new Array(graph.vertexCount)
    while (!vertexStack.empty()) {
        const currentVertex = vertexStack.pop()
        if (currentVertex === endVertex) break
        visitedVertices.add(currentVertex)
        const incidentEdges = graph.getIncidentEdges(currentVertex)
        incidentEdges.forEach(edge => {
            edgesExplored.push(edge)
            if (!visitedVertices.has(edge.second)) {
                visitedVertices.add(edge.second)
                vertexStack.push(edge.second)
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