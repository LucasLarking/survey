import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../signup/User';
import useRemoveUserFromSurvey from './hooks/useRemoveUserFromSurvey';
import useGetSurveyUsers from './hooks/useGetSureyUsers';
import ErrorPage from '../pages/ErrorPage';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import useGetInteraction from '../interaction/hooks/useGetInteraction';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Interaction } from '../interaction/Interaction';

const UserList = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const getInteraction = useGetInteraction(survey_id)
    const { data: users, error, isLoading } = useGetSurveyUsers(survey_id);
    const removeUser = useRemoveUserFromSurvey(1)


    if (isLoading) return <p></p>
    if (error) return <p>error</p>
    

    return (
        <>

            <Table sx={{ minWidth: 650, bgcolor: '#181a1c', color: 'white' }}>
                <TableHead sx={{ backgroundColor: '#24272a' }}>
                    <TableRow>


                        <TableCell sx={{ color: '#6ceca8', fontWeight: 700, borderBottom: '1px solid #24272a' }}>Username</TableCell>
                        <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }} >Name</TableCell>
                        <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }}>Email</TableCell>
                        <TableCell sx={{ color: '#6ceca8', fontWeight: 700 }} align="right">Handle Submission</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>

                            <TableCell sx={{ color: 'white' }}>{user.username}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{user.first_name} {user.last_name}</TableCell>
                            <TableCell sx={{ color: 'white' }} >{user.email}</TableCell>
                            <TableCell sx={{ color: 'white' }} align="right">
                                <Tooltip title="Delete" color='inherit'>
                                    <IconButton aria-label="delete" color="inherit" onClick={(e) => {
                                        removeUser.mutate({
                                            id: user.id,
                                            username: user.username,
                                            first_name: user.first_name,
                                            last_name: user.last_name,
                                            password: '',
                                            email: user.email
                                        },
                                            {
                                                onSuccess: (res) => {
                                                    // console.log('success', res)
                                                },
                                                onError: (error) => [
                                                    // console.log('error', error)
                                                ]
                                            })
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View" >
                                    <IconButton color="inherit" onClick={(e) => {
                                        getInteraction.mutate({
                                            id: user.id,
                                            username: 'string',
                                            password: 'string',
                                            email: 'string',
                                            first_name: 'string',
                                            last_name: 'string',
                                        }, {
                                            onSuccess: (interaction) => {
                                                // console.log('red', interaction)
                                                // navigate(`/response/${interaction.id}`)
                                            }
                                        })
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>

                        </TableRow>
                    ))}




                </TableBody>
            </Table>
        </>
    )
}

export default UserList

