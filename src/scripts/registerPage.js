import { createUser } from "./requests.js";
import { redirectEvent } from "./redirect.js";

redirectEvent();

function redirectHomePage() {
  const buttonHomePage = document.querySelector("#button-return-registerPage");

  buttonHomePage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("../../index.html");
  });
}
redirectHomePage();

function eventRegister() {
  const inputs = document.querySelectorAll(".inputs-update-user-profile");
  const selectLevel = document.querySelector("select");
  const btnRegister = document.querySelector(".button-submit-register-user");
  let data = {};

  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    inputs.forEach((element) => {
      data[element.name] = element.value;
    });

    data[selectLevel.name] = selectLevel.value;

    console.log(data);
    createUser(data);
  });
}
eventRegister();
