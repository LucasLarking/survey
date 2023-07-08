import { Dispatch } from "react";
import { Option } from "./OptionProvider";
import { OptionAction } from "./OptionProvider";
import React from "react";

interface OptionsContextType {
    options: Option[];
    dispatch: Dispatch<OptionAction>
}

const OptionsContext = React.createContext<OptionsContextType>({} as OptionsContextType);
export default OptionsContext