import React from 'react'
import { Option } from '../option/OptionProvider'
import { UseFormRegister, FieldValues } from 'react-hook-form';

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