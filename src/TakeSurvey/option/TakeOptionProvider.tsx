import { ReactNode, useReducer } from "react";
import TakeOptionsContext from "./TakeOptionContext";
import { Option } from "../../option/OptionProvider";
export const CACHE_KEY_OPTIONS = ['options'];



interface AddOption {
    type: 'Add';
    option: Option
}
interface UpdateOption {
    type: 'Update';
    option: Option
}

interface DeleteOption {
    type: 'Delete';
    option: Option
}

interface clearOption {
    type: 'Clear';

}

export type TakeOptionAction = AddOption | DeleteOption | UpdateOption | clearOption;

const TakeOptionReducer = (options: Option[], action: TakeOptionAction): Option[] => {
    if (action.type === 'Add') {
        const filteredOptions = options.filter((obj, index) => obj.question !== action.option.question);
       
        // console.log(filteredOptions)
        return [...filteredOptions, action.option];
    }
    if (action.type === 'Delete') {
        console.log(action.option)
        const filteredOptions = options.filter((obj, index) => obj.id !== action.option.id); // Delete the second item (index 1)

        return filteredOptions;
    }
    if (action.type === 'Update') {
        const updatedOptions = options.map((obj) => {
            if (obj.id === action.option.id) {
                return { ...obj, option: action.option.option };
            }
            return obj;
        });
        return updatedOptions;
    };
    if (action.type === 'Clear') {
        const updatedOptions = options.filter((obj) => obj.option.length != 0)

        if (updatedOptions.length > 0){
        return updatedOptions;} else {
            return [options[0]]
            
        }
    };
    return options

}


interface Props {
    children: ReactNode
}




const TakeoptionProvider = ({ children }: Props) => {
    const [Takeoptions, dispatch] = useReducer(TakeOptionReducer, []);
    return (
        <TakeOptionsContext.Provider value={{ options: Takeoptions, dispatch }}>
            {children}
        </TakeOptionsContext.Provider>
    )
}

export default TakeoptionProvider