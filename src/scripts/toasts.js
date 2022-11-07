// READY!!!

export function toast(title) {
  const body = document.querySelector("body");

  const container = document.createElement("div");
  container.classList.add("toast-container");

  const h3 = document.createElement("h3");
  h3.classList.add("font14-bold-inter", "text-white");
  h3.innerText = title;

  if (
    title == "Sua conta foi criada com sucesso!" ||
    title == "Você fez login com sucesso!" ||
    title == "Perfil atualizado com sucesso!" ||
    title == "Usuário atualizado com sucesso!" ||
    title == "Usuário deletado com sucesso!" ||
    title == "Empresa registrada com sucesso!" ||
    title == "Departamento criado com sucesso!" ||
    title == "Funcionário admitido com sucesso!" ||
    title == "Funcionário demitido com sucesso!" ||
    title == "Departamento atualizado com sucesso!" ||
    title == "Departamento deletado com sucesso!"
  ) {
    container.classList.add("container-green");
  } else {
    container.classList.add("container-red");
  }

  container.appendChild(h3);
  body.appendChild(container);
}
