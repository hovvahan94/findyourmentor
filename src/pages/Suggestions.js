import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../redux/actions';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort } from '../utils/sort';


function Suggestions({ department }) {
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [page, setPage] = useState(0);
    const [headData, setheadData] = useState([]);
    const [dense, setDense] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [suggestions, setSuggestions] = useState([]);
    let currentUserDepartment = '';

    const employers = useSelector(state => state.employers.employers)
    const curentUserEmail = useSelector(state => state.firebase.auth.email);

    const dispatch = useDispatch();

    const collectHeadData = (data) => {
        let result = [];
        for (let key in data) {
            result.push(key)
        }

        setheadData(result);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    useEffect(() => {
        function fetchEmployers() {
            const database = firebase.database();
            const employers = database.ref().child('employers');



            employers.get().then((snapshot) => {
                if (snapshot.exists()) {
                    collectHeadData(snapshot.val()[0]);
                    if(curentUserEmail)
                    {
                        const currentUser = snapshot.val().find(data => data.email == curentUserEmail)
                        currentUserDepartment = currentUser.department;
                    }
                    else
                    {
                        currentUserDepartment = department;
                    }

                    
                    let arr = snapshot.val().slice();
                
                    setSuggestions(arr.filter(data => data.department === currentUserDepartment && data.email !== curentUserEmail))
                } else {
                    setSuggestions(null)
                }
            }).catch(function (error) {
                console.error(error);
            });
        }

        fetchEmployers()
    }, [])

    const classes = useStyles();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, suggestions.length - page * rowsPerPage);

    return (
        <>
            <Backdrop className={classes.backdrop} open={suggestions.length === 0}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {suggestions !== null ? <Paper className={classes.paper}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" size='medium'>
                        <TableHead>
                            <TableRow>
                                {headData.map(data => <TableCell
                                    key={data}
                                    align='left'
                                    padding='none'
                                    sortDirection={orderBy === data ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === data}
                                        direction={orderBy === data ? order : 'asc'}
                                        onClick={createSortHandler(data)}
                                    >
                                        {data}
                                        {orderBy === data ? (
                                            <span className={classes.visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suggestions !== undefined && stableSort(suggestions, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    {Object.keys(row).map(data => <TableCell key={data} align="left">{row[data]}</TableCell>)}
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10, 25]}
                    count={suggestions.length}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper> : <div>NO DATA</div>}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    root1: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));

export default Suggestions
