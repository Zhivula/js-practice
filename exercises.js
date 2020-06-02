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
//С заданный шагом (оаботает и для отрицательного шага)
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
//===============================================================
console.log(object.filter(function(person){
	return person.name == "Vladislav";
}));