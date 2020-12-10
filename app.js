const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("Js_color");
const range = document.getElementById("js_Range");
const mode = document.getElementById("js_mode");
const save = document.getElementById("js_save");

const DE_COLOR_ = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.strokeStyle = "DE_COLOR_";
ctx.filling = "DE_COLOR_";
ctx.lineWidth = 3;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true; 
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0, canvas.width, canvas.height)
    }
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs🎨";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

if(Array){
    Array.from(colors).forEach(change => change.addEventListener("click", changeColor));
}
if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleMode);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}