import { GetUserApiType } from "../../src/types/UserTypes";

const getMe = async (): Promise<GetUserApiType> => {
  const jwt = localStorage.getItem("token");

  const res = await fetch(`http://localhost:3001/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.json();
};

export default getMe;
