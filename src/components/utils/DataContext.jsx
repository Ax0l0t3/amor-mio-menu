import { createContext } from "react";
import MockData from "../../../mockData.json";

export const DataContext = createContext(MockData);
export const PrintContext = createContext([]);
