//заполняет массив числами определенного диапазона
function range(first, last) {
	let f = Number(first);//начало диапазона
	let l = Number(last);//конец диапазона
	let array = [];
	while(f<=l){
		array.push(f);
		f++;
	}
	return array;
}
//Сумма элементов массива
function Sum(array) {
	let result = 0;
	for(let i = 0; i<array.length; i++){
		result+=array[i];
	}
	return result;
}
//С заданный шагом (работает и для отрицательного шага)
function rangeWithStep(first,last, moveStep) {
	let f = Number(first);//начало диапазона
	let l = Number(last);//конец диапазона
	if(typeof(moveStep) == null) moveStep = 1;
	let array = [];
	if(first<last){
		while(f<=l){
			array.push(f);
			f+=moveStep;
		}		
	}
	else{
		while(f>=l){
			array.push(f);
			f+=moveStep;
		}
	}
	return array;
}
console.log('Все хорошо.');
console.log(range(1,10));
console.log(Sum(range(1,10)));
console.log(rangeWithStep(10,1,-2));
//======================================================================
//Поменять порядок в массиве. ПРОЩЕ ИСПОЛЬЗВАТЬ СТАНДАРТНЫЙ reverse();
//======================================================================
function reverseArray(arr) {
	let array = [];
	for(let i = arr.length-1; i >= 0; i--) {
		array.push(arr[i]);
	}
	return array;
}
console.log(reverseArray([1,2,3,4,5]));
//=====================================================================
//херня
//=====================================================================
/*function deepEqual(value1, value2){
	let result = true;
	for(let event1 in value1){
		for(let event2 in value2){
			if(event1 == event2) return false;
		}
		}
		return result; 
	}

let obj = {here: {is:"an"}, object:2};
console.log(deepEqual(obj,obj));
console.log(deepEqual(obj,{here:1, object:2}));
console.log(deepEqual(obj,{here: {is:"an"}, object:2}));
*/
//=============================================================
//JSON
//=============================================================
let string = JSON.stringify({name:"Vladislav", born: 1999});
console.log(string);
console.log(JSON.parse(string).name);
console.log(string.length);
//==============================================================
//filter - своя реализация. ПРОЩЕ ИСПОЛЬЗОВАТЬ СТАНДАРТНЫЙ
//==============================================================
function filter(array, test){
	let passed = [];
	for(let i = 0; i < array.length; i++){
		if(test(array[i])) passed.push(array[i]);
	}
	return passed;
}
let object = [{name:"Vladislav", born: 1999},
{name:"Valer", born: 2001},
{name:"Dmitr", born: 1998},
{name:"Vadim", born: 1988}];
console.log(filter(object,function(person){
	return person.born > 1900 && person.born < 2000;
}));
//Более короткая версия==========================================
console.log(object.filter(function(person){
	return person.name == "Vladislav";
}));
//===============================================================
/*Метод map преобразовывает массив, применяя функцию ко всем его
 элементам и строя новый массив из возвращаемых значений.
 У нового массива будет та же длина, что у входного,
  но его содержимое будет преобразовано в новый формат.*/
function map(array, transform){
	let newArray = [];
	for(let i = 0; i<array.length;i++) newArray.push(transform(array[i]));
	return newArray;
}
let file = [{died:2115, born: 1999, name:"First", sex:"m"},
{died: 2019, born: 2001, name:"Second", sex:"f"},
{died: 2100, born: 1998, name:"Third", sex:"m"},
{died:2010, born: 1988, name:"Fourth", sex:"f"}];
let overNinety = file.filter(function(person){
	return person.died - person.born > 50 ;
});
console.log(map(overNinety,function(person){
	return person.name;
}));
//сумма элементов
function reduce(array, combine, start) {
	var current = start;
	for(let i = 0; i < array.length;i++) current = combine(current,array[i]);
	return current;
}
console.log(reduce([1,2,3,4], function (a,b) {
	return a+b;
}, 0));
//Можем найти человека с самым ранним годом рождения из списка
console.log(file.reduce(function (min,cur) {
	if(cur.born < min.born) return cur;
	else return min;
}));
//можно написать это и без функции высшего порядка
let min = file[0];
for(let i = 1; i < file.length; i++){
	let cur = file[i];
	if(cur.born < min.born) min = cur;
}
console.log(min);
//===============================================================
//Находим средний возраст мужчин и женщин 
//===============================================================
function average(array) {
	function plus(a,b) {return a+b;}
	return array.reduce(plus)/array.length;
}
function age(person){return person.died - person.born;}
function male(person){return person.sex=="m";}
function female(person){return person.sex=="f";}
console.log(average(file.filter(male).map(age)));
console.log(average(file.filter(female).map(age)));
//===============================================================
let theSet = ["First","Second","Third","Fourrrrth"];
function isInSet(set,person) {
	return set.indexOf(person.name) > -1;
}
console.log(file.filter(function(person){
	return isInSet(theSet,person);
}));
console.log(file.filter(isInSet.bind(null,theSet)));
//===============================================================
//Свертка
//===============================================================
let arrays = [[1,2,3], [4,5,6],[7,8,9]];
console.log("Длинна массива: ", array.length);
let concat = arrays.reduce(function(result,current){
	return result.concat(current);
},[]);
console.log(concat);
//===============================================================
//Методы every and some. ПРОЩЕ ИСОЛЬЗОВАТЬ СТАНДАРТНЫЕ
//===============================================================
let a = [4,4,4,4,4,4];
function every(array, value){
	for(let i = 0; i < array.length; i++){
		if(array[i] != value) return false;
	}
	return true;
}
console.log(every(a,4));
function some(array, value){
	for(let i = 0; i < array.length; i++){
		if(array[i] == value) return true;
	}
	return false;
}
console.log(some(a,4));
//================================================================
let money = {};
money.value = function(coin){
	console.log("Было получено " + coin + " монет.");
};
money.value(5);
function getCoin(value) {
	console.log("Было получено " + value + " монет в валюте " + this.type);
}
let bitcoin = {type: "bitcoin", getcoin: getCoin, name:"v"};
let dollar = {type:"dollar", getcoin: getCoin};
bitcoin.getcoin(54);
dollar.getcoin(35);
getCoin.call({type:"bitcoin"}, 89);
getCoin.apply(dollar,[10]);
//================================================================
//Прототипы
//================================================================
let protoMoney = {
	getmoney: function (arg) {
		console.log("Вы получили " + arg + " " + this.type);
	}
};
let bigMoney = Object.create(protoMoney);
bigMoney.type = "Bitcoin";
bigMoney.getmoney(10);
//================================================================
//Конструкторы
//================================================================
function Coin(type){
	this.type = type;
}
Coin.prototype.get = function (value) {
	console.log("Была получена сумма: " + value + " В валюте " + this.type);
};
let xLM = new Coin("cryptoMoney");
let dol = new Coin("money");
console.log(dol.type);
dol.get(10);
Coin.prototype.line = 50;
console.log(dol.line);
dol.line = 60;
console.log(dol.line);
console.log(xLM.line);
console.log(Coin.prototype.line);
console.log(Array.prototype.toString == Object.prototype.toString);
console.log([1,2,3,4,5].toString());
console.log(Object.prototype.toString.call([1,2,3]));
//====================================================================
//Нежелательное взаимодействие прототипов
//====================================================================
map = {};
function store(event, value) {
	map[event] = value;
}
store("Add",10);
store("Delete", 5);
Object.prototype.newValue = "hey, new value!";
for(let name in map) console.log(name);
console.log("newValue" in map);
console.log("toString" in map);
Object.defineProperty(Object.prototype, "hiddenNonsense",{
	enumerable:false,value:"ky"
});
for(let name in map) console.log(name);
console.log(map.hiddenNonsense);
console.log(map.hasOwnProperty("toString"));//Он говорит, является ли свойство свойством объекта, без обглядки на прототипы. 
console.log("Можно использовать это: ")
for(let i in map){
	if(map.hasOwnProperty(i)){
		console.log(i);
	}
}
map = Object.create(null);//Теперь не нужна приблуда "hasOwnProperty"
map["onion"] = 10;
console.log("toString" in map);
console.log("onion" in map);