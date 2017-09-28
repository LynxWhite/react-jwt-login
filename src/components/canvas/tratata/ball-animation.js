function getRandomInt(min, max) {
    let res = Math.floor(Math.random() * (max - min)) + min
    if (!res) res = getRandomInt(min, max)
    return res
}


export function drawFrame(context, squarePosition_x, squarePosition_y) {
    // Очистить холст
    context.clearRect(0, 0, 1000, 800)
    // Вызываем метод beginPath(), чтобы убедиться,
    // что мы не рисуем часть уже нарисованного содержимого холста
    context.beginPath()
	
    // Рисуем квадрат размером 10x10 пикселов в текущей позиции
    context.rect(squarePosition_x, squarePosition_y, 10, 10)
    context.lineStyle = '#109bfc'
    context.lineWidth = 1
    context.stroke()
	
    // Перемещаем квадрат вниз на 1 пиксел (где он будет 
    // прорисован в следующем кадре)
    squarePosition_y += getRandomInt(-1, 2)
    squarePosition_x += getRandomInt(-1, 2)
	
    // Рисуем следующий кадр через 20 миллисекунд
    setTimeout(() => {drawFrame(context, squarePosition_x, squarePosition_y)}, 60)
}
