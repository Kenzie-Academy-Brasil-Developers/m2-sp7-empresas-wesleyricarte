import {
  createModalCreateDepartment,
  createModalUpdateUserInfo,
  createModalViewDepartment,
  createModalUpdateDepartment,
  createModalDeleteDepartment,
} from "./modals.js";
import { redirectEvent } from "./redirect.js";
import {
  listCompanies,
  listAllDepartments,
  listAllDepartmentsCompany,
  listAllUsers,
} from "./requests.js";

verifyTokenAdmin();
redirectEvent();

export async function verifyTokenAdmin() {
  const body = document.querySelector("body");

  const userToken = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"));
  const isAdmin = JSON.parse(localStorage.getItem("@kenzieEmpresas:is_admin"));

  console.log(userToken);
  console.log(isAdmin);

  if (userToken.token == "") {
    console.log('token não encontrado, replace')
    
    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");

    body.insertAdjacentHTML("beforeend", "");
    window.location.replace("../../index.html");
  } else if (isAdmin.is_admin != true) {
    console.log('is_admin=false, replace')
    
    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");

    body.insertAdjacentHTML("beforeend", "");
    window.location.replace("../../index.html");
  } else if (isAdmin.is_admin){
    // CARREGAR PÁGINA
    console.log('is_admin=true, loading page')

    listCompanies();
    const allDep = await listAllDepartments(userToken.token);
    console.log(allDep);

    showCompaniesOptions(userToken.token, allDep);
    await showAllUsers(userToken.token, allDep);
  }
}

function logoutButton() {
  const btnLogout = document.querySelector("#button-logout-adminPage");

  btnLogout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("@kenzieEmpresas:token");
    localStorage.removeItem("@kenzieEmpresas:is_admin");
  });
}
logoutButton();

function showCompaniesOptions(token, allDep) {
  const select = document.querySelector("select");
  const box = document.querySelector(".box-departments-admin-body");

  const companies = JSON.parse(
    localStorage.getItem("@kenzieEmpresas:companies")
  );
  console.log(companies);

  companies.forEach((element) => {
    const option = document.createElement("option");

    // console.log(element)
    // option.id = element.uuid
    option.value = element.uuid;
    option.innerText = element.name;
    option.classList.add("text20-regular-inter");

    // console.log(option)
    select.append(option);
  });
  select.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(select.value);

    showDepartments(token, select.value, allDep);
  });
  const btnCreateDepartment = document.querySelector(
    ".div-button-create-department"
  );
  btnCreateDepartment.addEventListener("click", (e) => {
    e.preventDefault();
    createModalCreateDepartment(token, companies);
  });
}

async function showDepartments(token, companyId, allDep) {
  const arrayDepartments = await listAllDepartmentsCompany(token, companyId);

  const box = document.querySelector(".box-departments-admin-body");
  box.innerHTML = "";

  arrayDepartments.forEach((element) => {
    console.log(element);
    box.insertAdjacentHTML(
      "beforeend",
      `<article class="box-cards-departments">
        <div class="div-department-info">
          <h4 class="font20-bold-inter">${element.name}</h4>
          <h4 class="font18-regular-inter">${element.description}</h4>
          <h4 class="font18-regular-inter">${element.companies.name}</h4>
        </div>
        <div class="div-department-options">
          <div id="${element.uuid}" class="div-view-department">
            <img
              src="../assets/Vector_eye.png"
              alt="Visualizar departamento"
            />
          </div>
          <div id="${element.uuid}" class="div-update-department">
            <img
              src="../assets/Vector_pencil_black.png"
              alt="Editar departamento"
            />
          </div>
          <div id="${element.uuid}" class="div-delete-department">
            <img
              src="../assets/Vector_trash.png"
              alt="Deletar departamento"
            />
          </div>
        </div>
      </article>`
    );
  });
  const btnsView = document.querySelectorAll(".div-view-department");
  const btnsUpdate = document.querySelectorAll(".div-update-department");
  const btnsDelete = document.querySelectorAll(".div-delete-department");

  btnsView.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click no botão view com id= " + element.id);

      createModalViewDepartment(token, element.id, allDep);
    });
  });

  btnsUpdate.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click no botão update com id= " + element.id);

      createModalUpdateDepartment(token, element.id, allDep);
    });
  });

  btnsDelete.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click no botão delete com id= " + element.id);

      createModalDeleteDepartment(token, element.id, allDep);
    });
  });
}

async function showAllUsers(token, allDep) {
  const boxUsers = document.querySelector(".box-users-admin-body");
  const allUsers = await listAllUsers(token);

  // console.log(allUsers)

  allUsers.forEach((element) => {
    // console.log(element)

    const userDep = allDep.find((ele) => ele.uuid == element.department_uuid);
    // console.log(userDep);

    let departmentShow = "-";
    if (userDep) {
      departmentShow = userDep.name;
    }

    boxUsers.insertAdjacentHTML(
      "beforeend",
      `<article class="box-cards-users">
      <div class="div-users-info">
        <h4 class="font20-bold-inter">${element.username}</h4>
        <h4 class="font18-regular-inter">${element.professional_level}</h4>
        <h4 class="font18-regular-inter">${departmentShow}</h4>
      </div>
      <div  class="div-users-options">
        <div id="${element.uuid}" class="div-update-users-admin">
          <img
            src="../assets/Vector_pencil.png"
            alt="Editar departamento"
          />
        </div>
        <div id="${element.uuid}" class="div-delete-users-admin">
          <img
            src="../assets/Vector_trash.png"
            alt="Deletar departamento"
          />
        </div>
      </div>
    </article>`
    );
  });
  const divUpdateUserInfo = document.querySelectorAll(
    ".div-update-users-admin"
  );
  const divDeleteUser = document.querySelectorAll(".div-delete-users-admin");

  divUpdateUserInfo.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      createModalUpdateUserInfo(token, element.id);
    });
  });
}
