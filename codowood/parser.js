/*
 expr = term {( '+' | '-' ) term}
 term = factor {( '*' | '/' ) factor}
 factor = '-' factor | '(' expr ')' | var | num
 var = 'w' | 'x' | 'y' | 'z'
*/

function parse_expr(expression) {
  var index = 0;
  var tokens = expression.split(" ").filter(str => str !== "");
  return expr(tokens);

  function expr(tokens) {
    var left = term(tokens);  //the left variable is the result of term.
    while (tokens[index] === "+" || tokens[index] === "-") {
      var operator = tokens[index];
      index++;
      var right = term(tokens);
      if (operator === "+") {
        left += right;
      } else {
        left -= right;
      }
    }
    return left;
  }

  function term(tokens) {
    var left = factor(tokens);  //the left variable is the result of factor.
    while (tokens[index] === "*" || tokens[index] === "/") {
      var operator = tokens[index];
      index++;
      var right = factor(tokens);
      if (operator === "*") {
        left *= right;
      } else {
        left /= right;
      }
    }
    return left;
  }

  function factor(tokens) {
    var token = tokens[index];  //take the first value of the factor.
    index++;
    if (token === "-") {
      return -factor(tokens);
    }
    if (token === "(") {        //if the first value is '(' then the restart with expr.
      var result = expr(tokens);
      index++;
      return result;
    } else {
      return parseFloat(token);
    }
  }
}

// tests
console.log(parse_expr("2 + 3 * 4")); // 14
console.log(parse_expr("(2 + 3) * 4")); // 20
console.log(parse_expr("10 / 2 - 3")); // 2
console.log(parse_expr("(10 - 4) / 2")); // 3

// console.log(parse('x+y+z'));