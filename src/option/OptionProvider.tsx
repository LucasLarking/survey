import { ReactNode, useReducer } from "react";
import OptionsContext from "./OptionContext";


export interface Option {
    id: number;
    option: string;
    question: number;
    vote_count: number;
}
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

export type OptionAction = AddOption | DeleteOption | UpdateOption | clearOption;

const OptionReducer = (options: Option[], action: OptionAction): Option[] => {
    if (action.type === 'Add') {

        return [...options, action.option];
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




const optionProvider = ({ children }: Props) => {
    const [options, dispatch] = useReducer(OptionReducer, []);
    return (
        <OptionsContext.Provider value={{ options: options, dispatch }}>
            {children}
        </OptionsContext.Provider>
    )
}

export default optionProvider