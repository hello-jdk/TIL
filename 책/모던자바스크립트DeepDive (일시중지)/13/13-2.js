var x = "global x";
var y = "global y";

function outer() {
  var z = "outer's local z";

  console.log(x); //1
  console.log(y); //2
  console.log(z); //3

  function inner() {
    var x = "inner's local x";

    console.log(x); //4
    console.log(y); //5
    console.log(z); //6
  }

  inner();
}

outer();

console.log(x); //7
console.log(z); //8
