import { message } from "./main-browser.js";
export let count = 5;
// Cannot access 'message' before initialization
// console.log('first time:', message);
setTimeout(() => console.log('second time:', message), 0);