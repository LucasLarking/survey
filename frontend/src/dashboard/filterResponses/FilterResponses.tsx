import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ExtendedQuestion } from '../../question/hooks/useGetExtendedQuestion';
import FilterQuestion from './FilterQuestion';
import useClearFilter from './hooks/useClearFilter';
interface Props {
  questions: ExtendedQuestion[]
}


const FilterResponses = ({ questions }: Props) => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const clearFilter = useClearFilter(survey_id)
  return (
    <>


      <Box>

        <Typography variant='h4' sx={{ color: '#6ceca8', mb: 3 }}>Filter Respondants</Typography>
        <Table sx={{ minWidth: 650, bgcolor: '#181a1c', color: 'white' }}>
          <TableHead sx={{ backgroundColor: '#24272a' }}>
            <TableRow>


              <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }}>Question</TableCell>
              <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }} >Options</TableCell>
              <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }} align='center'>Applied Filters</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <FilterQuestion question={question} />
              </TableRow>
            ))}




          </TableBody>

        </Table>
        <Button variant="contained"
          disableElevation

          size="large"
          sx={{ fontWeight: 700, letterSpacing: 0.5, bgcolor: '#6ceca8', color: 'black', mt: 2 }}
          endIcon={<DeleteIcon />}
          onClick={() => {
            clearFilter.mutate({
              question:0,
              option:0
            })
          }}>
          Clear Filters
        </Button>
      </Box>
    </>
  )
}

export default FilterResponses