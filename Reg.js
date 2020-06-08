let regFirst = new RegExp("abc");
let regSecond = /abc/;
let eighteenPlus = /eighteen\+/;
console.log(regSecond.test("abccaddkk"));
console.log(regSecond.test("adccaddkk"));
console.log(/[0-9]/.test("this d"));
let regD = /\w\w\w\s\w\w/;
console.log(regD.test("fff dd asdf  asdfdsdssda d"));
let notBinary = /[^45]/;
console.log("есть ли кроме 45 что-нибудь: ", notBinary.test("454545454444555"));
console.log(/'\d+'/.test("'31654'"));
console.log(/'\d+'/.test("''"));
console.log(/'\d*'/.test("'31654'"));
console.log(/'\d*'/.test("''"));
let vl = /vlad?islav/;
console.log("vladislav test ",vl.test("vladislav"));
console.log(vl.test("vlaislav"));
let dateTime = /\d{1,4}-\w{1}-\d{1,4}/;
console.log(dateTime.test("4-d-1"));
//Совпадения и группы=============================
let match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);
console.log("one two 100".match(/\d+/));
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("shk alddklj 'asdf'"));
console.log(/vkk(d)?/.exec("vkkd"));
console.log(/(\d)+/.exec("123"));
//тип даты=======================================
console.log(new Date());
console.log(new Date(2020,6,7));//Месяцы начинаются с нуля, а дни с единицы 
console.log(new Date(2020,10,5,12,5,30,999));
let dt = new Date(2020,1,1);
let dgetTime = dt.getTime();
console.log(new Date(2020,1,1).getTime());
console.log(new Date(dgetTime));
console.log(Date.now());
function findDate(arg) {
	let dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
	let match = dateTime.exec(arg);
	return new Date(Number(match[3]), Number(match[2])-1, Number(match[1]));
}
console.log(findDate("225502-07-20204546"));
//Границы слова и строки===========================
console.log(/vla/.test("vladimiddle"));
console.log(/vla\b/.test("clovvladim vli vl"));
//Шаблоны с выбором================================
let animal = /\d+ (pig|cow|cat)s?\b/;
console.log(animal.test("20 cats"));
console.log(animal.test("20cats"));
//Метод replace====================================
console.log("this".replace(/thi/, "it'"));
console.log("thishereherehere".replace(/here/g, "$"));
console.log("adsf, dd\nggg, ghhh\nssss, fgg".replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));
var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
  return str.toUpperCase();
}));
var stock = "1 lemon, 2 things, and 3 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) // остался только один, удаляем 's' в конце
    unit = unit.slice(0, unit.length - 1);
  else if (amount == 0)
    amount = "no";
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
let name = "koly+hl[]rd";
let text = "big koly+hl[]rd was there!";
let nameFilter = name.replace(/[^\w\s]/g, "\\$&");
let reg = new RegExp("\\b("+ nameFilter +")\\b", "gi");
console.log(text.replace(reg, "***$1***"));
console.log("   this".search(/\S/));
console.log("c   ".search(/\S/));
var pattern = /y/g;
pattern.lastIndex = 4;
var ma = pattern.exec("xyzzy");
console.log(ma.index);
console.log(pattern.lastIndex);
var input = "Строчка с 3 числами в ней... 42 и 88.";
var number = /\b(\d+)\b/g;
var mat;
while (mat = number.exec(input))
  console.log("Нашёл ", mat[1], " на ", mat.index);
//Exercises============================================
verify(/cat|car/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pop|prop/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferret|ferry|ferrari/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/(\s\W)$/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\w\w\w\w\w\w\w+/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/\b[^e]\b/gi,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

function verify(regexp, yes, no) {
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Не нашлось '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Неожиданное вхождение '" + s + "'");
  });
}
text = "this is a 'very interesting' book. They aren't boring.";
console.log(text.replace(/\s'|'\s/g," \" "));