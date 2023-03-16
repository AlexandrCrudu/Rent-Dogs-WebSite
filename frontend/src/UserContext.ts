import { createContext } from "react";
import { UserType } from "./types/UserTypes";

type UserContextType = [
  UserType | {},
  React.Dispatch<React.SetStateAction<UserType | {}>>
];

const UserContext = createContext<UserContextType>([{}, () => {}]);

export default UserContext;
