import { set } from "mongoose";

setInterval(() => {
  console.log("1");
}, 0);

new Promise((resolve, reject) => {
  console.log("2");
  resolve();
})
  .then(() => {
    console.log("3");
  })
  .finally(() => {
    console.log("4");
  })
  .then(() => {
    console.log("5");
  })
  .catch(() => {
    console.log("6");
  });

console.log("7");
