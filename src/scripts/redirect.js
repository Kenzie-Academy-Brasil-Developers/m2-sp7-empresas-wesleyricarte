export function redirectEvent() {
  const redirectButtons = document.querySelectorAll(".buttons-redirect");

  redirectButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const path = event.target.dataset.path;
      redirect(path);
    });
  });
}

export function redirect(path) {
  window.location.replace(path);
}