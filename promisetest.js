function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

var a = new AsyncFunction('a', 
                          'b', 
                          'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);');

a(10, 20).then(v => {
  console.log(v); // prints 30 after 4 seconds
});