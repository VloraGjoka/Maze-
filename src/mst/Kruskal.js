import Partition from './Partition'
import Graph from '../models/Graph'

export default function kruskal(graph) {
    const edges = [...graph.edges].sort((a, b) => a.weight - b.weight)
    let mst = []
    let maze = new Graph(graph.width, graph.height)
    const vertexCount = graph.width * graph.height
    let partition = new Partition(vertexCount)
    let i = 0
    while (mst.length < vertexCount-1 && i < graph.edges.length) {
        const edge = edges[i]
        if (!partition.doesMakeCycle(edge)) {
            mst.push(edge)
            partition.addEdge(edge)
            maze.addEdge(edge.first, edge.second)
        }
        i++
    }
    return {mst: mst, maze: maze}
}