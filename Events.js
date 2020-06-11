let button = document.querySelector("button");
button.addEventListener("click", function(event){
	if(event.which == 1) console.log("Была нажата левая кнопка.");
	else if(event.which == 2) console.log("Была нажата средняя кнопка.");
	else if(event.which == 3) console.log("Была нажата правая кнопка.");
});

let p = document.querySelector("p");
p.addEventListener("mousedown", function(){
	console.log("Была нажата кнопка на параграфе.");
}); 
document.body.addEventListener("click", function(event){
	if(event.target.nodeName == "BUTTON") console.log("Clicked ", event.target.textContent);
});

let lin = document.querySelector("a");
lin.addEventListener("click", function(event){
	console.log("Не получится перейти по ссылке!");
	event.preventDefault();
});

addEventListener("keydown", function(event){
	if(event.keyCode == 86) document.body.style.background = "violet";
});
addEventListener("keyup", function(event){
	if(event.keyCode == 86) document.body.style.background = "";
});
console.log("Violet".charCodeAt(0));
console.log("1".charCodeAt(0));
addEventListener("keydown",function(event){
	if(event.keyCode == 86 && event.shiftKey) document.body.style.background = "green";
});
addEventListener("keypress", function(event){
	console.log("Была нажата: ", String.fromCharCode(event.charCode));
});
addEventListener("click", function(event){
	let dot = document.createElement("div");
	dot.className = dot;
	dot.style.left = (event.pageX - 4) + "px";
	dot.style.top = (event.pageY - 4) + "px";
	document.body.appendChild(dot);
});
//===================================================
let lastX;
let rect = document.querySelector("#box");
rect.addEventListener("mousedown", function(event){
	if(event.which == 1) lastX = event.pageX;
	addEventListener("mousemove", moved);
	event.preventDefault();//запретим выделение
});
function moved(event){
	if(event.which != 1){
		removeEventListener("mousemove", moved);
	} else{
		let dist = event.pageX - lastX;
		let newWidth = Math.max(10, rect.offsetWidth + dist);
		rect.style.width = newWidth + "px";
		lastX = event.pageX;
	}
}

function isInside(node, target){
	for (; node != null; node = node.parentNode) 
		if(node == target) return true;
}
p.addEventListener("mouseover", function(event){
	if(isInside(event.relatedTarget, p)) p.style.color = "red";
});
p.addEventListener("mouseout", function(event){
	if(!isInside(event.relatedTarget, p)) p.style.color = "";
});
let bar = document.querySelector(".progress div");
addEventListener("scroll", function(){
	let max = document.body.scrollHeight - innerHeight;
	let percent = (pageYOffset/max)*100;
	bar.style.width = percent+"%";
});

let help = document.querySelector("#help");
let fields = document.querySelectorAll("input");
for(let i = 0; i < fields.length; i++){
	fields[i].addEventListener("focus", function(event){
		let text = event.target.getAttribute("data-help");
		help.textContent = text;
	});
	fields[i].addEventListener("blur", function(event){
		help.textContent = "";
	});
}
//Установка таймеров================================
setTimeout(function(){
	document.body.style.background = "green";
}, 3000);
let ticks = 0;
let clock = setInterval(function(){
	console.log("tick", ticks++);
	if(ticks == 10){
		clearInterval(clock);
		console.log("stop.");
	}
},200);
/* function displayCoords(event) {
    document.body.textContent =
      "Мышь на " + event.pageX + ", " + event.pageY;
  }

  var scheduled = false, lastEvent;
  addEventListener("mousemove", function(event) {
    lastEvent = event;
    if (!scheduled) {
      scheduled = true;
      setTimeout(function() {
        scheduled = false;
        displayCoords(lastEvent);
      }, 250);
    }
  });*/
//Exercises==========================================
//Цензура клавиатуры
let field = document.querySelector(".withoutQWX");
field.addEventListener("keypress", function(event){
	if(event.charCode == 81 || event.charCode == 88 || event.charCode == 87) event.preventDefault();
});
//След мыши=========================================
let rec = document.querySelector("#divMouseMove");
rec.addEventListener("mousemove", moveThings);
function moveThings(event){
	rec.style.top = event.clientY-15 + "px";
	rec.style.left = event.clientX-15 + "px";
}