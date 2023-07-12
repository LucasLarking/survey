import DeleteIcon from '@mui/icons-material/Delete';
import { Chip, FormControl, IconButton, InputLabel, ListItemText, MenuItem, Select, TableCell, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExtendedQuestion } from '../../question/hooks/useGetExtendedQuestion';
import useAddFIlter from './hooks/useAddFilter';

interface Props {
    question: ExtendedQuestion
}

const FilterQuestion = ({ question }: Props) => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const [selectedOption, setSelectedOption] = useState('')
    const addFilter = useAddFIlter(survey_id)

    
    // const options = question.options.map((option) => {option.option: option.id})
    console.log('Filter', question.filterObjs)

    return (


        <>
            <TableCell sx={{ color: 'white' }}>{question.question}</TableCell>
            <TableCell sx={{ color: 'white' }}>

                <FormControl>
                    <InputLabel sx={{ color: 'white' }} id="demo-multiple-checkbox-label">Options</InputLabel>
                    <Select
                        sx={{ bgcolor: '#24272a', color: 'white', minWidth: 200 }}
                        // multiple
                        value={selectedOption}
                        // renderValue={(selected) => selected.join(', ')}
                        onChange={(e) => {
                            setSelectedOption(e.target.value);
                            const option = question.options.filter((item) => item.option == e.target.value)[0]

                            console.log(e.target.value, option)
                            addFilter.mutate({
                                option: option.id,
                                question: question.id

                            })

                        }}
                    >
                        {question.options.map((option) => (
                            <MenuItem key={option.id} value={option.option}>

                                <ListItemText primary={option.option} />
                            </MenuItem>
                        ))}


                    </Select>

                </FormControl>

            </TableCell>


            <TableCell align='center'>

                {question.filterObjs.map((filterObj) => (
                    <Chip  key={filterObj.id}  sx={{color:'white', bgcolor:'#24272a', mx:1}} label={filterObj.option_text}  color='warning' />
                ))}
            </TableCell>




        </>

    )
}

export default FilterQuestion