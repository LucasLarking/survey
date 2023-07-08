import { useContext } from "react";
import OptionsContext from "./OptionContext";

const useOption = () => useContext(OptionsContext);
export default useOption