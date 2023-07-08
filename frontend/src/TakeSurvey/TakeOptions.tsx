import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useGetOptions from '../option/hooks/useGetOptions';
import { Question } from '../question/Question';
import useAddInteractionItem from '../interaction/hooks/useAddInteractionItem';

interface Props {
    question: Question;
}

const TakeOptions = ({ question }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data, isLoading, error } = useGetOptions(survey_id, question.id)

    const addVote = useAddInteractionItem(survey_id)
    const queryClient = useQueryClient();



    if (error) return <p>{error.message}</p>

    return (
        <>

            <Box method='post' component={'form'} sx={{ marginTop: 10 }}>
                <FormControl >
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >

                        {data?.map((option, index) => (
                            <div key={option.id} className="option">

                                <FormControlLabel value={option.option} control={<Radio />} label={option.option} onClick={(e) => {
                                    console.log(option.id, option.question, option.option)
                                    const interaction_key = localStorage.getItem("interaction_key")
                                    if (interaction_key) {
                                        addVote.mutate({
                                            id: 0,
                                            option: option.id,
                                            question: option.question,
                                            interaction: parseInt(interaction_key)
                                        })
                                    }
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