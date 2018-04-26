var canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

var c = canvas.getContext('2d')

var gold = ['gold']
var purple = ['#9933FF']
var white = ['white']

var colorArray = [gold, purple, white]

var colors = colorArray[0]

function Circle(x, y, vx, vy, r, growth) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.alpha = 1

    this.draw = function() {
        c.beginPath()
        c.strokeStyle = this.color.replace('x', +this.alpha)
        c.arc(this.x, this.y, this.r, Math.PI * 2, false)
        c.lineWidth = 2
        c.stroke()
        c.fillStyle = 'transparent'
        c.fill()
    }

    this.update = function() {
        this.x += this.vx
        this.y += this.vy
        this.alpha -= 0.015
        this.r += growth
        this.draw()
    }
}

function Word(text, x, y, vx, vy) {
    this.x = x
    this.y = y
  this.vx = vx
    this.vy = vy
    this.text = text

    this.draw = function() {
        c.beginPath()
        c.fillStyle = 'white'
        c.strokeStyle = 'white'
        c.fillText(this.text, this.x, this.y)
    }

    this.update = function() {
        this.draw()
      this.x += this.vx
      this.y += this.vy
    }
}

var circles = []
var texts = []


var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x
    mouse.y = e.y
})

window.addEventListener('click', function() {
    colorArray.push(colorArray.shift())
    colors = colorArray[0]
    circles.push(new Circle(mouse.x, mouse.y, 0, 0, 10, 20))
})

window.addEventListener('resize', function() {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    var vx = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2)
    var vy = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2)
    var r = Math.random() * 20 + 30
    circles.push(new Circle(mouse.x, mouse.y, vx, vy, r, -0.5))


    texts.push(new Word('Canvas is Cool', mouse.x, mouse.y, vx, vy))


    for (let i = 0; i < circles.length; ++i) {
        circles[i].update()

        if (circles[i].alpha < 0 || circles[i].r < 3) {
            circles.splice(i, 1)
        }
    }

   for (let i = 0; i < texts.length; ++i) {
        texts[i].update()

        if (texts[i].r < 3) {
            texts.splice(i, 1)
        }
    }
}

animate();
