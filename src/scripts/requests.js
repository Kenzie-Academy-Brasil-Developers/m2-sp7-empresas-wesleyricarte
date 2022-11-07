import { getLocalStorage } from "./getLocalStorage.js";
import { toast } from "./toasts.js";

const baseUrl = "http://localhost:6278";

export function createUser(data) {
  fetch(baseUrl + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        toast("Sua conta foi criada com sucesso!");
        setTimeout(() => {
          window.location.replace("./loginPage.html");
        }, 4000);
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Sua conta não foi criada!");
      }
    })
    .then((res) => {
      console.log(res);
    });
}

export function login(data) {
  fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        toast("Você fez login com sucesso!");
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Login incorreto!");
      }
    })
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        localStorage.setItem("@kenzieEmpresas:token", "");
        localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(res));
        validateUser(res);
      }, 4000);
    });
}

export function validateUser(tokenObj) {
  const token = tokenObj.token;
  // console.log(token);
  fetch(baseUrl + "/auth/validate_user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        // console.log(res);
        // console.log("validado");
        // setTimeout(() => {}, 4000);
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      console.log(res);
      if (res.is_admin) {
        console.log("is admin is true, so let's go to adminPage");
        window.location.replace("./adminPage.html");
      } else {
        console.log("is admin is false, so let's go to userPage");
        window.location.replace("./userPage.html");
      }
      localStorage.setItem("@kenzieEmpresas:is_admin", "");
      localStorage.setItem("@kenzieEmpresas:is_admin", JSON.stringify(res));
    });
}

export function listCompanies() {
  fetch(baseUrl + "/companies", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("@kenzieEmpresas:companies", JSON.stringify(res));
      return res;
    });
}

export function listCompaniesSector(sector) {
  fetch(baseUrl + "/companies/" + sector, {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(
        "@kenzieEmpresas:sector-selected",
        JSON.stringify(res)
      );
    });
}

export function listAllSectors() {
  fetch(baseUrl + "/sectors", {
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("@kenzieEmpresas:sectors", JSON.stringify(res));
    });
}

export function getUserProfile(token) {
  fetch(baseUrl + "/users/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      localStorage.removeItem("@kenzieEmpresas:user-profile");
      localStorage.setItem("@kenzieEmpresas:user-profile", JSON.stringify(res));
      console.log(res);
    });
}

export function getUserCoworkers(token) {
  fetch(baseUrl + "/users/departments/coworkers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(
        "@kenzieEmpresas:user-coworkers",
        JSON.stringify(res)
      );
    });
}

export function getUserDepartments(token) {
  fetch(baseUrl + "/users/departments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
      }
    })
    .then((res) => {
      localStorage.setItem(
        "@kenzieEmpresas:user-departments",
        JSON.stringify(res)
      );
      console.log(res);
    });
}

export function updateUserProfile(data) {
  const token = getLocalStorage("@kenzieEmpresas:token");
  fetch(baseUrl + "/users", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        localStorage.removeItem("@kenzieEmpresas:user-profile");
        localStorage.setItem(
          "@kenzieEmpresas:user-profile",
          JSON.stringify(res)
        );
        toast("Perfil atualizado com sucesso!");
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Erro ao atualizar o perfil!");
      }
    })
    .then((res) => {
      console.log(res);
    });
}

// ADMIN REQUESTS

export async function listAllUsers(token) {
  try {
    const request = await fetch(baseUrl + "/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (request.ok) {
      const response = await request.json();
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function listUsersOutOfWork(token) {
  try {
    const request = await fetch(baseUrl + "/admin/out_of_work", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = request.json();
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export function updateUserInfo(token, userId, data) {
  fetch(baseUrl + "/admin/update_user/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.reload();
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Usuário não foi atualizado!");
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(
        "@kenzieEmpresas:user-updated-by-admin",
        JSON.stringify(res)
      );
      toast("Usuário atualizado com sucesso!");
    });
}

export function deleteUser(userId) {
  const token = getLocalStorage("@kenzieEmpresas:token");
  fetch(baseUrl + "/admin/delete_user/" + userId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Usuário não deletado!");
      }
    })
    .then((res) => {
      console.log(res);
      toast("Usuário deletado com sucesso!");
    });
}

// COMPANY REQUESTS

export function registerCompany(data) {
  const token = getLocalStorage("@kenzieEmpresas:token");
  fetch(baseUrl + "/companies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Empresa não registrada!");
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("@kenzieEmpresas:new-company", JSON.stringify(res));
      toast("Empresa registrada com sucesso!");
    });
}

export async function listAllDepartments(token) {
  try {
    const request = await fetch(baseUrl + "/departments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (request.ok) {
      const response = await request.json();
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function listAllDepartmentsCompany(token, companyId) {
  try {
    const request = await fetch(baseUrl + "/departments/" + companyId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createDepartment(token, data) {
  try {
    const request = await fetch(baseUrl + "/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = request.json();
      toast("Departamento criado com sucesso!");
      return response;
    } else {
      toast("Departamento não foi criado!");
    }
  } catch (err) {
    console.log(err);
  }
}

export function hireWorker(data) {
  const token = getLocalStorage("@kenzieEmpresas:token");
  fetch(baseUrl + "/departments/hire", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Erro na admissão!");
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(
        "@kenzieEmpresas:new-department",
        JSON.stringify(res)
      );
      toast("Funcionário admitido com sucesso!");
    });
}

export function dismissWorker(userId) {
  const token = getLocalStorage("@kenzieEmpresas:token");
  fetch(baseUrl + "/departments/dismiss/" + userId, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res.json().then((response) => response.message));
        toast("Erro na demissão!");
      }
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(
        "@kenzieEmpresas:new-department",
        JSON.stringify(res)
      );
      toast("Funcionário demitido com sucesso!");
    });
}

export async function updateDepartment(token, departmentId, data) {
  try {
    const request = await fetch(baseUrl + "/departments/" + departmentId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = request.json();
      toast("Departamento atualizado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return response;
    } else {
      toast("Departamento não foi atualizado!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDepartment(token, departmentId) {
  try {
    const request = await fetch(baseUrl + "/departments/" + departmentId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = request.json();
      toast("Departamento deletado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return response;
    } else {
      toast("Departamento não foi deletado!");
    }
  } catch (err) {
    console.log(err);
  }
}

// export {
//   createUser,
//   login,
//   validateUser,
//   listCompanies,
//   listCompaniesSector,
//   listAllSectors,
//   getUserProfile,
//   getUserCoworkers,
//   getUserDepartments,
//   updateUserProfile,
//   listAllUsers,
//   listUsersOutOfWork,
//   updateUserInfo,
//   deleteUser,
//   registerCompany,
//   listAllDepartments,
//   listAllDepartmentsCompany,
//   createDepartment,
//   hireWorker,
//   dismissWorker,
//   updateDepartment,
//   deleteDepartment,
// };
