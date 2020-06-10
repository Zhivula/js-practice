function talksAbout(node, string) {
	if(node.nodeType == document.ELEMENT_NODE){
		for (let i = 0; i < node.childNodes.length; i++) {
			if(talksAbout(node.childNodes[i], string)) return true;
		}
		return false;
	} else if(node.nodeType == document.TEXT_NODE){
		return node.nodeValue.indexOf(string) > -1;
	}
}
console.log(talksAbout(document.body, "Текст"));

let link = document.getElementById("Ptext");
console.log(link);

let ps = document.body.getElementsByTagName("p");
document.body.insertBefore(ps[3], ps[0]);

function replaceH1(){
	let h1s = document.body.getElementsByTagName("h1");
	for (let i = h1s.length-1; i >= 0; i--) {
		let h1 = h1s[i];
		if(h1){
			let text = document.createTextNode(h1);
			h1.parentNode.replaceChild(text, h1);
		}
	}
}

function rep(type){
	let node = document.createElement(type);
	for (let i = 1; i < arguments.length; i++) {
		let child = arguments[i];
		if(typeof child == "string") child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}
document.getElementById("quote").appendChild(
	    rep("footer", "—",
        rep("strong", "Карл Поппер"), ", предисловие ко второму изданию ",
        rep("em", "Открытое общество и его враги "), ", 1950")
);
 let para = document.body.getElementsByTagName("p")[0];
  console.log("clientHeight:", para.clientHeight);
  console.log("offsetHeight:", para.offsetHeight);
//Animation===========================================
  var cat1 = document.querySelector("#cat1");
  var cat2 = document.querySelector("#cat2");
  cat1.height = 50;
  cat2.height = 50;
  var angle = 0, lastTime = null;
  function animate(time) {
    if (lastTime != null)
      angle += (time - lastTime) * 0.005;
    lastTime = time;
    cat1.style.top = (Math.sin(angle) * 10) + "px";
    cat1.style.left = (Math.cos(angle) * 50) + "px";
    cat2.style.top = (Math.sin(angle) * 10) + "px";
    cat2.style.left = (-Math.cos(angle) * 50) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);