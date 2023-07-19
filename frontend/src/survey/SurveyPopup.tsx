
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

const SurveyPopup = () => {
    const [open, setOpen] = useState(true)
    return (
        <Dialog onClose={() => { setOpen(false)}} open={open} >
            <DialogTitle variant='h5' sx={{ p: 4, color: 'secondary.dark' }}>Create Survey</DialogTitle>
            <DialogContent sx={{ width: '400px', p: 4 }}>
                <TextField autoFocus label="Survey Name" fullWidth variant="standard" />
            </DialogContent>
            <DialogActions>
                <Button disableElevation variant='contained' sx={{
                    bgcolor: 'secondary.main', color: 'black', '&:hover': {
                        bgcolor: 'secondary.dark',
                        color: 'white'
                    },
                }}>CREATE</Button>

            </DialogActions>
        </Dialog>
    )
}

export default SurveyPopup