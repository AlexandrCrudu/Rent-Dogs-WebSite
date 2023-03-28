import {
  LoginUserPropsType,
  SignUserPropsType,
} from "../../src/types/UserTypes";

export const signup = async (body: SignUserPropsType) => {
  const res = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return res.json();
};

export const login = async (body: LoginUserPropsType) => {
  const res = await fetch(
    `${import.meta.env.VITE_ROOT_API_ENDPOINT}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return res.json();
};
