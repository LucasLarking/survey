import { useParams } from 'react-router-dom';
import { Question } from '../question/Question';
import EditOptionForm from './EditOptionForm';
import useGetOptions from './hooks/useGetOptions';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';


interface Props {
  question: Question;

}


const EditOption = ({ question }: Props) => {
  const { slug } = useParams();
  const survey_id = parseInt(slug!);
  const { data: options, error: optionsError } = useGetOptions(survey_id, question.id)

  if (optionsError) return <p>{optionsError.message}</p>
  // if (optionsLoading) return <OptionSkeleton />

  return (
    <>
      {/* <AnimatePresence> */}
      {options?.map((option) => (
        <motion.div key={option.id} className="option"
        
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .2 }}
          whileTap={{ scale: .995 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
        >
          <EditOptionForm option={option} />
        </motion.div>
      ))}
      {/* </AnimatePresence> */}
    </>
  )
}

export default EditOption