var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 480;

var ctx = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 50;

var colorArray = ['#33cc33', '#cc33ff', '#ff3300', '#e6e600', '#007acc'];

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('', function() {});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    if (this.x > canvas.width - this.radius || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y > canvas.height - this.radius || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

for (var i = 0; i < 800; i++) {
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;
  var dx = Math.random() - .5;
  var dy = Math.random() - .5;
  var radius = Math.random() * 3 + 1;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
