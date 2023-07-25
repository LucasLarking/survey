import { Box, Typography } from '@mui/material';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
interface AverageCompletionTime {
  avg_time: number;
}


interface Props {
  completion_rate: number;
  average_completion_time: number;
}



const SplitCards = ({ completion_rate, average_completion_time }: Props) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true });
  const CompletionRateCount = useMotionValue(completion_rate - (completion_rate * 0.2));
  const CompletionRaterounded = useTransform(CompletionRateCount, Math.round);
 
  const averageCompletionTimeCount = useMotionValue(average_completion_time - (average_completion_time * 0.2));
  const averageCompletionTimeRounded = useTransform(averageCompletionTimeCount, Math.round);

  const parentVariant = {
    visible: {
      x: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    hidden: { x: 0 },
  };

  const childVariant = {
    hidden: {
      y: 50,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const parentAnimation = inView ? 'visible' : 'hidden';
  useEffect(() => {
    const animation = animate(CompletionRateCount, completion_rate, { duration:1 });

    return animation.stop;
  }, []);
  useEffect(() => {
    const animation = animate(averageCompletionTimeCount, average_completion_time, { duration:1 });

    return animation.stop;
  }, []);
  return (
    <>

      <motion.div
        initial="hidden"
        // animate="visible"
        animate={parentAnimation}
        variants={parentVariant}
        ref={inViewRef}

      >

        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
          <motion.div variants={childVariant} className='motionItem'>
            <Box sx={{ flexGrow: 1, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', px: { xs: 3, sm: 3, md: 3 }, py: { xs: 3, sm: 3, md: 5 }, width: { xs: 1, sm: 1, md: 1 } }}>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>Completion Rate</Typography>

              <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>
                <motion.span>{CompletionRaterounded}</motion.span> %
              </Typography>


            </Box>
          </motion.div>
          <motion.div variants={childVariant} className='motionItem'>
            <Box sx={{ flexGrow: 1, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', px: { xs: 3, sm: 3, md: 3 }, py: { xs: 3, sm: 3, md: 5 }, width: { xs: 1, sm: 1, md: 1 } }}>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>Average Completion Time</Typography>

              <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>
                <motion.span>{averageCompletionTimeRounded}</motion.span> min
              </Typography>
            </Box>
          </motion.div>

        </Box>
      </motion.div>
    </>
  )
}

export default SplitCards