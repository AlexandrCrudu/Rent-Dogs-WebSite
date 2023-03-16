import { createContext } from "react";
import { UserType } from "./types/UserTypes";

type UserContextType = [
  UserType | null,
  React.Dispatch<React.SetStateAction<UserType | null>>
];

const UserContext = createContext<UserContextType>([null, () => {}]);

export default UserContext;
