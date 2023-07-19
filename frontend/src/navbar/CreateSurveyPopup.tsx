import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import SurveyForm from '../survey/SurveyForm'
import AddIcon from '@mui/icons-material/Add';
const CreateSurveyPopup = () => {
    const [open, setOpen] = useState(false)
    return (
        <>

            <IconButton aria-label="create" color="secondary" onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>



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