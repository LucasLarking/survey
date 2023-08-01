import { Box } from '@mui/material';
import { ChartContainer, LineChart, LinePlot, MarkPlot } from '@mui/x-charts';
import { motion } from 'framer-motion';
import React from 'react'

const TinyChart = () => {
    const pData = [2400, 1398, 6000, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];
    return (
        <>
            <motion.div animate={{
                y: [-5, 5, -5],

            }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    // times: [0, 0.5, 0.757, 1],
                    repeat: Infinity,
                    // repeatDelay: 1
                    delay: 2
                }}>

         
            <motion.div className='tinyChart'
                viewport={{ once: true }}
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: .3, }}>
                <Box sx={{
                    display: 'inline-block',
                    padding: 0,
                    bgcolor: 'white',
                    width: '300px',
                    height: '100px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
              


                }}>
                    <motion.div

                        viewport={{ once: true }}
                        initial={{ opacity: 0 }}
                        // initial={{ width: '300px' }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: .2, delay: .5 }}>


                        <ChartContainer
                            width={300}
                            height={250}
                            series={[{ type: 'line', data: pData }]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                            sx={{
                                '.MuiLineElement-root': {
                                    stroke: '#8884d8',
                                    strokeWidth: 2,
                                },
                                '.MuiMarkElement-root': {
                                    stroke: '#8884d8',
                                    scale: '0.6',
                                    fill: '#fff',
                                    strokeWidth: 2,
                                },
                                // bgcolor: 'lightgreen',
                                transform: 'translate(-5%, -35%)',

                            }}
                            disableAxisListener
                        >
                            <LinePlot />
                            <MarkPlot />
                        </ChartContainer>

                    </motion.div>
                </Box>
            </motion.div>

            </motion.div>
        </>
    )
}

export default TinyChart