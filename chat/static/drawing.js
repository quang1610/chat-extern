var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

let clickX = [];
let clickY = [];
let clickDrag = [];
let paint = false;

//methods
function addClick (x, y, drag) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(drag);
}

function redraw() {
    //clear the canvas
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle ="#df4b26";
    ctx.lineJoin ="round";
    ctx.lineWidth = 5;

    for(let i = 0; i < clickX.length; i ++) {
        ctx.beginPath();
        if(clickDrag[i] && i) {
            ctx.moveTo(clickX[i - 1], clickY[i  - 1]);
        } else {
            ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        console.log(clickX, clickY, clickDrag);
        ctx.stroke();
    }
}

function getDrawPaths(){
    return {x:clickX, y:clickY, drag:clickDrag};
}

function setDrawPaths(x, y, drag) {
    if(x != null) {
        clickX = x;
    } else {
        clickX = [];
    }
    if(y != null) {
        clickY = y;
    } else {
        clickY = [];
    }
    if(drag != null) {
        clickDrag = drag;
    } else {
        clickDrag = [];
    }
}

//mouse event
canvas.onmousedown = function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
    console.log(`event mouse down: x = ${e.pageX - this.offsetLeft}, y = ${e.pageY - this.offsetTop}`);
    redraw();
};

canvas.onmousemove = function(e) {
    if(paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        console.log(`event mouse move: x = ${e.pageX - this.offsetLeft}, y = ${e.pageY - this.offsetTop}`);
        redraw();
    }
};

canvas.onmouseup = function(e) {
    paint = false;
};

canvas.onmouseleave = function (e) {
    paint = false;
};

//export
export {redraw, setDrawPaths, getDrawPaths};
