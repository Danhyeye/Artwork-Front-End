import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {useEffect} from "react";
import {RevenuesService} from "../../services/RevenuesService";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits({label,total}) {

    return (
        <React.Fragment>
            <Title>{label}</Title>
            <Typography component="p" variant="h4">
                ${total}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {
                    format(new Date(), "'ngày' d 'tháng' M', năm' yyyy", { locale: vi })
                }
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Xem chi tiết
                </Link>
            </div>
        </React.Fragment>
    );
}
