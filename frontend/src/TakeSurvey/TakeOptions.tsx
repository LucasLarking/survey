import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useGetOptions from '../option/hooks/useGetOptions';
import { Question } from '../question/Question';
import useAddInteractionItem from '../interaction/hooks/useAddInteractionItem';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
    question: Question;
    isSelected: number;
    setIsSelected: (value: number) => void;
}

const TakeOptions = ({ question, isSelected, setIsSelected }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data, isLoading, error } = useGetOptions(survey_id, question.id)

    const addVote = useAddInteractionItem(survey_id)
    const queryClient = useQueryClient();




    if (error) return <p>{error.message}</p>


    return (
        <>

            <Box method='post' component={'form'} sx={{ width: '100%' }}>
                <FormControl sx={{ width: '100%' }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        sx={{ width: '100%' }}
                    >

                        {data?.map((option, index) => (
                            <motion.div
                                key={option.id}
                                className="option"
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.01 }}
                                viewport={{ once: true }}
                            >

                                <FormControlLabel value={option.option} control={<Radio />} label={option.option} onClick={(e) => {
                                    setIsSelected(option.id)
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
                                }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        boxSizing: 'border-box',
                                        gap: 2,
                                        // bgcolor: 'primary.light',
                                        transition: '.2s ease-in-out background',
                                        bgcolor: isSelected == option.id ? 'secondary.main' : 'primary.main',
                                        p: 3,
                                        my: 2,
                                        borderRadius: '5px',
                                        width: '100%',
                                        color: isSelected == option.id ? 'black' : 'white',
                                        '&:hover': {
                                            bgcolor: isSelected == option.id ? 'secondary.main' : 'primary.light',
                                            // border: '1px solid green', // Update the color on hover
                                            // color: 'white'
                                        },
                                    }}
                                />

                            </motion.div>
                        ))}
                    </RadioGroup>


                </FormControl>

            </Box>
        </>
    )
}

export default TakeOptions