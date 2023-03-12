export type LoginUserPropsType = {
  email: string;
  password: string;
};

export type SignUserPropsType = LoginUserPropsType & {
  username: string;
};

type SignUserAPIErrorType = {
  status: "error" | "fail";
  message: string;
};

type SignUserApiSuccessType = {
  status: "success";
  token: string;
  data: {
    user: {
      email: string;
      username: string;
      role: "user" | "admin";
      _id: string;
    };
  };
};

export type SignUpAPIResType = SignUserAPIErrorType | SignUserApiSuccessType;

type LoginAPISuccessResType = {
  status: "success";
  token: string;
};

type LoginAPIErrorResType = {
  status: "fail";
  message: string;
};

export type LoginApiResType = LoginAPISuccessResType | LoginAPIErrorResType;

export type UserType = {
  _id: string;
  email: string;
  username: string;
};
