import { Dispatch } from "react";
import { Option } from "../../option/OptionProvider";
import { TakeOptionAction } from "./TakeOptionProvider";
import React from "react";

interface OptionsContextType {
    options: Option[];
    dispatch: Dispatch<TakeOptionAction>
}

const TakeOptionsContext = React.createContext<OptionsContextType>({} as OptionsContextType);
export default TakeOptionsContext