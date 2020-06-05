//Геттеры и сеттеры
let money = {
	coin: ["bitcoin","litecoin","BCH"],
	get AllCoins(){
		return this.coin.length;
	},
	set AllCoins(value){
		console.log("Нельзя установить такое значение: ", value);
	}
};
console.log(money.AllCoins);
money.AllCoins = 100;
function TextCell(type){
	this.type = type;
}
function RTextCell(v){
	TextCell.call(this,v);
}
/*Object.defineProperty(TextCell.prototype, "hProp",{
	get: function () { return this.text.length; }
});
let cell = new TextCell("this\nis");
console.log(cell.hProp);
cell.hProp = 256;
console.log(cell.hProp);*/
//Оператор instanceof
console.log(new RTextCell("A") instanceof RTextCell);
console.log(new RTextCell("A") instanceof TextCell);
console.log(new TextCell("A") instanceof RTextCell);
console.log([1] instanceof Array);
//=========================================================
//Exercises
//=========================================================
function Vector(x,y){
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function (anotherVector){
	return new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
};
Vector.prototype.minus = function (anotherVector){
	return new Vector(this.x - anotherVector.x, this.y - anotherVector.y);
};
console.log(new Vector(1,2).plus(new Vector(2,3)));
console.log(new Vector(1,2).minus(new Vector(2,3)));
let newVector = new Vector(3,4);
Object.defineProperty(newVector, "length", {
	get: function(){
		return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
	}
});
console.log(newVector.length);
//последовательности
function logFive(array){
	console.log('====================')
	let arr = array.array;
	if(arr.length>5) {
		for(let i = 0; i < 5; i++) console.log(arr[i]);
	}
	else for(let i = 0; i < arr.length; i++) console.log(arr[i]);
}
let ar = [1,2,3,4,5,6,7,8,9];
function ArraySeq(array){
	this.array = array;
}
function RangeSeq(from, to){
	this.array = [];
	for (var i = from; i < to; i++) {
		this.array.push(i);
	}
}
logFive(new ArraySeq(ar));
logFive(new RangeSeq(100,1000));