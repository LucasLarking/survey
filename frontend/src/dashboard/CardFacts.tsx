import { Box, Slide, Typography } from '@mui/material';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  interaction_count: number;
  interaction_count_this_week: number;
  daily_interaction_count: number;
}

const CardFacts = ({ interaction_count, interaction_count_this_week, daily_interaction_count }: Props) => {
  const containerRef = useRef(null)
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  const InteractionCount = useMotionValue(interaction_count > 10 ? interaction_count - (interaction_count * 0.2) : 0);
  const InteractionCountRounded = useTransform(InteractionCount, Math.round);

  useEffect(() => {
    const animation = animate(InteractionCount, interaction_count, { duration: 1 });

    return animation.stop;
  }, []);


  const WeeklyInteractionCount = useMotionValue(interaction_count_this_week > 10 ? interaction_count_this_week - (interaction_count_this_week * 0.2) : 0);
  const WeeklyInteractionRounded = useTransform(InteractionCount, Math.round);

  useEffect(() => {
    const animation = animate(WeeklyInteractionCount, interaction_count_this_week, { duration: 1 });

    return animation.stop;
  }, []);
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


  return (
    <>

      <motion.div
        initial="hidden"
        animate={parentAnimation}
        variants={parentVariant}
        ref={inViewRef}
      >
        <Box ref={containerRef} sx={{ display: 'flex', justifyContent: 'center', gap: 3, overflow: 'hidden', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
          <motion.div variants={childVariant} className='motionItem'>
            <Box sx={{ width: { sm: 'auto', md: '100%' }, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', padding: 3, height: '100%' }}>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>Total Interactions</Typography>
              <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>
                <motion.span>{InteractionCountRounded}</motion.span>
               </Typography>
            </Box>
          </motion.div>

          <motion.div variants={childVariant} className='motionItem'>
            <Box sx={{ width: { sm: 'auto', md: '100%' }, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', padding: 3, height: '100%' }}>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>Interactions This Week</Typography>
              <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>
              <motion.span>{WeeklyInteractionRounded}</motion.span></Typography>
            </Box>
          </motion.div>
          <motion.div variants={childVariant} className='motionItem'>
            <Box sx={{ width: { sm: 'auto', md: '100%' }, bgcolor: 'primary.light', color: 'white', borderRadius: '20px', padding: 3, height: '100%' }}>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>Daily Interactions</Typography>
              <Typography variant='h4' sx={{ fontWeight: 700, mt: 2, color: 'secondary.main' }}>{daily_interaction_count}</Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </>
  )
}

export default CardFacts