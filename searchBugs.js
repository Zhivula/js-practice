function  useStrict() {
	"use strict";
	for (let i = 0; i < 5; i++) console.log("всё работает");
}
/*useStrict();
function Person(name){this.name = name;}
let ferdinand = Person("Коля");
console.log(name);
*/
/*"use strict";
function Person(name){this.name = name;}
let fer = Person("Corddddadf");
console.log(name);*/
"use strict";
function Person(name) { this.name = name; }
let ferdinand = new Person("Евлампий");
function pr(number){;
	 return number;
}
console.log(pr(10));
//Обработка исключений
function prDirection(value){
	let result = prompt(value, "");
	if(result.toLowerCase() == "left") return "L";
	if(result.toLowerCase() == "right") return "R";
	throw new Error("Недопустимое направление: " + result);
}
function look(){
	if(prDirection("Куда?") == "L") return "house";
	else return "town";
}
try{
	console.log("Вы видите", look()); 
}catch(error){
	console.log("Что-то не так: " + error);
}
let context = null;
function withContext(newContext, body){
	let oldContext = context;
	context = newContext;
	try{
		return body();
	}finally{
		context = oldContext;
	}
}
withContext(10,function(){console.log("Все хорошо!");});
console.log(context);
try{
	withContext(5,function(){
		if(context<10) throw new Error("Этот контекст слишком мал!");

	});
} catch(e){
	console.log("ignore: " + e);
}
console.log(context);
for(;;){
	try{
		let dir = prDirection("Куда?");//опечатка
		console.log("Ваш выбор", dir);
		break;
	} catch (e){
		console.log("Недопустимое направление. Попробуйте еще раз.");
	}
}
function InputError(message){
	this.message = message;
	this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";
function pDirection(value){
	let result = prompt(value, "");
	if(result.toLowerCase() == "left") return "L";
	if(result.toLowerCase() == "right") return "R";
	throw new InputError("Недопустимое направление: " + result);
}
for(;;){
	try{
		let dir = prDirection("Куда?");
		console.log("Ваш выбор", dir);
		break
	} catch(e){
		if(e instanceof InputError) console.log("Недопустимо!");
		else throw e;
	}
}
//Assertions
function AssertionFailed(message){
	this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message){
	if(!test) throw new AssertionFailed(message);
}

function lastElement(array){
	assert(array.length > 0, "Пустой массив в lastElement");
	return array[array.length - 1];
}
//lastElement([]);
//=========================================================
//Exercises
//=========================================================
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) return a * b;
  else throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  for(;;){
  	try{
  		let result = primitiveMultiply(a,b);
  		return result;
  		break;
  	}catch(e){

  	}
  }
}
console.log(reliableMultiply(8, 8));
//Second===================================================
var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Заперто!");
    return this._content;
  }
};
function withBoxUnlocked(body) {
  try{
	box.unlock();
	body();
  }
  catch(e){
  	console.log("Сбой: " + e);
  }
  finally{	
  		box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("золотишко");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Пираты на горизонте! Отмена!");
  });
} catch (e) {
  console.log("Произошла ошибка:", e);
}
console.log(box.locked);// true