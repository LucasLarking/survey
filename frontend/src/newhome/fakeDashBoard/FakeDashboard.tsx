import { Box } from '@mui/material'
import React from 'react'
import TinyChart from '../tinyChart'
import TinyStat from '../TinyStat'
import { motion } from 'framer-motion'

const FakeDashboard = () => {
  const nums = [
    { id: 0, width: '70%' },
    { id: 1, width: '60%' },
    { id: 2, width: '30%' },
    { id: 3, width: '30%' },
  ]

  return (
    <>

      <Box  sx={{  width: '700px', position: 'relative', perspective: '1000px' }}>

        <Box sx={{  p: 5, borderRadius: 5, width: '700px', height: '600px', position: 'relative',  transformStyle: 'preserve-3d', transform: 'rotateY(-5deg)' }}>

          {/* <Box sx={{ bgcolor: '#F6F6FE', width: '250px', p: 3, borderRadius: 3, height: '100%', }}>

            {nums.map((num) => (



              <motion.div
                viewport={{ once: true }}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: .3, delay: num['id'] / 10 }}
                className='motionItem'
                key={num['id']} >
                <Box sx={{ display: 'flex', gap: 2, my: 3 }}>

                  <Box sx={{ borderRadius: '50%', width: '20px', height: '20px', bgcolor: 'blue' }}> </Box>
                  <Box sx={{ borderRadius: '10px', width: num['width'], height: '20px', bgcolor: '#D2D5EE' }}> </Box>

                </Box>
              </motion.div>

            ))}

          </Box> */}


          <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: 2, right: '5%', top: '10%', zIndex: 2 }}>
            <TinyChart />
            <TinyStat />
          </Box>

        </Box>

      </Box>
    </>
  )
}

export default FakeDashboard