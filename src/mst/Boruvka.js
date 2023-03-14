import Partition from './Partition'
import Graph from '../models/Graph'

export default function boruvka(graph) {
    let partition = new Partition(graph.vertexCount)
    let maze = new Graph(graph.width, graph.height)
    let mst = []
    let treeCount = graph.vertexCount
    let cheapest = new Array(graph.vertexCount)
    while (treeCount > 1) {
        for (let i = 0; i < graph.vertexCount; i++) cheapest[i] = -1
        for (let i = 0; i < graph.edges.length; i++) {
            const edge = graph.edges[i]
            if (!partition.doesMakeCycle(edge)) {
                const firstRoot = partition.find(edge.first)
                const secondRoot = partition.find(edge.second)
                if (cheapest[firstRoot] === -1 || graph.edges[cheapest[firstRoot]].weight > edge.weight)
                    cheapest[firstRoot] = i
                if (cheapest[secondRoot] === -1 || graph.edges[cheapest[secondRoot]].weight > edge.weight)
                    cheapest[secondRoot] = i
            }
        }
        for (let vertex = 0; vertex < graph.vertexCount; vertex++) {
            if (cheapest[vertex] !== -1) {
                if (!partition.doesMakeCycle(graph.edges[cheapest[vertex]])) {
                    maze.addEdge(graph.edges[cheapest[vertex]].first, graph.edges[cheapest[vertex]].second)
                    mst.push(graph.edges[cheapest[vertex]])
                    partition.addEdge(graph.edges[cheapest[vertex]])
                    treeCount--
                }
            }
        }
    }
    return {mst: mst, maze: maze}
}