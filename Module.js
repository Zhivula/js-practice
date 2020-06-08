let names = ["первый","второй","третий"];
function getNames(number) {
	return names[number];
}
console.log(getNames(2));
(function(){
	function square(x){ return x*x; }
	let num = 10;
	console.log(square(num));
})();
let weekDay = function(){
	return {
		name: function(num){ return names[num]; },
		number: function(name) { return names.indexOf(name);}
	};
}();
console.log(weekDay.name(weekDay.number("второй")));
let a = (function(exports){
	exports.name = function(num){
		return names[num];
	};
	exports.number = function(name){
		return names.indexOf(name);
	};
})(this.weekDay = {});
console.log(weekDay.name(weekDay.number("первый")));
//плохой вариант
function evalAndReturnX(code) {
  eval(code);
  return x;
}
console.log(evalAndReturnX("var x = 2"));
let plusOne = new Function("number", "return number+1;");
console.log(plusOne(7));
//Require=============================================
/*function require(name) {
  var code = new Function("exports", readFile(name));
  var exports = {};
  code(exports);
  return exports;
}

console.log(require("weekDay").name(2));

let week = require("weekDay");
let to = require("today");
define(["week", "today"], function(week, to){
	console.log(week.name(to.dayNumber()));
});

define([], function() {
  var names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
});*/