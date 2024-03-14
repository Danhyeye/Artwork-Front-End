import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
    {
        title: 'Thuế VAT',
        description: 'Thuế VAT 20% trên tổng hóa đơn',
        price: '$15.00',
    },
    {
        title: 'Giá trước thuế',
        description: 'Thuế VAT 20% trên tổng hóa đơn',
        price: '$69.99',
    },
];

function Info({totalPrice, products = products}) {
    const totalMoney = products.reduce((total, artwork) => total + artwork.price, 0);
    const tax = totalMoney * 0.2;
    const totalMoneyWithTax = totalMoney + tax;

    return (
        <React.Fragment>
            <Typography variant="subtitle2" color="text.secondary">
                Tổng tiền cần thanh toán : {totalMoney} cộng 20% thuế VAT
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalMoneyWithTax}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.id} sx={{py: 1, px: 0}}>
                        <ListItemText
                            sx={{mr: 2}}
                            primary={product.title}
                            secondary={product.description}
                        />
                        <Typography variant="body1" fontWeight="medium">
                            {product.price}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

Info.propTypes = {
    totalPrice: PropTypes.string.isRequired,
};

export default Info;
