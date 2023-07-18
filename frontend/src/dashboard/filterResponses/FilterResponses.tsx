import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>


      <Box>

        <Typography variant='h4' sx={{ color: 'secondary.main', mb: 3 }}>Filter Respondants</Typography>
        <Table sx={{ bgcolor: 'primary.light', color: 'white' }}>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>


              <TableCell sx={{ color: 'secondary.main', fontWeight: 700 }}>Question</TableCell>

              {isLargeScreen && <TableCell sx={{ color: 'secondary.main', fontWeight: 700 }} >Options</TableCell>}
              <TableCell sx={{ color: 'secondary.main', fontWeight: 700 }} align='center'>Applied Filters</TableCell>


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
          sx={{
            fontWeight: 700, letterSpacing: 0.5, bgcolor: 'secondary.main', color: 'black', mt: 2,
            '&:hover': {
              bgcolor: 'secondary.dark', // Update the color on hover
              color:'white'
            },
          }}
          endIcon={<DeleteIcon />}
          onClick={() => {
            clearFilter.mutate({
              question: 0,
              option: 0
            })
          }}>
          Clear Filters
        </Button>
      </Box>
    </>
  )
}

export default FilterResponses