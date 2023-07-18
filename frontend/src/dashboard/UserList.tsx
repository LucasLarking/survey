import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetInteraction from '../interaction/hooks/useGetInteraction';
import useGetSurveyUsers from './hooks/useGetSureyUsers';
import useRemoveUserFromSurvey from './hooks/useRemoveUserFromSurvey';

const UserList = () => {
    const { slug } = useParams();
    const survey_id = parseInt(slug!);
    const getInteraction = useGetInteraction(survey_id)
    const { data: users, error, isLoading } = useGetSurveyUsers(survey_id);
    const removeUser = useRemoveUserFromSurvey(1)
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (isLoading) return <p></p>
    if (error) return <p>error</p>


    return (
        <Box>

            <Typography variant='h4' sx={{ color: 'secondary.main', mb: 3 }}>Respondants</Typography>
            <Table sx={{ bgcolor: 'primary.light', color: 'white' }}>
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                    <TableRow>

                        {isLargeScreen && (
                            <>

                                <TableCell sx={{ color: 'secondary.main', fontWeight: 700, }}>Username</TableCell>
                                <TableCell sx={{ color: 'secondary.main', fontWeight: 700, }} >Name</TableCell>
                                <TableCell sx={{ color: 'secondary.main', fontWeight: 700, }}>Email</TableCell>
                            </>
                        )}

                        {!isLargeScreen && <TableCell sx={{ color: 'secondary.main', fontWeight: 700, }}>User</TableCell>}
                   <TableCell sx={{ color: 'secondary.main', fontWeight: 700, }} align="right">Handle Submission</TableCell>


                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            {isLargeScreen && (
                                <>
                                    <TableCell sx={{ color: 'white' }}>{user.username}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{user.first_name} {user.last_name}</TableCell>
                                    <TableCell sx={{ color: 'white' }} >{user.email}</TableCell></>
                            )}
                            {!isLargeScreen && <TableCell sx={{ color: 'white' }}>{user.username} - {user.email}</TableCell>}
                            
                            <TableCell sx={{ color: 'white' }} align="right">
                                <Tooltip title="Delete" color='inherit'>
                                    <IconButton aria-label="delete" color="inherit" onClick={() => {
                                        removeUser.mutate({
                                            id: user.id,
                                            username: user.username,
                                            first_name: user.first_name,
                                            last_name: user.last_name,
                                            password: '',
                                            email: user.email
                                        },
                                            {
                                                onSuccess: (interaction) => {
                                                    if (interaction) {
                                                        console.log('aaaaa', interaction)

                                                    }

                                                },
                                                onError: () => { }
                                            })
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View" >
                                    <IconButton color="inherit" onClick={() => {
                                        getInteraction.mutate({
                                            id: user.id,
                                            username: 'string',
                                            password: 'string',
                                            email: 'string',
                                            first_name: 'string',
                                            last_name: 'string',
                                        }, {
                                            onSuccess: (interaction) => {
                                                console.log('red', interaction)
                                                // navigate(`/response/${interaction_obj?.id}`)
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
        </Box>
    )
}

export default UserList

