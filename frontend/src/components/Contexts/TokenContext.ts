import { createContext } from "react";

type TokenContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
];

const TokenContext = createContext<TokenContextType>([null, () => {}]);

export default TokenContext;
