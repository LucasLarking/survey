import { Option } from "../../option/OptionProvider";
interface TakeOptionStore {
    options: Option[]
    create: (option: string) => void;
    delete: () => void;
}

