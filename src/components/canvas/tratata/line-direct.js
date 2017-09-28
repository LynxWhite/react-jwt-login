function getPoint(x, y) {
    return {x: x, y: y}
}

function getXYZERO(xp, yp, k, b) {
    const x0 = (xp + k * (yp - b)) / ( 1 + k * k)
    const y0 = k === 0 ? 0 : (xp - x0) / k
    return {
        x: x0, 
        y: y0
    }
}

function getNewPos(xp, yp, x0, y0) {
    console.log(x0, y0, xp, yp)
    return {
        x: xp - 2 * (xp - x0),
        y: 2 * y0 + yp
    }
}

function getPointsForLine(k, b) {
    return [
        {
            x: 0,
            y: b
        },
        {
            x: 600,
            y: 600 * k + b
        }
    ]
}

function getKB(p1, p2) {
    const k = (p1.y - p2.y) / (p1.x - p2.x)
    return {
        k: k,
        b: p1.y - k * p1.x
    }
}

function drawLine(canvas, x1, y1, x2, y2) {
    canvas.beginPath()
    canvas.moveTo(x1, y1)
    canvas.lineTo(x2, y2)
    canvas.stroke()
}

function drawPoint(canvas, x, y) {
    canvas.beginPath()
    canvas.arc(x, y, 3, 0, Math.PI * 2, true)
    canvas.fill()
}

function getDirectDots(xp, yp, k, b) {
    const XY0 = getXYZERO(xp, yp, k, b)
    const res = getNewPos(xp, yp, XY0.x, XY0.y)
    return res
}

function drawDirect(xp, yp, k, b) {
    
}

function drawStar(ctx) {
    ctx.beginPath()
    // ctx.fill() // заливка
    ctx.moveTo(50, 125)
    ctx.lineTo(100, 15)
    ctx.lineTo(150, 125)
    ctx.lineTo(40, 55)
    ctx.lineTo(160, 55)
    ctx.lineTo(50, 125)
    ctx.stroke() // линия
    ctx.closePath()
        
    ctx.beginPath()
    ctx.arc(100, 80, 70, 0, Math.PI * 2, true)
    ctx.stroke()
}

function inRad(num) {
    return num * Math.PI / 180
}

function rotateStar(ctx) {
    let angl = 0
    const tx = 10
    const ty = -5
    const timer = setInterval(() => {
        ctx.clearRect(0, 0, 1000, 1000)
        ctx.rotate(inRad(1))
        angl += 1
        if (angl <= 90)
        {
            // tx += 1
            // ty += 1
        }
        ctx.translate(tx, ty)
        drawStar(ctx)
        
        if (angl >= 45) clearInterval(timer)
    }, 100)
}

function itsCool(context, x, y, width, height) {
    let angle = 1
    context.clearRect(0, 0, 1000, 800)
    context.translate(100, 100)
    const timer = setInterval(() => {
        context.clearRect(0, 0, 1000, 800)
        console.log('bad')
        context.rotate(angle)
        context.fillRect(-25, -25, width / 2, height / 2)
        // angle += 1
        // if (angle >= 45) clearInterval(timer)
    }, 60)
    // context.translate(0, 0)
    // context.rotate(0)
}

function rotateSquare(context, x, y, width, height) {
    let angle = inRad(10)
    context.clearRect(0, 0, 1000, 800)
    context.translate(125, 125)
    const timer = setInterval(() => {
        context.clearRect(-100, -100, 1000, 800)
        console.log('bad')
        context.rotate(angle)
        context.fillRect(-25, -25, 50, 50)
        // angle += 1
        // if (angle >= 45) clearInterval(timer)
    }, 60)
    // context.translate(0, 0)
    // context.rotate(0)
}

function getPoint(x, y) {
    return {x: x, y: y}
}

function getXYZERO (xp, yp, k, b) {
    const x0 = (xp + k * (yp - b)) / ( 1 + k * k)
    const y0 = k === 0 ? 0 : (xp - x0) / k
    return {
        x: x0, 
        y: y0
    }
}

function getNewPos(xp, yp, x0, y0) {
    console.log(x0, y0, xp, yp)
    return {
        x: xp - 2 * (xp - x0),
        y: 2 * y0 + yp
    }
}

function getPointsForLine(k, b) {
    return [
        {
            x: 0,
            y: b
        },
        {
            x: 600,
            y: 600 * k + b
        }
    ]
}

function getKB(p1, p2) {
    const k = (p1.y - p2.y) / (p1.x - p2.x)
    return {
        k: k,
        b: p1.y - k * p1.x
    }
}

function trash(k, b, xp, yp) {
    const xres = (1 - k ** 2) / (1 + k ** 2) * xp 
    + 2 * k / (1 + k ** 2) * yp 
    - 2 * k * b / (1 + k ** 2)
    const yres = 
    (2 * k) / (1 + k ** 2) * xp +
    (k ** 2 - 1) / (k ** 2 + 1) * yp
    + 2 * b / (k + k ** 3)
    return {
        x : xres,
        y : yres
    }
}

// console.log('test', trash(2 / 3, 1 / 3, 3, 4))

function test(canvas) {
    canvas.beginPath()

    const kb = getKB(getPoint(24, 57), getPoint(700, 550))
    const linePoints = getPointsForLine(kb.k, kb.b)
    const x1 = linePoints[0]
    const x2 = linePoints[1]
    canvas.moveTo(x1.x, x1.y)
    canvas.lineTo(x2.x, x2.y)
    canvas.stroke()

    canvas.beginPath()
    const fx = getPoint(300, 400)
    canvas.arc(fx.x, fx.y, 3, 0, Math.PI * 2, true)
    canvas.fill()

    const XY0 = getXYZERO(fx.x, fx.y, kb.k, kb.b)

    canvas.beginPath()
    const fy = getNewPos(fx.x, fx.y, XY0.x, XY0.y)
    // console.log(fy)
    canvas.arc(fy.x, fy.y, 3, 0, Math.PI * 2, true)
    canvas.fill()

    canvas.beginPath()
    canvas.moveTo(fx.x, fx.y)
    canvas.lineTo(fy.x, fy.y)
    canvas.stroke()

    canvas.beginPath()
    const tt = trash(2 / 3, 1 / 3, 30, 40)
    const t1 = getXYZERO(30, 40, 2/3, 1/3)
    const t2 = getNewPos(30, 40, t1.x, t1.y)

    canvas.arc(fx.x, fx.y, 3, 0, Math.PI * 2, true)
    canvas.arc(fy.x, fy.y, 3, 0, Math.PI * 2, true)
    canvas.stroke()

    console.log('new', trash(2 / 3, 1 / 3, 30, 40))
    console.log('tmp', t1)
    console.log('old', t2)

    // Нахождение точки отражения
    // 1) найти формулу прямой
    /*
        y = kx + b
        x0 = xp + k * ( yp - b) / ( 1 + k * k)
        y0 = xp - x0 / k    + yp
    */
    // 2) подсчёт координаты точки
    // xres = xp - 2 * (xp - x0)
    // yres = yp - 2 * (yp - y0)
    // сейчас k, b = 0
}
