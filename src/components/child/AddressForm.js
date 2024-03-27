import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import {styled} from '@mui/system';
import {useSelector} from "react-redux";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function AddressForm({order, onChangeOrder}) {
    const user = useSelector(state => state.users?.value);
    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder={user?.first_name || "Nhập họ của bạn"}
                    autoComplete="first name"
                    value={order.first_name}
                    onChange={(e) => onChangeOrder(prev => ({...prev, first_name: e.target.value}))}
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
                    type="last-name"
                    onChagne={e => onChangeOrder(prev => ({...prev, last_name: e.target.value}))}
                    placeholder={user?.last_name || "Nhập tên của bạn"}
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
                    type="address_line_1"
                    value={order.address_line_1}
                    onChange={e => onChangeOrder(prev => ({...prev, address_line_1: e.target.value}))}
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
                    type="address_line_2"
                    value={order.address_line_2}
                    onChange={e => onChangeOrder(prev => ({...prev, address_line_2: e.target.value}))}
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
                    type="city"
                    value={order.city}
                    onChange={e => onChangeOrder(prev => ({...prev, city: e.target.value}))}
                    placeholder="TP. Hồ Chí Minh"
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
                    type="state"
                    value={order.state}
                    onChange={e => onChangeOrder(prev => ({...prev, state: e.target.value}))}
                    placeholder="NY"
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
                    type="zip"
                    value={order.zip}
                    onChange={e => onChangeOrder(prev => ({...prev, zip: e.target.value, postal_code: e.target.value}))}
                    placeholder="12345"
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
                    type="country"
                    placeholder="Việt Nam"
                    autoComplete="shipping country"
                    value={order.country}
                    onChange={e => onChangeOrder(prev => ({...prev, country: e.target.value}))}
                    required
                />
            </FormGrid>
        </Grid>
    );
}
