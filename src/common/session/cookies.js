import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getAccessToken = () => {
  const token = cookies.get("yddAt");
  return token;
};

export const saveAccessToken = (token) => {
  cookies.set("yddAt", token, { secure: true, path: "/" });
};

export const removeAccessToken = () => {
  cookies.remove("yddAt");
};
