import { getLocalStorage } from "./getLocalStorage.js";
import { toast } from "./toasts.js";

const baseUrl = "http://localhost:6278";

export async function createUser(data) {
  try {
    const request = awaitfetch(baseUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      toast("Sua conta foi criada com sucesso!");
      setTimeout(() => {
        window.location.replace("./loginPage.html");
      }, 4000);
      return response;
    } else {
      toast("Sua conta não foi criada!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function login(data) {
  try {
    const request = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      toast("Você fez login com sucesso!");
      localStorage.removeItem("@kenzieEmpresas:token");
      localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(response));
      return response;
    } else {
      toast("Login incorreto!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function validateUser(tokenObj) {
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

export async function listCompanies() {
  try {
    const request = await fetch(baseUrl + "/companies", {
      method: "GET",
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem(
        "@kenzieEmpresas:companies",
        JSON.stringify(response)
      );
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function listCompaniesSector(sector) {
  try {
    const request = await fetch(baseUrl + "/companies/" + sector, {
      method: "GET",
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem(
        "@kenzieEmpresas:sector-selected",
        JSON.stringify(response)
      );
      console.log(response)
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function listAllSectors() {
  try {
    const request = await fetch(baseUrl + "/sectors", {
      method: "GET",
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem("@kenzieEmpresas:sectors", JSON.stringify(response));
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserProfile(token) {
  try {
    const request = await fetch(baseUrl + "/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.removeItem("@kenzieEmpresas:user-profile");
      localStorage.setItem(
        "@kenzieEmpresas:user-profile",
        JSON.stringify(response)
      );
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserCoworkers(token) {
  try {
    const request = await fetch(baseUrl + "/users/departments/coworkers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem(
        "@kenzieEmpresas:user-coworkers",
        JSON.stringify(response)
      );
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDepartments(token) {
  try {
    const request = await fetch(baseUrl + "/users/departments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem(
        "@kenzieEmpresas:user-departments",
        JSON.stringify(response)
      );
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserProfile(data) {
  try {
    const token = getLocalStorage("@kenzieEmpresas:token");

    const request = await fetch(baseUrl + "/users", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      localStorage.removeItem("@kenzieEmpresas:user-profile");
      localStorage.setItem(
        "@kenzieEmpresas:user-profile",
        JSON.stringify(response)
      );
      toast("Perfil atualizado com sucesso!");
      return response;
    } else {
      toast("Erro ao atualizar o perfil!");
    }
  } catch (err) {
    console.log(err);
  }
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
      const response = await request.json();
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserInfo(token, userId, data) {
  try {
    const request = await fetch(baseUrl + "/admin/update_user/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      window.location.reload();
      toast("Usuário atualizado com sucesso!");
      console.log(response);
      return response;
    } else {
      toast("Usuário não foi atualizado!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(userId) {
  try {
    const token = getLocalStorage("@kenzieEmpresas:token");

    const request = await fetch(baseUrl + "/admin/delete_user/" + userId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      toast("Usuário deletado com sucesso!");
      console.log(response);
      return response;
    } else {
      toast("Usuário não deletado!");
    }
  } catch (err) {
    console.log(err);
  }
}

// COMPANY REQUESTS

export async function registerCompany(data) {
  try {
    const token = getLocalStorage("@kenzieEmpresas:token");

    const request = await fetch(baseUrl + "/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      toast("Empresa registrada com sucesso!");
      localStorage.setItem(
        "@kenzieEmpresas:new-company",
        JSON.stringify(response)
      );
      console.log(response);
      return response;
    } else {
      toast("Empresa não registrada!");
    }
  } catch (err) {
    console.log(err);
  }
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
      const response = await request.json();
      toast("Departamento criado com sucesso!");
      return response;
    } else {
      toast("Departamento não foi criado!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function hireWorker(data) {
  try {
    const token = getLocalStorage("@kenzieEmpresas:token");

    const request = await fetch(baseUrl + "/departments/hire", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      const response = await request.json();
      toast("Funcionário admitido com sucesso!");

      return response;
    } else {
      toast("Erro na admissão!");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function dismissWorker(userId) {
  try {
    const token = getLocalStorage("@kenzieEmpresas:token");

    const request = await fetch(baseUrl + "/departments/dismiss/" + userId, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();
      toast("Funcionário demitido com sucesso!");
      console.log(response);
      return response;
    } else {
      toast("Erro na demissão!");
    }
  } catch (err) {
    console.log(err);
  }
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
      const response = await request.json();
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
      const response = await request.json();
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
