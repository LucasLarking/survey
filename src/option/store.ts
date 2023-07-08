import { Option } from "./OptionProvider";

interface OptionStore {
    options: Option[]
    create: (option: string) => void;
    delete: () => void;
}

