import { createContext } from "react";
import defaultBoardsData from "@/data/defaultBoard.json";

export const BoardsContext = createContext(defaultBoardsData);
