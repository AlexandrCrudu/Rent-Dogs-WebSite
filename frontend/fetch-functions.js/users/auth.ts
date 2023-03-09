import {
  LoginUserPropsType,
  SignUserPropsType,
} from "../../src/types/UserTypes";

export const signup = async (body: SignUserPropsType) => {
  const res = await fetch(`http://localhost:3001/api/v1/users/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const login = async (body: LoginUserPropsType) => {
  const res = await fetch(`http://localhost:3001/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
