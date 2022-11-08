import { redirectEvent } from "./redirect.js";
import {
  getUserProfile,
  getUserCoworkers,
  getUserDepartments,
  updateUserProfile,
} from "./requests.js";
import { createModalUpdateUserProfile } from "./modals.js";

redirectEvent();

// FUNCTION TO VERIFY PERMISSION IN THE PAGE
export function verifyTokenUser() {
  const userToken = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"));
  const isAdmin = JSON.parse(localStorage.getItem("@kenzieEmpresas:is_admin"));

  // console.log(userToken.token);
  // console.log(isAdmin.is_admin);

  if (userToken.token == "") {
    window.location.replace("../../index.html");
    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");
  } else if (isAdmin.is_admin == true) {
    window.location.replace("../../index.html");
    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");
  } else {
    getUserProfile(userToken.token);
    setTimeout(() => {
      let user = JSON.parse(
        localStorage.getItem("@kenzieEmpresas:user-profile")
      );
      // console.log(user);

      showDivUsername(user, userToken.token);

      if (user.department_uuid == null) {
        showBoxNotWorking();
      } else {
        showUserDepartment(user, userToken.token);
      }
    }, 50);
  }
}
verifyTokenUser();

function logoutButton() {
  const btnLogout = document.querySelector("#button-logout-userPage");

  btnLogout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");
  });
}
logoutButton();

// FUNCTION TO SHOW USER INFORMATION

function showDivUsername(user, token) {
  const container = document.querySelector("#main-container");

  container.insertAdjacentHTML(
    "beforeend",
    `<div class="div-username">
      <div class="div-username-info">
        <div class="div-username-email">
          <h2 class="font30-bold-inter">${user.username}</h2>
          <h5 class="font22-regular-inter">Email: ${user.email}</h5>
        </div>
        <h5 class="font22-regular-inter">${user.professional_level}</h5>
        <h5 class="font22-regular-inter">${user.kind_of_work}</h5>
      </div>
      <div class="div-update-profile">
        <img src="../assets/Vector_pencil.png" alt="Editar Perfil" />
      </div>
     </div>`
  );

  const divUpdateProfile = document.querySelector(".div-update-profile");

  divUpdateProfile.addEventListener("click", (e) => {
    e.preventDefault();

    createModalUpdateUserProfile(user, token);
  });
}

// FUNCTION TO SHOW NOT WORKING

function showBoxNotWorking() {
  const container = document.querySelector("#main-container");

  container.insertAdjacentHTML(
    "beforeend",
    `<div class="div-not-working hidden">
       <h2 class="font40-bold-inter">Você ainda não foi contratado</h2>
     </div>`
  );
}

// FUNCITON TO SHOW DEPARTMENT

async function showUserDepartment(user, token) {
  const container = document.querySelector("#main-container");

  // const userDepartments = getUserDepartments(token)
  // const userCoworkers = getUserCoworkers(token)

  await getUserCoworkers(token);
  await getUserDepartments(token);

  const userCoworkers = JSON.parse(
    localStorage.getItem("@kenzieEmpresas:user-coworkers")
  )[0];
  const userDepartments = JSON.parse(
    localStorage.getItem("@kenzieEmpresas:user-departments")
  );

  console.log(userCoworkers);
  console.log(userDepartments);

  container.insertAdjacentHTML(
    "beforeend",
    `<section class="section-company">
         <div class="div-company-header">
           <h2 class="font32-bold-inter text-white">
           ${userDepartments.name} - ${userCoworkers.name}
           </h2>
         </div>
         <div class="box-department">
           <div class="box-department-cards"></div>
         </div>
       </section>`
  );

  const boxDepartmentCards = document.querySelector(".box-department-cards");

  const coworkers = userCoworkers.users;

  // console.log(coworkers);

  for (let i = 0; i < coworkers.length; i++) {
    boxDepartmentCards.insertAdjacentHTML(
      "beforeend",
      `<div class="box-card-coworker">
          <h5 class="font15-bold-inter">${coworkers[i].username}</h5>
          <h6 class="font15-regular-inter">${coworkers[i].professional_level}</h6>
        </div>`
    );
  }
}
