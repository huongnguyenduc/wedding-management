import { setCookie } from "../../action/Login";

// const API_URL = "https://wedding-management.herokuapp.com/api/user/sign-in";

const API_SERVER = "https://wedding-management.herokuapp.com/api/";
const LOGIN_API = "user/sign-in";

export function CallAPI(endpoint, method = "GET", body) {
  const config = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const URL = API_SERVER + endpoint;
  return fetch(URL, config);
}

export function login(account, success) {
  CallAPI(LOGIN_API, "POST", account)
    .then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}, ${res.statusText}`);
      return res.json();
    })
    .then((data) => {
      setCookie("username", data.username, 5);
      setCookie("image", data.image, 5);
      setCookie("fullname", data.fullname, 5);
      setCookie("token", data.token, 5);
      setCookie("role", data.role, 5);
      setCookie("privileges", JSON.stringify(data.privileges), 5);
      success({ status: "success" });
    })
    .catch((err) => {
      if (err.message === "Unexpected end of JSON input")
        success({ status: "wrong" });
      else {
        success({ status: "error" });
        console.log(err);
      }
    });
}
