import { useContext } from "react";
import TakeOptionsContext from "./TakeOptionContext";

const useTakeOption = () => useContext(TakeOptionsContext);
export default useTakeOption