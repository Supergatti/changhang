export function getToken() {
  return sessionStorage.getItem("token");
}

export function setToken(token) {
  console.log("token",token)
  sessionStorage.setItem("token", token);
}

export function clearToken() {
  sessionStorage.removeItem("token");
}

export function isLogined() {
  if (sessionStorage.getItem("token")) {
    return true;
  }
  return false;
}


// 保存当前用户id值
export function getId() {
  return sessionStorage.getItem("id");
}
export function setId(id) {
  sessionStorage.setItem("id", id);
}
export function clearId() {
  sessionStorage.removeItem("id");
}

// 保存当前用户角色 Role
export function getRole() {
  return sessionStorage.getItem("Role");
}
export function setRole(Role) {
  sessionStorage.setItem("Role", Role);
}
export function clearRole() {
  sessionStorage.removeItem("Role");
}