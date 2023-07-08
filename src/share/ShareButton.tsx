import React, { useState } from 'react'
import ShareBox from './ShareBox'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material'
import Email from './Email'
import { useParams } from 'react-router-dom'

const ShareButton = () => {
    const [showShareBox, setShowShareBox] = useState<boolean>(false)
    const [value, setValue] = React.useState(0);
    const { slug } = useParams();
    const survey_id = parseInt(slug!);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>

            <button onClick={(e) => { setShowShareBox(true) }}>
                Send
            </button>
            <Dialog open={showShareBox} onClose={() => setShowShareBox(false)} >
                <DialogTitle sx={{}} >Share Survey</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <Box>

                        <Tabs value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 5 }} >
                            <Tab label="Link" />
                            <Tab label="Email" />
                        </Tabs>
                        <Box sx={{ minHeight: 100 }} hidden={value !== 0}>
                            <Typography variant='h6'>Link</Typography>

                            <Tooltip title="Copy And Send To Your Friends" arrow>
                                <TextField
                                    fullWidth

                                    defaultValue={`http://localhost:5173/take/${survey_id}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="standard"
                                />
                            </Tooltip>

                        </Box>
                        {value == 1 && <Email />}


                    </Box>
                    {/* <DialogContentText>Do you want to share</DialogContentText> */}
                </DialogContent>
                <DialogActions sx={{}}>
                    <Button onClick={() => setShowShareBox(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ShareButton