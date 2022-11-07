import { login } from "./requests.js"
import { redirectEvent } from "./redirect.js";

redirectEvent();

function redirectRegisterPage() {
  const buttonRegisterPage = document.querySelector(
    "#button-register-form-loginPage"
  );

  buttonRegisterPage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("./registerPage.html");
  });
}
redirectRegisterPage();

function eventLogin() {
  const inputs = document.querySelectorAll(".inputs-login");
  const btnLogin = document.querySelector(".button-submit-login");

  let data = {}

  btnLogin.addEventListener('click', (e) => {
   e.preventDefault()

   inputs.forEach((element) => {
    data[element.name] =element.value
   })

   console.log(data)
   login(data)
  })
}
eventLogin()
