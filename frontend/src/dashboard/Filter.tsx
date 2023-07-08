import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch } from '@mui/material'

import React from 'react';
import useGetExtendedQuestions from '../question/hooks/useGetExtendedQuestion';
import { useParams } from 'react-router-dom';

const Filter = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const { data: questions, isLoading, error } = useGetExtendedQuestions(survey_id)
    const [age, setAge] = React.useState('');
    // const containerStyle: React.CSSProperties = {
    //     backgroundColor: '#f5f5f5',
    //     padding: '20px',
    //     borderRadius: '4px',
    // };

    const columnStyle: React.CSSProperties = {

        padding: '20px',
        border: '1px solid lightgrey',
        flexGrow: 1,
        width: 1 / 3
    };
    const rowStyle: React.CSSProperties = {

        display: 'flex',

    };


    if (error) return <p>error</p>
    if (isLoading) return <p> ssss</p>

    

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <>


            <Container sx={{ height: '500px' }}>
                <Box className="filterHeader" sx={{ display: 'flex', width: '100%' }}>
                    <Box style={columnStyle}>Question</Box>
                    <Box style={columnStyle}>Option</Box>
                    <Box style={columnStyle}>Use Filter</Box>
                </Box>

                <Box>
                    {questions.map((question) => (
                        <Box style={rowStyle} key={question.id}>
                            <Box style={columnStyle}> {question.question}</Box>



                            <Box  style={columnStyle}>
                            <FormControl >
                                <InputLabel id="demo-simple-select-label">{question.question}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {question.options.map((option) => (
                                        <MenuItem key={option.id} value={10}>{option.option}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            </Box>

                            <Box style={columnStyle}>
                            <Switch />
                            </Box>



                        </Box>
                    ))}
                </Box>
            </Container>


        </>
    )
}

export default Filter