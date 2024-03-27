import * as React from 'react';
import {useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import {createTheme, ThemeProvider} from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AddressForm from './child/AddressForm';
import Info from './child/Info';
import InfoMobile from './child/InfoMobile';
import PaymentForm from './child/PaymentForm';
import Review from './child/Review';
import ToggleColorMode from './child/ToggleColorMode';
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ArtworksService} from "../services/ArtworksService";
import FullScreenLoading from "./FullScreenLoading";
import {OrdersService} from "../services/OrdersService";
import {DownloadImgService} from "../services/DownloadImgService";


const steps = ['Shipping address', 'Payment details', 'Review your order'];

const logoStyle = {
    width: '140px',
    height: '56px',
    marginLeft: '-4px',
    marginRight: '-8px',
};

function getStepContent(step, order, handleChangeOrder, totalMoney, tax) {
    switch (step) {
        case 0:
            return <AddressForm order={order} onChangeOrder={handleChangeOrder}/>;
        case 1:
            return <PaymentForm order={order} onChangeOrder={handleChangeOrder}/>;
        case 2:
            return <Review order={order} price={totalMoney} tax={tax}/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({palette: {mode}});
    const [activeStep, setActiveStep] = React.useState(0);

    const [artworks, setArtworks] = React.useState([]);

    const totalMoney = artworks.reduce((total, artwork) => total + artwork.price, 0);
    const tax = totalMoney * 0.2;
    const totalMoneyWithTax = totalMoney + tax;

    useEffect(() => {
        const totalMoney = artworks.reduce((total, artwork) => total + artwork.price, 0);
        const tax = totalMoney * 0.2;
        const totalMoneyWithTax = totalMoney + tax;
        setOrder(prev => ({...prev, total_price: totalMoneyWithTax}))
    }, [artworks])

    const [order, setOrder] = React.useState({
        card_name: '',
        card_number: '',
        cvv: '',
        expiry_date: '',
        total_price: totalMoneyWithTax,
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        artworks: []
    });

    console.log("order", order)

    useEffect(() => {
        if (!user || !user.id) return

        (async () => {
            const response = await ArtworksService.getArtworksByUserId(user.id);
            const artworksSaved = response.map(artwork => ({
                id: artwork.id,
                title: artwork.title,
                price: artwork.price,
                seller_name: user.first_name + " " + user.last_name,
                created_by: artwork.created_by,
            }))
            setArtworks(response);
            setOrder(prev => ({...prev, user_id: user.id, artworks: artworksSaved}));
        })()
    }, []);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [loading, setLoading] = React.useState(false)

    const handleNext = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 2) {
            setLoading(true)
            //call api
            const response = await OrdersService.createOrder(order);
            const imageUrls =  artworks.map(artwork=>artwork.src)
            DownloadImgService.downloadImage(imageUrls);

            setActiveStep(activeStep + 1);
            setLoading(false)
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const user = useSelector((state) => state.users?.value);
    if (!user || !user.id) return <Navigate to={'/login'}/>


    return (
        <ThemeProvider theme={defaultTheme}>
            <FullScreenLoading isOpen={loading}/>
            <CssBaseline/>
            <Grid container sx={{height: {xs: '100%', sm: '100dvh'}}}>
                <Grid
                    item
                    xs={12}
                    sm={5}
                    lg={4}
                    sx={{
                        display: {xs: 'none', md: 'flex'},
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderRight: {sm: 'none', md: '1px solid'},
                        borderColor: {sm: 'none', md: 'divider'},
                        alignItems: 'start',
                        pt: 4,
                        px: 10,
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'end',
                            height: 150,
                        }}
                    >
                        <Button
                            startIcon={<ArrowBackRoundedIcon/>}
                            component="a"
                            href="/"
                            sx={{ml: '-8px'}}
                        >
                            Back to Home page
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: 500,
                        }}
                    >
                        <Info totalPrice={totalMoney} products={artworks}/>
                    </Box>
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={7}
                    lg={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: {xs: 'transparent', sm: 'background.default'},
                        alignItems: 'start',
                        pt: {xs: 2, sm: 4},
                        px: {xs: 2, sm: 10},
                        gap: {xs: 4, md: 8},
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: {sm: 'space-between', md: 'flex-end'},
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: {sm: '100%', md: 600},
                        }}
                    >
                        <Box
                            sx={{
                                display: {xs: 'flex', md: 'none'},
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                startIcon={<ArrowBackRoundedIcon/>}
                                component="a"
                                href="/material-ui/getting-started/templates/landing-page/"
                                sx={{alignSelf: 'start'}}
                            >
                                Back to
                                <img
                                    src={
                                        'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                    }
                                    style={logoStyle}
                                    alt="Sitemark's logo"
                                />
                            </Button>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                height: 150,
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                            <Stepper
                                id="desktop-stepper"
                                activeStep={activeStep}
                                sx={{
                                    width: '100%',
                                    height: 40,
                                }}
                            >
                                {steps.map((label) => (
                                    <Step
                                        sx={{
                                            ':first-child': {pl: 0},
                                            ':last-child': {pr: 0},
                                        }}
                                        key={label}
                                    >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            width: '100%',
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                ':last-child': {pb: 2},
                            }}
                        >
                            <div>
                                <Typography variant="subtitle2" gutterBottom>
                                    Selected products
                                </Typography>
                                <Typography variant="body1">
                                    {totalMoneyWithTax}
                                </Typography>
                            </div>
                            <InfoMobile totalPrice={totalMoney}/>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: {sm: '100%', md: 600},
                            maxHeight: '720px',
                            gap: {xs: 5, md: 'none'},
                        }}
                    >
                        <Stepper
                            id="mobile-stepper"
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{display: {sm: 'flex', md: 'none'}}}
                        >
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        ':first-child': {pl: 0},
                                        ':last-child': {pr: 0},
                                        '& .MuiStepConnector-root': {top: {xs: 6, sm: 12}},
                                    }}
                                    key={label}
                                >
                                    <StepLabel
                                        sx={{'.MuiStepLabel-labelContainer': {maxWidth: '70px'}}}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Stack spacing={2} useFlexGap>
                                <Typography variant="h1">📦</Typography>
                                <Typography variant="h5">Thank you for your order!</Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Your order number is
                                    <strong>&nbsp;#140396</strong>. We have emailed your order
                                    confirmation and will update you once its shipped.
                                </Typography>
                                <Link to={"/orders"}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            alignSelf: 'start',
                                            width: {xs: '100%', sm: 'auto'},
                                        }}
                                    >
                                        Go to my orders
                                    </Button>
                                </Link>

                            </Stack>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, order, setOrder, totalMoney, tax)}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {xs: 'column-reverse', sm: 'row'},
                                        justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                                        alignItems: 'end',
                                        flexGrow: 1,
                                        gap: 1,
                                        pb: {xs: 12, sm: 0},
                                        mt: {xs: 2, sm: 0},
                                        mb: '60px',
                                    }}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon/>}
                                            onClick={handleBack}
                                            variant="text"
                                            sx={{
                                                display: {xs: 'none', sm: 'flex'},
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    )}

                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon/>}
                                            onClick={handleBack}
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                display: {xs: 'flex', sm: 'none'},
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        endIcon={<ChevronRightRoundedIcon/>}
                                        onClick={() => handleNext()}
                                        sx={{
                                            width: {xs: '100%', sm: 'fit-content'},
                                        }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
