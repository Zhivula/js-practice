let rec = document.querySelector("rect");
rec.setAttribute("fill", "green");

let canvas = document.getElementById("canvas").getContext("2d");
/*canvas.fillStyle = "red";
canvas.fillRect(10, 10, 100, 50);
canvas.strokeStyle = "blue";
canvas.strokeRect(5,5,50,50);
canvas.lineWidth = 5;
canvas.strokeRect(135,5,50,50);
canvas.beginPath();
for(let y = 10, x = 90; y < 100; y+=10, x-=10){
	canvas.moveTo(y,y);
	canvas.lineTo(x,y);
}
canvas.stroke();
canvas.beginPath();
canvas.moveTo(150,50);
canvas.lineTo(120,100);
canvas.lineTo(180,100);
canvas.fill();
//quadraticCurveTo==============================
canvas.beginPath();
canvas.lineWidth = 1;
canvas.strokeStyle = "green";
canvas.moveTo(150, 100);
canvas.quadraticCurveTo(50,180,70,90);
canvas.lineTo(50,150);
canvas.closePath();
canvas.stroke();

  canvas.beginPath();
  canvas.moveTo(10, 90);
  canvas.bezierCurveTo(10, 10, 90, 10, 50, 90);
  canvas.lineTo(90, 10);
  canvas.lineTo(10, 10);
  canvas.closePath();
  canvas.stroke();*/
canvas.beginPath();
canvas.moveTo(10, 10);
// control=(90,10) goal=(90,90) radius=20
canvas.arcTo(90, 20, 90, 90, 20);
canvas.moveTo(10, 50);
// control=(90,10) goal=(90,90) radius=80
canvas.arcTo(90, 10, 90, 90, 40);
canvas.arc(100,100,20,0,6);
canvas.stroke();
let results = [
  {name: "Удовлетворён", count: 1043, color: "lightblue"},
  {name: "Нейтральное", count: 563, color: "lightgreen"},
  {name: "Не удовлетворён", count: 510, color: "pink"},
  {name: "Без комментариев", count: 175, color: "silver"}
];
let total = results.reduce(function (sum, choice) {
	return sum + choice.count;
},0);

let currentAngle = -0.5 * Math.PI;
results.forEach(function(result){
	let sliceAngle = (result.count/total) * 2 * Math.PI;
	canvas.beginPath();
	canvas.arc(300, 200, 50, currentAngle, currentAngle+sliceAngle);
	currentAngle+=sliceAngle;
	canvas.lineTo(300,200);
	canvas.fillStyle = result.color;
	canvas.fill();
});
canvas.font = "28px Georgia";
canvas.fillStyle = "fuchsia";
canvas.textAlign = "center";
canvas.textBaseline = "middle";
canvas.fillText("Это текст", 10,50);

let img = document.createElement("img");
img.src = "cat.jpg";
/*img.addEventListener("load", function() {
 for (let x = 10; x < 50; x += 25)
   canvas.drawImage(img, x, 10);
});*/
function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}
let spriteW = 200, spriteH = 200;
img.addEventListener("load", function() {
 flipHorizontally(canvas, 100 + spriteW / 2);
 canvas.drawImage(img, 0, 0, spriteW, spriteH,
              100, 0, spriteW, spriteH);
});
function branch(length, angle, scale) {
	canvas.fillRect(0, 0, 1, length);
	if (length < 8) return;
	canvas.save();
	canvas.translate(0, length);
	canvas.rotate(-angle);
	branch(length * scale, angle, scale);
	canvas.rotate(2 * angle);
	branch(length * scale, angle, scale);
	canvas.restore();
}
canvas.translate(300, 0);
branch(50, 0.5, 0.8);
//Exercises========================================
let canv = document.getElementById("canv").getContext("2d");
function fig(startX, startY, height, top, bottom) {
	canv.beginPath();
	canv.moveTo(startX, startY);
	let x1 = startX + (bottom-top)/2;
	let y1 = startY-height;
	canv.lineTo(x1, y1);
	let x2 = x1+top;
	canv.lineTo(x2,y1);
	canv.lineTo(x2+(bottom-top)/2,y1+height);
	canv.lineTo(startX,startY);
	canv.stroke();
}
//fig(10,100,50,50,120);
function rc(startX, startY, size) {
	canv.fillStyle = "red";
	canv.translate(size,0);
	canv.rotate(45);
	canv.fillRect(startX,startY, size,size);
}
//rc(10,10,50);
function le(startX, startY, length, height, count) {
	canv.beginPath();
	canv.moveTo(startX,startY);
	for(let i = 0; i < count; i++){
		canv.lineTo(startX+length,startY+(height/2));
		canv.lineTo(startX, startY+height);
		startY += height;
	}
	canv.stroke();
}
//le(10,10,50,10,7);
function st(startX, startY, r) {
	canv.beginPath();
	canv.moveTo(startX-r,startY);
	let x1 = startX-r;
	let y1 = startY;
	let x2, y2;
	let angle = 45;
	for(let i = 0; i < 8; i++){
		x2 = x1 + r - r * Math.sin((angle*Math.PI)/180);
		y2 = y1 - r * Math.sin((angle*Math.PI)/180);
		canv.bezierCurveTo(x1, y1, startX, startY, x2, y2);
		x1=x2;
		y1=y2;
		angle+=45;
	}
	canv.stroke();
}
st(100,100,50);