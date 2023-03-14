import Queue from '../models/Queue'

export default function bidirectionalSearch(graph, startVertex, endVertex) {
    let edgesExplored = []
    let startVisited = new Array(graph.vertexCount)
    let endVisited = new Array(graph.vertexCount)
    let startParent = new Array(graph.vertexCount)
    let endParent = new Array(graph.vertexCount)
    const startQueue = new Queue()
    const endQueue = new Queue()
    let intersect = -1
    for (let i = 0; i < graph.vertexCount; i++) {
        startVisited[i] = false
        endVisited[i] = false
    }
    startQueue.enqueue(startVertex)
    startVisited[startVertex] = true
    startParent[startVertex] = -1
    endQueue.enqueue(endVertex)
    endVisited[endVertex] = true
    endParent[endVertex] = -1
    while (!startQueue.empty() && !endQueue.empty()) {
        bfsHelper(startQueue, startVisited, startParent, graph, edgesExplored)
        bfsHelper(endQueue, endVisited, endParent, graph, edgesExplored)
        intersect = hasIntersectingNode(startVisited, endVisited)
        if (intersect !== -1) {
            return buildPath(startParent, endParent, startVertex, endVertex, intersect, edgesExplored)
        }
    }
}

function buildPath(startParent, endParent, startVertex, endVertex, intersect, edgesExplored) {
    let path = []
    path.push(intersect)
    let current = intersect
    while (current !== startVertex) {
        path.push(startParent[current])
        current = startParent[current]
    }
    path = path.reverse()
    current = intersect
    while (current !== endVertex) {
        path.push(endParent[current])
        current = endParent[current]
    }
    return {path: path, edgesExplored: edgesExplored}
}

function bfsHelper(queue, visited, parent, graph, edgesExplored) {
    const currentVertex = queue.dequeue()
    const incidentEdges = graph.getIncidentEdges(currentVertex)
    incidentEdges.forEach(edge => {
        if (!visited[edge.second]) {
            edgesExplored.push(edge)
            parent[edge.second] = currentVertex
            visited[edge.second] = true
            queue.enqueue(edge.second)
        }
    });
}

function hasIntersectingNode(startVisited, endVisited) {
    for (let i = 0; i < startVisited.length; i++) {
        if (startVisited[i] && endVisited[i]) return i;
    }
    return -1
}