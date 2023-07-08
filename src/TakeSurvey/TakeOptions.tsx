import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import useGetOptions from '../option/hooks/useGetOptions';
import { Question } from '../question/Question';
import { Option } from '../option/OptionProvider';
import { useState } from 'react';
import useTakeOption from './option/TakeuseOption';
import useAddSurvey from '../survey/hooks/useAddSurvey';
import useAddVote from '../vote/hooks/useAddVote';

interface Props {
    question: Question;
}

const TakeOptions = ({ question }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data, isLoading, error } = useGetOptions(survey_id, question.id)
    const { options, dispatch } = useTakeOption();
    const addVote = useAddVote(survey_id)
    const schema = z.object({
        vote: z.string().nonempty('Please select an option.'),
    });

    if (error) return <p>{error.message}</p>
    const formSubmit = (data: FieldValues) => {
        console.log('submit', data)
        
    }
    return (
        <>

            <Box method='post' component={'form'} sx={{ marginTop: 10 }} >
                <FormControl >
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >

                        {data?.map((option, index) => (
                            <div key={option.id} className="option">

                                <FormControlLabel value={option.option} control={<Radio />} label={option.option} onClick={(e) => {

                                    console.log(option.option);
                                    dispatch({ type: 'Add', option: { id: option.id, option: option.option, question: option.question, vote_count: 0 } })

                                }} />

                            </div>
                        ))}
                    </RadioGroup>


                </FormControl>

            </Box>
        </>
    )
}

export default TakeOptions