import React, { Component } from 'react'
import './Edge.css'

export class Edge extends Component {
    render() {
        const horizontalEdgeStyle = {
            position: "absolute",
            top: this.props.position.top,
            left: this.props.position.left,
            width: 3*this.props.dimension,
            height: this.props.dimension,
            backgroundColor: "white",
            textAlign: "center"
        }
        const verticalEdgeStyle = {
            position: "absolute",
            top: this.props.position.top,
            left: this.props.position.left,
            width: this.props.dimension,
            height: 3*this.props.dimension,
            backgroundColor: "white",
            textAlign: "center"
        }
        const minVertex = Math.min(this.props.edge.first, this.props.edge.second)
        const maxVertex = Math.max(this.props.edge.first, this.props.edge.second)
        if (Math.abs(this.props.edge.first - this.props.edge.second) === 1) {
            return <div id={`edge-${minVertex}-${maxVertex}`} style={horizontalEdgeStyle}></div>
        } else {
            return <div id={`edge-${minVertex}-${maxVertex}`} style={verticalEdgeStyle}></div>
        }
    }
}

export default Edge
