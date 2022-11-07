import {
  updateUserProfile,
  updateUserInfo,
  deleteUser,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  listUsersOutOfWork,
} from "./requests.js";

// CREATING MODALS USER

export function createModalUpdateUserProfile(user) {
  const body = document.querySelector("body");

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
      <main id="modal-update-user-profile">
        <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
        <div class="div-modal-update-user-profile-header">
          <h1 class="font40-bold-poppins">Editar Perfil</h1>
        </div>
        <form class="form-update-user-profile">
          <div class="div-modal-form-inputs">
            <input value="${user.username}" name="username" class="inputs-update-user-profile inputs-default font18-regular-inter" type="text" placeholder="Seu nome"/>
            <input value="${user.email}" name="email" class="inputs-update-user-profile inputs-default font18-regular-inter" type="email" placeholder="Seu e-mail"/>
            <input name="password" class="inputs-update-user-profile inputs-default font18-regular-inter" type="password" placeholder="Sua senha"/>
          </div>
          <button class="button-submit-update-user-profile buttons-default buttons-blue font18-bold-inter" type="submit">Editar perfil</button>
        </form>
      </main>
     </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  console.log(modalWrapper);
  const btnClose = document.querySelector(".modal-close");
  const inputs = document.querySelectorAll(".inputs-update-user-profile");
  const btnSub = document.querySelector(".button-submit-update-user-profile");
  let data = {};

  inputs.forEach((element) => {
    data[element.name] = element.value;
  });
  console.log(data);

  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click on btnSub update-user-profile");
    updateUserProfile(data);
    console.log(data);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

// CREATING MODALS UPDATE USERS FROM ADMIN

export function createModalUpdateUserInfo(token, userId) {
  const body = document.querySelector("body");

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
       <main id="modal-update-user-info">
         <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
         <div class="div-modal-update-user-info-header">
           <h1 class="font40-bold-poppins">Editar Usuário</h1>
         </div>
         <form class="form-update-user-info">
           <div class="div-modal-form-selects">
             <select class="select-update-user-info font17-regular-inter text-black-50" name="kind_of_work" id="kind_of_work">
              <option class="font17-regular-inter text-black-50" value="presencial" disabled selected>Selecionar modalidade de trabalho</option>
               <option class="font17-regular-inter text-black-50" value="presencial">Presencial</option>
               <option class="font17-regular-inter text-black-50" value="home office">Home Office</option>
               <option class="font17-regular-inter text-black-50" value="hibrido">Híbrido</option>
             </select>
             <select class="select-update-user-info font17-regular-inter text-black-50" name="professional_level" id="professional_level">
               <option class="font17-regular-inter text-black-50" value="estágio" disabled selected>Selecionar nível profissional</option>
               <option class="font17-regular-inter text-black-50" value="estágio">Estágio</option>
               <option class="font17-regular-inter text-black-50" value="júnior">Júnior</option>
               <option class="font17-regular-inter text-black-50" value="pleno">Pleno</option>
               <option class="font17-regular-inter text-black-50" value="sênior">Sênior</option>
             </select>
           </div>
           <button class="button-submit-update-user-info buttons-default buttons-blue font18-bold-inter" type="submit">Editar</button>
         </form>
       </main>
     </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  const btnClose = document.querySelector(".modal-close");
  const kindOfWork = document.querySelector("#kind_of_work");
  const professionalLevel = document.querySelector("#professional_level");
  const btnSub = document.querySelector(".button-submit-update-user-info");

  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    let data = {
      kind_of_work: `${kindOfWork.value}`,
      professional_level: `${professionalLevel.value}`,
    };
    console.log(data);
    console.log("click on btnSub update-user-info (admin)");
    updateUserInfo(token, userId, data);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

export function createModalDeleteUser(userId) {
  const body = document.querySelector("body");

  // const username = //armazenar nome do usuário de alguma maneira

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
       <main id="modal-delete-user">
         <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
         <div class="div-modal-delete-user-header">
           <h1 class="font28-bold-poppins">Realmente deseja remover o usuário ?</h1>
         </div>
         <button class="button-submit-delete-user buttons-default buttons-green font18-bold-inter" type="submit">Deletar</button>
       </main>
     </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  const btnClose = document.querySelector(".modal-close");
  const btnSub = document.querySelector(".button-submit-delete-user");

  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click on btnSub update-user-profile");
    deleteUser(userId);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

// CREATING MODALS DEPARTMENT

export function createModalCreateDepartment(token, companies) {
  const body = document.querySelector("body");

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
      <main id="modal-create-department">
        <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
        <div class="div-modal-create-department-header">
          <h1 class="font40-bold-poppins">Criar Departamento</h1>
        </div>
        <form class="form-create-department">
          <div class="div-modal-form-inputs">
            <input id="create-department" name="name" class="create-department inputs-create-department inputs-default font18-regular-inter" type="text" placeholder="Nome do departamento"/>
            <input id="create-department-description" name="description" class="inputs-create-department inputs-default font18-regular-inter" type="text" placeholder="Descrição"/>
            <select class="select-tag font17-regular-inter text-black-50" name="company_uuid" id="company_uuid"><option value="company id aqui" disabled selected>Selecionar empresa</option></select>
          </div>
          <button class="button-submit-create-department buttons-default buttons-blue font18-bold-inter" type="submit">Criar o departamento</button>
        </form>
      </main>
     </div>`
  );

  const selectTag = document.querySelector(".select-tag");

  companies.forEach((element) => {
    const option = document.createElement("option");

    // console.log(element)
    // option.id = element.uuid
    option.value = element.uuid;
    option.innerText = element.name;
    option.classList.add("text20-regular-inter");

    // console.log(option)
    selectTag.append(option);
  });

  const modalWrapper = document.querySelector(".modal-wrapper");
  const btnClose = document.querySelector(".modal-close");
  const inputDepartment = document.querySelector(".create-department");
  const inputDescrip = document.querySelector("#create-department-description");
  const btnSub = document.querySelector(".button-submit-create-department");

  
  const dataNewDep = {
    name: inputDepartment.value,
    description: inputDescrip.value,
    company_uuid: selectTag.value,
  };
  console.log(dataNewDep);
  
  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click on btnSub update-user-profile");
    console.log(inputDepartment)
    console.log(inputDescrip)
    createDepartment(token, dataNewDep);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

export function createModalUpdateDepartment(token, departmentId, allDep) {
  const body = document.querySelector("body");

  const depSelected = allDep.find((ele) => ele.uuid == departmentId);
  console.log(depSelected);

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
      <main id="modal-update-department">
        <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
        <div class="div-modal-update-department-header">
          <h1 class="font40-bold-poppins">Editar Departamento</h1>
        </div>
        <form class="form-update-department">
          <div class="div-modal-form-inputs">
            <input value="${depSelected.description}" id="description" name="description" class="input-update-department font18-regular-inter" type="text" placeholder="Descrição do departamento"/>
          </div>
          <button class="button-submit-update-department buttons-default buttons-blue font18-bold-inter" type="submit">Salvar alterações</button>
        </form>
      </main>
     </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  const btnClose = document.querySelector(".modal-close");
  const descrip = document.querySelector("#description");
  const btnSub = document.querySelector(".button-submit-update-department");

  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click on btnSub update-department");
    const data = { description: descrip.value };
    console.log(data);
    updateDepartment(token, depSelected.uuid, data);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

export async function createModalViewDepartment(token, departmentId, allDep) {
  const body = document.querySelector("body");

  const usersFree = await listUsersOutOfWork(token);
  console.log(usersFree);

  const depSelected = allDep.find((ele) => ele.uuid == departmentId);
  console.log(depSelected);

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper-view-department">
      <main id="modal-view-department">
        <button class="modal-close-view-department"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
        <div class="div-modal-view-department-header">
          <h1 class="font40-bold-poppins">${depSelected.name}</h1>
        </div>
        <div class="div-modal-view-department-description">
          <div class="div-modal-view-department-description-company">
            <h4 class="font20-bold-poppins">${depSelected.description}</h4>
            <h5 class="font18-regular-poppins">${depSelected.companies.name}</h5>
          </div>
          <div class="div-modal-view-department-select-button">
            <select class="select-users-out_of_work font18-regular-inter text-black-50" name="select-user" id="select-user">
              <option value="select-user">Selecionar Usuário</option>
            </select>
            <button class="buttons-default buttons-green font18-bold-inter">Contratar</button>
          </div>
        </div>
        <div class="box-company-workers">
          <article class="card-worker">
            <div class="div-worker-info">
              <h4 class="font20-bold-inter">Username</h4>
              <h4 class="font18-regular-inter">Júnior</h4>
              <h4 class="font18-regular-inter">Company Name</h4>
            </div>
            <div class="div-worker-button-dismiss">
              <button id="button-dismiss-user-id" class="button-dismiss-user buttons-default buttons-red font18-bold-inter">Desligar</button>
            </div>
          </article>
        </div>

      </main>
    </div>`
  );

  const boxCompanyWorkers = document.querySelector('.box-company-workers')

  

  const selectUsersOutOfWork = document.querySelector(
    ".select-users-out_of_work"
  );

  usersFree.forEach((element) => {
    const option = document.createElement("option");

    option.id = element.uuid;
    option.value = element.uuid;
    option.innerText = element.username;

    selectUsersOutOfWork.append(option);
  });

  const modalWrapper = document.querySelector(".modal-wrapper-view-department");
  const btnClose = document.querySelector(".modal-close-view-department");

  // btnSub.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log("click on btnSub update-user-profile");
  //   createDepartment(data);
  //   modalWrapper.remove();
  // });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}

export function createModalDeleteDepartment(token, departmentId, allDep) {
  const body = document.querySelector("body");

  const depSelected = allDep.find((ele) => ele.uuid == departmentId);
  console.log(depSelected);

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
       <main id="modal-delete-department">
         <button class="modal-close"><img src="../assets/Vector_close.png" alt="Botão fechar"></i></button>
         <div class="div-modal-delete-department-header">
           <h1 class="font28-bold-poppins">Realmente deseja deletar o Departamento ${depSelected.name} e demitir seus funcionários?</h1>
         </div>
         <button class="button-submit-delete-department buttons-default buttons-green font18-bold-inter" type="submit">Confirmar</button>
       </main>
     </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  const btnClose = document.querySelector(".modal-close");
  const btnSub = document.querySelector(".button-submit-delete-department");

  btnSub.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click on btnSub delete-department");
    deleteDepartment(token, departmentId);
    modalWrapper.remove();
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("modal-wrapper removed");
    modalWrapper.remove();
  });
}
