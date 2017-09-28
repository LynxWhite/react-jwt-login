function drawSimpleCircle(canvas, x, y, size) {
    canvas.beginPath()
    canvas.arc(x, y, size, 0, Math.PI * 2, true) 
    canvas.fill()
}

export function drawWay(canvas, array) {
    if (array.length === 0) {
        canvas.clearRect(0, 0, 1000, 680)
        return
    }
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

export function drawFigure(canvas, array) {
    canvas.beginPath()
    canvas.moveTo(array[0].x, array[0].y)
    array.forEach(dot => [
        canvas.lineTo(dot.x, dot.y)
    ])
    canvas.fill()
}