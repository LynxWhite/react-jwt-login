import React, {Component} from 'react'

import {drawWay, drawFigure} from './canvasDraw'
import {rotateObject, moveFigure, getCenter} from './canvasAnimations'

class CanvasWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            context: null,
            angle: 5,
            speed: 0.01,
            state: 0,
            color: '#000000'
        }
        this.figure = []
        this.way = []
        this.indexOfEditDot = -1
        this.start = {x: 0, y: 0}
        this.goToDot = 0
        this.animation = null
        this.speedC = 0.01
    }

    componentDidMount() {
        const example = document.getElementById('example')
        const context = example.getContext('2d')
        this.setState({context: example.getContext('2d')})
        example.width  = 800
        example.height = 500
        example.onmousedown = e => {
            switch (this.state.state) {
                case 1:  
                    // Проверяем, есть ли в месте клика точка
                    // Если есть, включаем режим перетаскивания
                    for (let i = 0; i < this.figure.length; i++) {
                        if (this.figure[i].x >= e.x - 5 
                            && this.figure[i].y <= e.y + 5
                            && this.figure[i].y >= e.y - 5
                            && this.figure[i].y <= e.y + 5
                        ) {
                            this.indexOfEditDot = i
                            return
                        }
                    }
                    this.figure.push({
                        x: e.x, 
                        y: e.y
                    })
                    // Отрисовка изменений
                    drawWay(context, this.figure)          
                    break
                case 2:
                    // Проверяем, есть ли в месте клика точка
                    // Если есть, включаем режим перетаскивания
                    for (let i = 0; i < this.way.length; i++) {
                        if (this.way[i].x >= e.x - 5 
                            && this.way[i].y <= e.y + 5
                            && this.way[i].y >= e.y - 5
                            && this.way[i].y <= e.y + 5
                        ) {
                            this.indexOfEditDot = i
                            return
                        }
                    }
                    this.way.push({
                        x: e.x, 
                        y: e.y
                    })
                    this.setState({start: {x: e.x, y: e.y}})
                    // Отрисовка изменений
                    drawWay(context, this.way)
                    break
                default: 
                    return
            }
        }
        example.onmousemove = e => {
            if (this.indexOfEditDot >= 0 && this.state.state === 2) {
                this.way[this.indexOfEditDot] = {
                    x: e.x,
                    y: e.y
                }
                drawWay(context, this.way)
            }
            if (this.indexOfEditDot >= 0 && this.state.state === 1) {
                this.figure[this.indexOfEditDot] = {
                    x: e.x,
                    y: e.y
                }
                drawWay(context, this.figure)
            }
        }
        example.onmouseup = e => {
            if (this.indexOfEditDot !== -1)
                this.indexOfEditDot = -1
        }
    }

    onClickStart = () => {
        this.setState({state: 3})
        this.animation = null // startAnimation(context)
        const example = document.getElementById('example')
        const context = example.getContext('2d')
        this.animation = setInterval(
            () => {
                context.clearRect(0, 0, 1000, 1000)
                this.figure = moveFigure(this.figure, this.way[this.goToDot], this.speedC)
                this.figure = rotateObject(this.figure, (parseInt(this.state.angle)).toRad())
                drawWay(context, this.way)
                context.fillStyle = this.state.color
                drawFigure(context, this.figure)
                context.fillStyle = 'black'
                this.speedC = this.speedC + this.state.speed > 1 ? 1 : (this.speedC + this.state.speed)
                const center = getCenter(this.figure)
                const newX = center.x
                const newY = center.y
                if (
                    this.way[this.goToDot].x >= newX - 5
                    && this.way[this.goToDot].x <= newX + 5 
                    && this.way[this.goToDot].y >= newY - 5
                    && this.way[this.goToDot].y <= newY + 5
                ) {
                    this.goToDot = this.goToDot + 1 >= this.way.length ? 0 : this.goToDot + 1
                    this.speedC = 0.01
                }
            }, 60
        )
    }

    onClickStop = () => {
        this.setState({state: 0})
        if (this.animation) {
            clearTimeout(this.animation)
        }
    }

    onClickDrawFigure = () => {
        this.setState({state: 1})
        drawWay(this.state.context, this.figure)
    }

    onClickDrawWay = () => {
        this.setState({state: 2})
        drawWay(this.state.context, this.way)
    }

    render() {
        return (
            <div>
                <canvas id='example' style={{border: '1px solid black'}}/>
                <ul>
                    <li><button onClick={this.onClickDrawFigure}>Нарисовать фигуру  </button></li>
                    <li><button onClick={this.onClickDrawWay}>Нарисовать путь    </button></li>
                    <li><button onClick={this.onClickStart}>Запустить движение </button></li>
                    <li><button onClick={this.onClickStop}>Остановить движение</button></li>
                    <li><input placeholder='Угол поворота' value={this.state.angle} onChange={(e)=>this.setState({angle: e.target.value})} /></li>
                    <li><input placeholder='Скорость' value={this.state.speed} onChange={(e)=>this.setState({speed: parseFloat(e.target.value)})} /></li>
                    <li><input placeholder='Цвет фигуры' value={this.state.color} onChange={(e)=>this.setState({color: e.target.value})} /></li>
                
                </ul>
            </div>
        )
    }
}

export default CanvasWrapper
