let my_start = Date.now();
let my_duration = 3000 // in ms
console.log('While loop start from test.js.');
while(Date.now() - my_start < my_duration) {}
console.log('While loop end from test.js.');