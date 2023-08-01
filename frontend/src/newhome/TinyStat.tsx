import { Box, Typography } from '@mui/material'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import React, { useEffect } from 'react'

const TinyStat = () => {


    const InteractionCount = useMotionValue(0);
    const InteractionCountRounded = useTransform(InteractionCount, Math.round);

    useEffect(() => {
        const animation = animate(InteractionCount, 122637, { duration: 1, delay: .7 });

        return animation.stop;
    }, []);

    return (
        <>

            <motion.div
                viewport={{ once: true }}
                initial={{ x: 100, opacity: 0, }}
                whileInView={{ x: 0, opacity: 1, }}
                transition={{ duration: .3, delay: 0.7 }}>



                <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px', }}>
                    <Typography variant='subtitle1' sx={{ color: 'gray' }}>Daily Interactions</Typography>
                    <Typography variant='h5' sx={{ fontSize: 50 }}> <motion.span>{InteractionCountRounded}</motion.span></Typography>

                </Box>
            </motion.div>

        </>
    )
}

export default TinyStat

