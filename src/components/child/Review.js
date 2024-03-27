import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review({ order, price, tax }) {
    const payments = [
        { name: 'Card type:', detail: order.detail },
        { name: 'Card holder:', detail: 'Mr. John Smith' },
        { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
        { name: 'Expiry date:', detail: '04/2024' },
    ];
    return (
        <Stack spacing={2}>
            <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Products" secondary="4 selected" />
                    <Typography variant="body2">{price}$</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="VAT" secondary="Plus taxes" />
                    <Typography variant="body2">{tax}$</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {order.total_price}$
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <Stack
                direction="column"
                divider={<Divider flexItem />}
                spacing={2}
                sx={{ my: 2 }}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>{order.first_name} {order.last_name}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {order.address_line_1 || order.address_line_2}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {order.card_number &&
                            <>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Card type
                                    </Typography>
                                    <Typography variant="body2">VISA</Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Card holder
                                    </Typography>
                                    <Typography variant="body2">{order.card_name}</Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        CVV
                                    </Typography>
                                    <Typography variant="body2">{order.cvv}</Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Card number
                                    </Typography>
                                    <Typography variant="body2">{order.card_number}</Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: '100%', mb: 1 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        Expiry date
                                    </Typography>
                                    <Typography variant="body2">{order.expiry_date}</Typography>
                                </Stack>
                            </>
                        }

                    </Grid>
                </div>
            </Stack>
        </Stack>
    );
}
