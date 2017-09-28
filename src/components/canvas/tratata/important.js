/*
даны x0 y0
нарисовать круг r = 10
с центром в x0 y0 
*/
Number.prototype.toRad = function() { return this * Math.PI / 180 }

function drawSimpleCircle(canvas, x, y, size) {
    canvas.beginPath()
    canvas.arc(x, y, size, 0, Math.PI * 2, true) 
    canvas.fill()
}

function rotateObject(array, angle) {
    let x0 = 0
    let y0 = 0
    let count = 0
    array.forEach(coord => {
        x0 += coord.x
        y0 += coord.y
        count += 1
    })
    x0 = Math.round(x0 / count)
    y0 = Math.round(y0 / count)
    const transpArray = array
    transpArray.forEach(item => {
        const startX = item.x - x0
        const startY = item.y - y0
        const rotatedX = Math.round(startX * Math.cos(angle) - startY * Math.sin(angle))
        const rotatedY = Math.round(startX * Math.sin(angle) + startY * Math.cos(angle))
        const newX = rotatedX + x0
        const newY = rotatedY + y0
        item.x = newX
        item.y = newY
    })
    return transpArray
}
function drawFigure(canvas, array) {
    canvas.beginPath()
    canvas.moveTo(array[0].x, array[0].y)
    array.forEach(dot => [
        canvas.lineTo(dot.x, dot.y)
    ])
    canvas.fill()
}


function drawSquare(canvas, x, y, angle, size) {
    /*
    canvas.beginPath()
    canvas.moveTo(x - 10, y - 10)
    canvas.lineTo(x + 10, y - 10)
    canvas.lineTo(x + 10, y + 10)
    canvas.lineTo(x - 10, y + 10)
    canvas.fill()
    */
    let dots = [
        {x: x - size, y: y - size},
        {x: x + size, y: y - size},
        {x: x + size, y: y + size},
        {x: x - size, y: y + size}
    ]
    dots = rotateObject(dots, angle)
    drawFigure(canvas, dots)
}


function drawCircle(canvas, x, y, size) {
    canvas.beginPath()
    let dots = [
        {x: x - 10, y: y - 10},
        {x: x + 10, y: y - 10},
        {x: x + 10, y: y + 10},
        {x: x - 10, y: y + 10}
    ]
    dots = rotateObject(dots, 5)
    drawFigure(canvas, dots)
    /*
    canvas.moveTo(x - 10, y - 10)
    canvas.lineTo(x + 10, y - 10)
    canvas.lineTo(x + 10, y + 10)
    canvas.lineTo(x - 10, y + 10)
    */
    // canvas.lineTo(x + 10, y - 10)
    // canvas.translate(x, y)
    // canvas.fillRect(x, y, size, size)
    // canvas.arc(0, 0, size, 0, Math.PI, true)
    // canvas.rotate(90) 
    // canvas.fill()
    // canvas.beginPath()
    // canvas.arc(0, 0, size, 0, Math.PI, true)
    // canvas.rotate(-90)
    // canvas.translate(-x, -y)
    // canvas.fill()
    // canvas.clearRect(x, y, size, size)
}

function drawCrazyCircle(canvas, x, y, size, mode) {
    setTimeout(() => {
        canvas.clearRect(x - size, y - size, 2 * size, 2 * size)
        if (x > 800 && mode > 0) mode = mode * (-1)
        if (x < 50 && mode < 0) mode = mode * (-1)
        const newX = x + mode
        drawCircle(canvas, newX, y, size)
        drawCrazyCircle(canvas, newX, y, size, mode)
    }, 60)
}

function drawWay(canvas, array) {
    const size = 2
    canvas.clearRect(0, 0, 1000, 680)
    array.forEach(dot => {
        drawSimpleCircle(canvas, dot.x, dot.y, size)
    }, this)
    canvas.beginPath()
    canvas.moveTo(array[0].x, array[0].y)
    array.forEach(dot => {
        canvas.lineTo(dot.x, dot.y)
    }, this)
    canvas.lineTo(array[0].x, array[0].y)
    canvas.stroke()
}

function drawMovindCircle(canvas, array, x, y, size, moveToDot) {
    moveToDot = moveToDot || 0
    moveToDot = array.length === moveToDot ? 0 : moveToDot
    return setTimeout(() => {
        drawWay(canvas, array)
        drawCircle(canvas, x, y, size)
        const newX = (1 - 0.01) * x + (1 - 0.99) * array[moveToDot].x
        const newY = (1 - 0.01) * y + (1 - 0.99) * array[moveToDot].y
        if (array[moveToDot].x === newX && array[moveToDot].y === newY) {
            moveToDot += 1
        } 
        drawMovindCircle(canvas, array, newX, newY, size, moveToDot)
    }, 200)
}


function setTimerAnivation(canvas, array, x, y, size, moveToDot, callback) {
    let newDot = array.length === newDot ? 0 : newDot || 0
    let newX = x
    let newY = y
    let t = 0.01
    let angle = 1
    return setInterval(() => {
        newDot = array.length === newDot ? 0 : newDot || 0
        drawWay(canvas, array)
        drawSquare(canvas, newX, newY, angle, size)
        
        // const tnewX = newX * Math.cos(Math.PI / 2) - newY * Math.sin(Math.PI / 2)
        // const tnewY = newX * Math.sin(Math.PI / 2) + newY * Math.cos(Math.PI / 2)
        // newX = tnewX
        // newY = tnewY

        newX = (1 - t) * newX + (t) * array[newDot].x
        newY =  (1 - t) * newY + (t) * array[newDot].y
        angle = (angle + 1) % 360

        callback(newX, newY, newDot)
        t = t !== 1 ? (t + 0.01) : 1
        if (
            array[newDot].x >= newX - 5
            && array[newDot].x <= newX + 5 
            && array[newDot].y >= newY - 5
            && array[newDot].y <= newY + 5
        ) {
            newDot += 1
            t = 0.01
            callback(newX, newY, newDot)
        }
    }, 60)
}


// drawCircle(canvas, array[0].x, array[0].y, 10)

/*
    constructor(props) {
        super(props)
        this.state = {
            context: null
        }
        this.wayArr = []
        this.indexOfEditDot = -1
        this.animation = null
        this.ballX = 0
        this.ballY = 0
        this.moveToDot = 0
    }

    setNewCoord = (x, y, to) => {
        this.ballX = x
        this.ballY = y
        this.moveToDot = to
    }

    componentDidMount() {
        const example = document.getElementById('example')
        const context = example.getContext('2d')
        this.setState({context: context})
        example.width  = 800
        example.height = 600
        const elemLeft = example.offsetLeft
        const elemTop = example.offsetTop
        example.onmousedown = e => {
            // Проверка есть ли уже такая точка
            for (let i = 0; i < this.wayArr.length; i++) {
                if (this.wayArr[i].x >= e.x - 5 
                    && this.wayArr[i].y <= e.y + 5
                    && this.wayArr[i].y >= e.y - 5
                    && this.wayArr[i].y <= e.y + 5
                ) {
                    this.indexOfEditDot = i
                    return
                }
            }
            this.wayArr.push({
                x: e.x, 
                y: e.y
            })
            this.setNewCoord(e.x, e.y)
            drawWay(context, this.wayArr)
            if (this.animation) {
                clearTimeout(this.animation)
            }
            this.animation = setTimerAnivation(context, this.wayArr, this.ballX, this.ballY, 10, this.moveToDot, this.setNewCoord)
        }

        example.onmousemove = e => {
            if (this.indexOfEditDot >= 0) {
                this.wayArr[this.indexOfEditDot] = {
                    x: e.x,
                    y: e.y
                }
                drawWay(context, this.wayArr)
                if (this.animation) {
                    clearTimeout(this.animation)
                }
                this.animation = setTimerAnivation(context, this.wayArr, this.ballX, this.ballY, 10, this.moveToDot, this.setNewCoord)
            }
        }

        example.onmouseup = e => {
            this.indexOfEditDot = -1
        }
        
        /*
        let dots = [{x: 200, y: 100}, {x: 240, y: 100}, {x: 240, y: 140}, {x: 200, y: 140}]
        drawFigure(context, dots)
        setInterval(
            () => {
                context.clearRect(0, 0, 1000, 1000)
                dots = rotateObject(dots, (15).toRad())
                drawFigure(context, dots)
            }, 80
        )
        
        dots = rotateObject(dots, (90).toRad())
        drawFigure(context, dots)
        */
        // В этом месте писать draw

        /*
        context.beginPath()
        context.arc(200, 100, 30, 0, Math.PI * 2, true)
        context.stroke()
        */
        // drawCrazyCircle(context, 20, 200, 30, 10)
        // drawCircle(context, 100, 100, 30)
    }

*/