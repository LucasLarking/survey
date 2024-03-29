import { Box, Checkbox, Typography } from '@mui/material';
import { ExtendedInteraction } from '../interaction/hooks/useGetInteraction';
import { ExtendedQuestion } from '../question/hooks/useGetExtendedQuestion';
import { motion } from 'framer-motion';

interface Props {
    questions: ExtendedQuestion[] | undefined;
    interaction_obj: ExtendedInteraction | undefined
}

const Questions = ({ questions, interaction_obj }: Props) => {
    return (
        <Box sx={{ marginTop: 15 }}>
            {questions?.map((question, qIndex) => (
                <motion.div
                    viewport={{ once: true }}
                    initial={{ x: -100 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: .3, }}
                    key={question.id}>

                    <Box
                        // key={question.id}
                        sx={{
                            width: '100%',
                            color: 'white',
                            borderRadius: '5px',
                            py: 3
                        }}
                    >

                        <Typography variant='h4' sx={{ color: 'secondary.main' }}>{question.question}</Typography>
                        <Box>
                            {question.options.map((option) => (
                                <Box
                                    key={option.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                        bgcolor: option.id == interaction_obj?.questions[qIndex].option ? 'primary.main' : 'primary.light',
                                        p: 3,
                                        my: 2,
                                        borderRadius: '5px',
                                        marginLeft: option.id == interaction_obj?.questions[qIndex].option ? 3 : 0,
                                        border: option.id == interaction_obj?.questions[qIndex].option ? '3px solid darkgrey' : 0
                                    }}
                                >
                                    {option.id == interaction_obj?.questions[qIndex].option && <Checkbox checked color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}

                                    {option.id == interaction_obj?.questions[qIndex].option ? <Typography variant='h5' >{option.option}</Typography> : <Typography variant='h5'>{option.option}</Typography>}

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </motion.div>
            ))}
        </Box>
    )
}

export default Questions