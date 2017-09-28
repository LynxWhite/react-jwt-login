
Number.prototype.toRad = function() { return this * Math.PI / 180 }

export function rotateObject(array, angle) {
    let x0 = 0
    let y0 = 0
    let count = 0
    array.forEach(coord => {
        x0 += coord.x
        y0 += coord.y
        count += 1
    })
    x0 = x0 / count
    y0 = y0 / count
    const transpArray = array
    transpArray.forEach(item => {
        const startX = item.x - x0
        const startY = item.y - y0
        const rotatedX = startX * Math.cos(angle) - startY * Math.sin(angle)
        const rotatedY = startX * Math.sin(angle) + startY * Math.cos(angle)
        const newX = rotatedX + x0
        const newY = rotatedY + y0
        item.x = newX
        item.y = newY
    })
    return transpArray
}

export function getCenter(array) {
    const sum = {x: 0, y: 0}
    array.forEach(coord => {
        sum.x += coord.x
        sum.y += coord.y
    })
    sum.x = sum.x / array.length
    sum.y = sum.y / array.length
    return sum
}

export function moveFigure(array, {x, y}, t) {
    const center = getCenter(array)
    const newX = (1 - t) * center.x + (t) * x
    const newY =  (1 - t) * center.y + (t) * y
    const dist = {x: newX - center.x, y: newY - center.y}
    array.forEach(item => {
        item.x += dist.x
        item.y += dist.y
    })
    return array
}
