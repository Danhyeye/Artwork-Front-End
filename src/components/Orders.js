import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { OrdersThunk } from "../features/orders/OrdersThunk";
import Grid from "@mui/material/Grid";
import { Navigate } from "react-router-dom";

const createData = (id, name, date, amount) => {
    return { id, name, date, amount };
};

const rows = [
    createData('1', 'Order 001', '24/03/2024', '$200.00'),
    createData('2', 'Order 002', '25/03/2024', '$150.00'),
    // Thêm dữ liệu đơn hàng ở đây
];

const OrderList = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users?.value);
    const orders = useSelector(state => state.orders?.value || [])
    console.log("orders", orders)

    useEffect(() => {
        if (user && user?.id) dispatch(OrdersThunk.getAllOrders(user?.id))
    }, [])

    if (!user || !user.id) return <Navigate to={'/login'} />
    return (
        <Box sx={{
            margin: 'auto',
            display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4,
            mt: 8,
            maxWidth: 1200, // Giới hạn chiều rộng tối đa, giúp căn giữa khi kết hợp với margin
            borderRadius: '16px', // Làm tròn góc
            boxShadow: '1px 4px 12px rgba(0, 0, 0, 0.08)', // Thêm box shadow
            overflow: 'hidden', // Ẩn overflow để bảo toàn border radius với thành phần con
        }}>
            <TableContainer
            >
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>List of orders</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Customer</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="center">Zip</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <RowComponent key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

function RowComponent({ row }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{`${row.first_name} ${row.last_name}`}</TableCell>
                <TableCell align="left">{row.address_line_1 || row.address_line_2}</TableCell>
                <TableCell align="center">{row.postal_code}</TableCell>
                <TableCell align="right">{row.total_price}$</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order details
                            </Typography>
                            <Grid container spacing={2}>
                                {row.order_details.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="subtitle1">{item.title}</Typography>
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 100,
                                                    width: 100,
                                                    borderRadius: '5%',
                                                    marginBottom: 1
                                                }}
                                                alt={item.title}
                                                src={item.src}
                                            />
                                            <Typography variant="body1">Price: ${item.price}</Typography>
                                            <Typography variant="body2" color="text.secondary">Seller: {item.firstname + " " + item.lastname}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default OrderList;
