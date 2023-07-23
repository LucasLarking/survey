
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import TakeOptions from './TakeOptions'
import { Question } from '../question/Question'


interface Props {
    question: Question
}

const TakeQuestion = ({question}: Props) => {
    const [isSelected, setIsSelected] = useState<number>(0)
    return (
        <>
            <Box className="question">
                <Typography variant='h5' component={'h2'} sx={{ color: 'secondary.main' }}>{question.question}</Typography>
                <TakeOptions question={question} isSelected={isSelected} setIsSelected={setIsSelected} />
            </Box>
        </>
    )
}

export default TakeQuestion