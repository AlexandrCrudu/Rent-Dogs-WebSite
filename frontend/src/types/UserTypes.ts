export type LoginUserPropsType = {
  email: string;
  password: string;
};

export type SignUserPropsType = LoginUserPropsType & {
  username: string;
};

export type SignUserAPIErrorType = {
  status: "error";
  message: string;
};

export type SignUserApiSuccessType = {
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

export type LoginAPIResType = {
  status: string;
  token: string;
};
