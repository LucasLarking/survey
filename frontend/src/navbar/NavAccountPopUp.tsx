import React, { useState } from 'react'
import { AccountCircle, Logout } from '@mui/icons-material';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const NavAccountPopUp = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <motion.div
            viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .2, delay: .5 }}>


                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={(e) => { setAnchorEl(e.currentTarget); setOpen(!open); }}
                >
                    <AccountCircle />
                </IconButton>
            </motion.div>

            <Menu open={open} anchorEl={anchorEl} onClose={() => { setAnchorEl(null); setOpen(false) }}>
                <MenuItem sx={{ px: 3, }} onClick={() => { localStorage.removeItem('access'); localStorage.removeItem('refresh'); localStorage.removeItem('username'); navigate('/') }}>

                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout</MenuItem>
            </Menu>
        </>
    )
}

export default NavAccountPopUp