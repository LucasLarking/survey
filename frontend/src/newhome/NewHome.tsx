import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import w2 from '../assets/man2.png'
import p1 from '../assets/patterns/p1.jpg'
import TinyChart from './tinyChart'
import { motion } from 'framer-motion'
import TinyStat from './TinyStat'
import { useInView } from 'react-intersection-observer';
import FakeDashboard from './fakeDashBoard/FakeDashboard'
import NumberStats from './NumberStats'
const NewHome = () => {
    const [inViewRef, inView] = useInView({ triggerOnce: true });
    const parentVariant = {
        visible: {
            x: 0,
            transition: {
                staggerChildren: 0.05,
            },
        },
        hidden: { x: 0 },
    };

    const childVariant = {
        hidden: {
            y: 50,
            x: -20,
            // transform: 'skewX(20deg)',
            opacity: 0,
        },
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            // transform: 'skewX(10deg)',
        },
    };
    const parentAnimation = inView ? 'visible' : 'hidden';
    return (
        <>

            <Container maxWidth='xl' sx={{ mt: 0, overflow: 'show' }} >
                {/*  bgcolor: '#131F9e' */}


                <Box sx={{ p: 15, borderRadius: 12, display: 'flex', position: 'relative', overflow: 'show', }}>


                    <Typography variant='h1' sx={{ color: 'white', fontWeight: 700, fontSize: 140, lineHeight: .85, display: 'block', zIndex: 2 }}>
                        <motion.div

                            initial="hidden"
                            animate={parentAnimation}
                            variants={parentVariant}
                            ref={inViewRef}>

                            <motion.div variants={childVariant}>
                                <Box>Build</Box>
                            </motion.div>

                            <motion.div variants={childVariant}>
                                <Box>Better</Box>
                            </motion.div>

                            <motion.div variants={childVariant}>
                                <Box className='textColorAnimation'>Build</Box>
                            </motion.div>

                            <motion.div variants={childVariant}>
                                <Box className='textColorAnimation'>Faster</Box>
                            </motion.div>
                        </motion.div>
                    </Typography>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, }}
                        whileInView={{ x: 0, opacity: 1, }}
                        transition={{ duration: .3, delay: .5 }}>

                        <Typography variant='body1' component={'h2'} sx={{ color: 'white', display: 'block', maxWidth: '250px', position: 'relative', zIndex: 2, left: '30px' }}>Our top rated survey program helps you build the survey you've alwats dreamt of</Typography>
                    </motion.div>
                    <img src={w2} alt="" className='heroImg' />
                    <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: 2, right: '5%', top: '20%', zIndex: 2 }}>
                        <TinyChart />
                        <TinyStat />
                    </Box>



                    <Box sx={{ borderRadius: '50%', width: '500px', height: '500px', bgcolor: '#131F9e', webkitFilter: 'blur(100px)', filter: 'blur(200px)', position: 'absolute', left: 0, top: 0, zIndex: 0 }}>
                    </Box>
                    <Box sx={{ borderRadius: '50%', width: '300px', height: '300px', bgcolor: '#500c61', webkitFilter: 'blur(100px)', filter: 'blur(100px)', position: 'absolute', right: 0, top: 0, zIndex: 0 }} />
                    <motion.div className='aaa' animate={{
                        x: [-500, 0, -500],
                        // x: [500, 100, 100],

                    }}
                        transition={{
                            duration: 10,
                            ease: "easeInOut",
                            repeat: Infinity,
                            // delay: 2
                        }}>

                        <Box sx={{ borderRadius: '50%', width: '500px', height: '500px', bgcolor: '#3813a0', webkitFilter: 'blur(100px)', filter: 'blur(200px)', left: '0px', top: '100px', zIndex: 0, position: 'absolute', }} />


                    </motion.div>
                </Box>

            </Container >

            <NumberStats />
        </>
    )
}
export default NewHome