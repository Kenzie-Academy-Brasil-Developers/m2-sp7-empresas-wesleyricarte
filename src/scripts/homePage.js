// READY!!!

import {
  listCompanies,
  listAllSectors,
  listCompaniesSector,
} from "./requests.js";

import { redirectEvent } from "./redirect.js";
redirectEvent();

async function renderDepartments() {
  const selectDepartment = document.querySelector("#sector");

  const allSectors = await listAllSectors();

  console.log(allSectors);

  allSectors.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.description;
    option.innerText = element.description;
    option.id = element.uuid;
    option.classList.add("font20-regular-poppins");

    selectDepartment.append(option);
  });

  selectDepartment.addEventListener("change", (e) => {
    let sectorSelectedByUser = selectDepartment.value;
    // console.log(sectorSelectedByUser);
    // console.log("select changed");

    if (sectorSelectedByUser === "selecionar setor") {
      getCompaniesToRender();
    } else {
      // console.log(sectorArray);
      callRequestArray(sectorSelectedByUser);
    }
  });
}
renderDepartments();

async function callRequestArray(sectorSelectedByUser) {
  const sectorArray = await listCompaniesSector(sectorSelectedByUser);

  renderCompanies(sectorArray);
}

async function getCompaniesToRender() {
  const allCompanies = await listCompanies();
  console.log(allCompanies);

  renderCompanies(allCompanies);
}
getCompaniesToRender();

function renderCompanies(array) {
  const ulCompanies = document.querySelector(".ul-companies");

  ulCompanies.innerText = "";

  array.forEach((element) => {
    let hours = element.opening_hours.slice(0, 2) + " horas";
    // console.log(hours)

    ulCompanies.insertAdjacentHTML(
      `beforeend`,
      `<li class="card-company">
         <h4 class="font20-bold-inter">${element.name}</h4>
         <h6 class="font16-regular-inter">${hours}</h6>
         <div id="${element.uuid}-div" class="div-company-sectors">
          <button class="font16-regular-inter buttons-sectors">${element.sectors.description}</button>
         </div>
       </li>`
    );
  });
}
