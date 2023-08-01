import { Box, Typography } from '@mui/material';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import React, { useEffect } from 'react'

interface Props {
    num: number;
    caption: string;
    unit: string;
}

const NumberStat = ({ num, caption, unit }: Props) => {
    const InteractionCount = useMotionValue(num > 10 ? num - (num * 0.5) : 0);
    const InteractionCountRounded = useTransform(InteractionCount, Math.round);

    useEffect(() => {
        const animation = animate(InteractionCount, num, { duration: 1 });

        return animation.stop;
    }, []);
    return (
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

                <Typography variant='h3' sx={{
                    // width: '100px', position: 'relative', textAlign: 'right',
                }}>
                    <motion.span>{InteractionCountRounded}</motion.span>
                </Typography>
                <Typography variant='h3' 
                sx={{ position: 'absolute', right: '-20%', top: 0 }}
                >
                    {unit}
                </Typography>
            </Box>

            <Typography variant='caption' sx={{ position: 'relative',  }}>{caption}dasdasdasdasdas</Typography>
        </Box>
    )
}

export default NumberStat