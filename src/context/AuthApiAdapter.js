import Axiosinstance from "../Pages/Utils/Axiosinstance";
import Apipath from "../Pages/Utils/Apipath";

// Backend adapter functions.
// These are written to be called later from Authcontext.
// No backend currently exists; these functions are safe to import.

export async function apiLogin({ email, password, role }) {
  // Standard expected backend response:
  // { success: true, token, user }
  // token: JWT string
  // user: { _id, name/fullName, email, role }
  const res = await Axiosinstance.post(Apipath.auth.login, {
    email,
    password,
    role,
  });

  return res.data;
}

export async function apiRegister({ fullName, email, password, role }) {
  const res = await Axiosinstance.post(Apipath.auth.register, {
    fullName,
    email,
    password,
    role,
  });

  return res.data;
}

export async function apiMe() {
  const res = await Axiosinstance.get(Apipath.auth.me);
  return res.data;
}

export async function apiLogout() {
  const res = await Axiosinstance.post(Apipath.auth.logout);
  return res.data;
}

