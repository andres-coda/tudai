var varX = 10;
var varY = 20;

var s = document.getElementById("programa").value;
console.log(s);

var result = esprima.parse(s, {tokens: true});
console.log(result);
