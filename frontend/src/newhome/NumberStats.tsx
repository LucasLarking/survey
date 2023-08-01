import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import NumberStat from './NumberStat'
import { motion } from 'framer-motion'

const NumberStats = () => {
  const stats = [
    { 'id': 0, 'num': 95, 'caption': 'asdasdasd', 'unit': '%' },
    { 'id': 1, 'num': 25, 'caption': 'asdasdasd', 'unit': '' },
    { 'id': 2, 'num': 40, 'caption': 'asdasdasd', 'unit': '%' },
    { 'id': 3, 'num': 1, 'caption': 'asdasdasd', 'unit': 'M' },
  ]
  return (
    <>

        <Box sx={{ bgcolor: 'white', }}>

          <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-evenly', py: 10 }}>
            {stats.map((stat) => (
              <Box key={stat['id']} sx={{ width: '110px' }}>
                <NumberStat num={stat['num']} caption={stat['caption']} unit={stat['unit']} />

              </Box>
            ))}
          </Container>
        </Box>

    </>
  )
}

export default NumberStats