const TOKEN = "token";

let getToken = () => {
  return localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN);
};

let saveToken = (token, remember = true) => {
  if (remember) {
    localStorage.setItem(TOKEN, token);
  } else {
    sessionStorage.setItem(TOKEN, token);
  }
};

let logout = () => {
  localStorage.removeItem(TOKEN);
  sessionStorage.removeItem(TOKEN);
};

let isLogged = () => !!getToken();

export const userService = {
  getToken,
  saveToken,
  logout,
  isLogged,
};
