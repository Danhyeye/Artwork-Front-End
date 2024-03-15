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
import Grid from "@mui/material/Grid";
import { OrdersService } from "../../services/OrdersService";


const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        (async () => {
            const orders = await OrdersService.get()
            setOrders(orders || [])
        })()
    }, [])

    return (

        <TableContainer
        >
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>Danh sách đơn hàng</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Tên khách hàng</TableCell>
                        <TableCell align="left">Địa chỉ</TableCell>
                        <TableCell align="center">Thành phố</TableCell>
                        <TableCell align="center">Mã vùng</TableCell>
                        <TableCell align="center">Mã bưu điện</TableCell>
                        <TableCell align="center">Quốc tịch</TableCell>
                        <TableCell align="center">Tổng Tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <RowComponent key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.postal_code}</TableCell>
                <TableCell align="center">{row.country}</TableCell>
                <TableCell align="center">{row.total_price}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết đơn hàng
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
                                            <Typography variant="body1">Giá: ${item.price}</Typography>
                                            <Typography variant="body2" color="text.secondary">Người bán: {`${row.first_name} ${row.last_name}`}</Typography>
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

export default Orders;
