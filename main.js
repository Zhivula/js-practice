/*let vasyaDebt = 140, vityaDebt = 100;
vasyaDebt -= 30;
console.log(vasyaDebt);
console.log(vityaDebt);
console.log('успешно выполнено!');
let numb = Number(prompt('Please, input your number',''));
console.log('type of numb object: ' + typeof(numb));
if(!isNaN(numb)) console.log('корень твоего выражения: ' + numb*numb);
else console.log('Exception!')
let n = 0, s=1;
while(n<=10){
	console.log(s);
	s*=2;
	n++;
}
let my=10;
do{
my++;
console.log(my);
}while(my!=12)
my--;
console.log(my);
console.log(my);

switch(prompt('как погодка?')){
	case 'снег': console.log('Мы в Беларуси живем!');break;
	case 'дождь': console.log('Зонт возьми');break;
	case 'солнце': console.log('не забудь солнечные очки!');break;
}

let st = '';
while(st.length<=7){
	st+='#';
	console.log(st);
}
*/
/*
for(let i = 1; i <= 100; i++){
	if(i%5==0 && i%3==0) console.log('FizzBuzz');
	else if(i%3==0)console.log('Fizz');
	else if(i%5==0 && i%3!=0) console.log('Buzz');
	else console.log(i);
}
*/
//=======================================================
/*let st='';
const n = 8;
for(let i=1; i<=n; i++) {
	if(i%2==0)st+='#';
	else st+=' ';
}
for(let i=0; i<n; i++) {
	if(i%2==0) console.log(st.split("").reverse().join(""));
	else console.log(st);
}
console.log('пихаю', 54, 'всё, что хочу', false);
*/
//========================================================
/*function min(f, s) {
	let first = Number(f);
	let second = Number(s);
	if(first>second)return second;
	else return first;
}
console.log(min(10,-10));
let result = false;
function rek(num) {
	let n = Number(num);
	if(n>0){
		if(n!=2) rek(n-2);
		else return result = true;
	}
	return result;
}
console.log(rek(110));
*/
//=========================================================
/*let number = 0;
function CountBs(argument) {
	let st = String(argument);
	for(let i=0; i< st.length; i++){
		if(st.charAt(i)=="B") number++;
	}
	return number;
}
let numberFull = 0;
function CountFull(argument, symbol) {
	let st = String(argument);
	let sym = String(symbol);
	for(let i=0; i< st.length; i++){
		if(st.charAt(i)==sym) numberFull++;
	}
	return numberFull;
}
console.log(CountBs('BobaBadkerlserB'));
console.log(CountFull('BobaBadkeeeeerlsrB','e'));
*/
//=========================================================
let array = [
	{radius:5, length: 10},
	{radius:6, length: 9},
	{radius:7, length: 8}
];
console.log(array[0].length);

//высчитывает  корреляцию
function fi(table) {
	return (table[0]*table[3]-table[1]*table[2])/
	 Math.sqrt((table[2]+table[3]) * (table[1]+table[0])*(table[1]+table[3])*(table[2]+table[0]));
}
console.log(fi([76,9,4,1]));