import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {type, dimension, position} = this.props

        const nodeStyle = {
            position: "absolute", 
            top: position.top, 
            left: position.left,
            width: dimension, 
            height: dimension,
            backgroundColor : type === "start" ? "#139b08" : "#e3110d",
            zIndex: 650
        }

        return (
            <div style={nodeStyle}></div>
        )
    }
}

export default Node
