import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Option } from '../option/OptionProvider';

interface Props {
    option: Option;
    register: UseFormRegister<FieldValues>;
}

const TakeOptionForm = ({ option, register  }: Props) => {
    return (
        <>
        <p>{option.option}</p>
        </>
    )
}

export default TakeOptionForm