import { createContext } from "react";

type UserContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const UserContext = createContext<UserContextType>(["", () => {}]);

export default UserContext;
