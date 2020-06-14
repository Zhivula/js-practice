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
img.width = 50;
img.addEventListener("load", function() {
 for (let x = 10; x < 50; x += 25)
   canvas.drawImage(img, x, 10);
});