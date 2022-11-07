// READY!!!

import {
  listCompanies,
  listAllSectors,
  listCompaniesSector,
} from "./requests.js";

import { redirectEvent } from "./redirect.js";
redirectEvent();

function renderDepartments() {
  const selectDepartment = document.querySelector("#sector");

  listAllSectors();

  const allSectors = JSON.parse(
    localStorage.getItem("@kenzieEmpresas:sectors")
  );

  // console.log(allSectors);

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
      listCompaniesSector(sectorSelectedByUser);
      setTimeout(() => {
        let sectorArray = JSON.parse(
          localStorage.getItem("@kenzieEmpresas:sector-selected")
        );
        // console.log(sectorArray);

        renderCompanies(sectorArray);
      }, 50);
    }
  });
}
renderDepartments();

function getCompaniesToRender() {
  listCompanies();
  const allCompanies = JSON.parse(
    localStorage.getItem("@kenzieEmpresas:companies")
  );
  // console.log(allCompanies);

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
