import { createContext } from "react";
import MockData from "../../../mockData-TestCases.json";

export const DataContext = createContext(MockData);
export const PrintContext = createContext([]);