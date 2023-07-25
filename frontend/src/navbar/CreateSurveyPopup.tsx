import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import SurveyForm from '../survey/SurveyForm'
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
const CreateSurveyPopup = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .2, delay: .5 }}>

                <IconButton aria-label="create" color="secondary" onClick={() => setOpen(true)}>
                    <AddIcon />
                </IconButton>


            </motion.div>


            <Dialog onClose={() => { setOpen(false) }} open={open} >

                <DialogTitle variant='h5' sx={{ color: 'secondary.dark', px: '50px', pt: '40px' }}>Create Survey</DialogTitle>
                <DialogContent sx={{ width: '500px', px: '50px', pb: '40px' }}>
                    <SurveyForm />
                    {/* <TextField autoFocus label="Survey Name" fullWidth variant="standard" /> */}
                </DialogContent>

            </Dialog>
        </>
    )
}

export default CreateSurveyPopup