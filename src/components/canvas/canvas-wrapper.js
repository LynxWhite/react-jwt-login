import React, {Component} from 'react'

class CanvasWrapper extends Component {
    componentDidMount() {
        const example = document.getElementById('example')
        const ctx     = example.getContext('2d')
        ctx.beginPath()
        // ctx.fill() // заливка
        ctx.moveTo(60, 130)
        ctx.lineTo(150, 30)
        ctx.lineTo(240, 130)
        ctx.lineTo(50, 70)
        ctx.lineTo(260, 70)
        ctx.lineTo(60, 130)
        ctx.stroke() // линия
        ctx.closePath()
        
        ctx.beginPath()
        ctx.arc(60, 60, 20, 0, Math.PI * 2, true)
        ctx.stroke()
        
    }
    render() {
        return (
            <canvas id='example' />
        )
    }
}

export default CanvasWrapper
