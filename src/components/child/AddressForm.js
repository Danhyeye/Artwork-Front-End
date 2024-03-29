import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useSelector } from "react-redux";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function AddressForm({ order, onChangeOrder }) {
    const user = useSelector(state => state.users?.value);
    const isFormFilled = () => {
        return order.first_name && order.last_name && order.address_line_1 && order.city && order.state && order.zip && order.country;
    };
    return (
        <div>
            <Grid container spacing={3}>
                <FormGrid item xs={12} md={6}>
                    <FormLabel htmlFor="first-name" required>
                        First name
                    </FormLabel>
                    <OutlinedInput
                        id="first-name"
                        name="first-name"
                        type="text" // Type should be 'text' instead of 'name'
                        placeholder={user?.first_name}
                        autoComplete="first name"
                        value={order.first_name}
                        onChange={(e) => onChangeOrder(prev => ({ ...prev, first_name: e.target.value }))}
                        required
                    />
                </FormGrid>
                <FormGrid item xs={12} md={6}>
                    <FormLabel htmlFor="last-name" required>
                        Last name
                    </FormLabel>
                    <OutlinedInput
                        id="last-name"
                        name="last-name"
                        type="text" // Type should be 'text' instead of 'last-name'
                        onChange={(e) => onChangeOrder(prev => ({ ...prev, last_name: e.target.value }))}
                        placeholder={user?.last_name}
                        autoComplete="last name"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={12}>
                    <FormLabel htmlFor="address_line_1" required>
                        Address line 1
                    </FormLabel>
                    <OutlinedInput
                        id="address_line_1"
                        name="address_line_1"
                        type="text" // Type should be 'text' instead of 'address_line_1'
                        value={order.address_line_1}
                        onChange={e => onChangeOrder(prev => ({ ...prev, address_line_1: e.target.value }))}
                        placeholder="Street name and number"
                        autoComplete="shipping address-line1"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={12}>
                    <FormLabel htmlFor="address_line_2">Address line 2</FormLabel>
                    <OutlinedInput
                        id="address_line_2"
                        name="address_line_2"
                        type="text" // Type should be 'text' instead of 'address_line_2'
                        value={order.address_line_2}
                        onChange={e => onChangeOrder(prev => ({ ...prev, address_line_2: e.target.value }))}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        autoComplete="shipping address-line2"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel htmlFor="city" required>
                        City
                    </FormLabel>
                    <OutlinedInput
                        id="city"
                        name="city"
                        type="text" // Type should be 'text' instead of 'city'
                        value={order.city}
                        onChange={e => onChangeOrder(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Ho Chi Minh"
                        autoComplete="City"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel htmlFor="state" required>
                        State
                    </FormLabel>
                    <OutlinedInput
                        id="state"
                        name="state"
                        type="text" // Type should be 'text' instead of 'state'
                        value={order.state}
                        onChange={e => onChangeOrder(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="Ho Chi Minh"
                        autoComplete="State"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel htmlFor="zip" required>
                        Zip / Postal code
                    </FormLabel>
                    <OutlinedInput
                        id="zip"
                        name="zip"
                        type="text" // Type should be 'text' instead of 'zip'
                        value={order.zip}
                        onChange={e => onChangeOrder(prev => ({ ...prev, zip: e.target.value, postal_code: e.target.value }))}
                        placeholder="700000"
                        autoComplete="shipping postal-code"
                        required
                    />
                </FormGrid>
                <FormGrid item xs={6}>
                    <FormLabel htmlFor="country" required>
                        Country
                    </FormLabel>
                    <OutlinedInput
                        id="country"
                        name="country"
                        type="text" // Type should be 'text' instead of 'country'
                        placeholder="Viet Nam"
                        autoComplete="shipping country"
                        value={order.country}
                        onChange={e => onChangeOrder(prev => ({ ...prev, country: e.target.value }))}
                        required
                    />
                </FormGrid>
            </Grid>
            {!isFormFilled() &&
                <div style={{ color: 'red', marginTop: '10px' }}>Please fill in all required fields</div>
            }
        </div>
    );
}
