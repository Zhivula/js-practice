function parseExpression(prog) {
	prog = skipSpace(prog);
	let match, expr;
	if(match = /^"([^"]*)"/.exec(prog)) expr = {type:"value", value: match[1]};
	else if (match = /^\d+\b/.exec(prog)) expr = {type:"value", value: Number(match[0])};
	else if(match = /^[^\s(),"]+/.exec(prog)) expr = {type: "word", name: match[0]};
	else throw new SyntaxError("Неправильный синтаксис, херню написал " + prog);
	return parseApply(expr, prog.slice(match[0].length));
}
function skipSpace(str){
	let first = str.search(/\S/);
	//let reg = //;
	//let index = reg.exec(str);
	//if(index.index > 0) str = str.slice(0,index.index+1);
	if(first == -1) return "";
	return str.slice(first);
}
function parseApply(expr, prog){
	prog = skipSpace(prog);
	if(prog[0] != "(") return {expr: expr, rest: prog};
	prog = skipSpace(prog.slice(1));
	expr = {type:"apply", operator: expr, args: []};
	while(prog[0] != ")"){
		let arg = parseExpression(prog);
		expr.args.push(arg.expr);
		prog = skipSpace(arg.rest);
		if(prog[0] == ",") prog = skipSpace(prog.slice(1));
		else if(prog[0] != ")") throw new SyntaxError("Жду от тебя ',' или ')'");
	}
	return parseApply(expr, prog.slice(1));
}
function parse(prog) {
  var result = parseExpression(prog);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Неожиданный текст после программы");
  return result.expr;
}
console.log(parse("+(f,15)"));

function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;

    case "word":
      if (expr.name in env) return env[expr.name];
      else throw new ReferenceError("Неопределённая переменная: " + expr.name);
    case "apply":
      if (expr.operator.type == "word" && expr.operator.name in specialForms)
        return specialForms[expr.operator.name](expr.args, env);
      let op = evaluate(expr.operator, env);
      if (typeof op != "function") throw new TypeError("Приложение не является функцией.");
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

let specialForms = Object.create(null);

specialForms["if"] = function(args, env){
	if(args.length != 3) throw new SyntaxError("Неправильное количество аргументов для if");
	if(evaluate(args[0], env) !== false) return evaluate(args[1], env);
	else return evaluate(args[2], env);
};
specialForms["while"] = function(args, env) {
  if (args.length != 2)
    throw new SyntaxError("Неправильное количество аргументов для while");

  while (evaluate(args[0], env) !== false)
    evaluate(args[1], env);

  // Поскольку undefined не задано в Egg,
  // за отсутствием осмысленного результата возвращаем false
  return false;
};
specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};
specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of define");
  let value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
};
let topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;
let prog = parse("if(true, false, true)"); 
console.log(evaluate(prog, topEnv));
topEnv["print"] = function(value) {
  console.log(value);
  return value;
};
["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});
function run() {
  let env = Object.create(topEnv);
  let program = Array.prototype.slice.call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}
specialForms["fun"] = function(args, env) {
  if (!args.length)
    throw new SyntaxError("Функции нужно тело");
  function name(expr) {
    if (expr.type != "word")
      throw new SyntaxError("Имена аргументов должны быть типа word");
    return expr.name;
  }
  let argNames = args.slice(0, args.length - 1).map(name);
  let body = args[args.length - 1];

  return function() {
    if (arguments.length != argNames.length)
      throw new TypeError("Неверное количество аргументов");
    let localEnv = Object.create(env);
    for (let i = 0; i < arguments.length; i++)
      localEnv[argNames[i]] = arguments[i];
    return evaluate(body, localEnv);
  };
};
run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");
topEnv["array"] = function(args){
	return args;
}
topEnv["length"] = function(array){
	return array.length;
}
topEnv["element"] = function(array, element){
	return array[element];
};
run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
run("print(1000)");