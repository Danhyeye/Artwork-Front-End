import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Header.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/UsersSlice";
import Box from "@mui/material/Box";
import { Alert, Badge, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { TopicsThunk } from '../features/topics/TopicsThunk';
import { ArtworksThunk } from '../features/artworks/ArtworksThunk';
import Snackbar from "@mui/material/Snackbar";
import { NoticeService } from "../services/NoticeService";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { stringAvatar } from "../utils/string";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = ({ badgeCount }) => {
    const location = useLocation();
    const shouldShowHeader = !['/login', '/signup'].includes(location.pathname);

    const user = useSelector((state) => state.users?.value);
    const [notices, setNotices] = useState([]);
    const dispatch = useDispatch();

    const isLogged = user && user.id;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleToProfile = () => navigate('/profile');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorElNotice, setAnchorElNotice] = React.useState(null);
    const openNotice = Boolean(anchorElNotice);
    const handleClickNotice = (event) => {
        setAnchorElNotice(event.currentTarget);
    };
    const handleCloseNotice = () => {
        setAnchorElNotice(null);
    };


    const handleLogout = () => {
        handleClose();
        dispatch(logout());
    }
    const topics = useSelector((state) => state.topics.value);

    useEffect(() => {

        (async () => {
            if (!user || !user?.id) return;
            const notices = await NoticeService.getNotice(user.id)
            setNotices(notices)
        })()
        dispatch(TopicsThunk.getAllTopics())
    }, [])

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const [openAlert, setOpenAlert] = useState(false);
    const handleCartClick = () => {
        if (!isLogged) {
            setOpenAlert(true);
        } else {
            navigate("/cart");
        }
    };
    const handleOrdersClick = () => {
        if (!isLogged) {
            setOpenAlert(true);
        } else {
            navigate("/orders");
        }
    };

    return shouldShowHeader ? (<div className="navbar">
        <div className="logo-bar">
            <Link to={'/home'}>
                <img className="logo" src="./assets/images/ACATSUKI.png" alt="logo" />
            </Link>
            <Link to={'/home'}>
                <button className="home" alt="home">
                    Home
                </button>
            </Link>
            <Link to={'/upload'}>
                <button className="create" alt="create">
                    Create
                </button>
            </Link>
        </div>
        <div className="search-bar">
            <Stack spacing={2} sx={{ width: 800, alignContent: 'center', p: 1.5 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    onInputChange={(event, value, reason) => {
                        dispatch(ArtworksThunk.getArtworkbyName(value))
                    }}
                    disableClearable
                    options={topics.map((topic) => topic.name)}
                    renderInput={(params) => (<TextField
                        {...params}
                        label={<SearchIcon />}
                        InputProps={{
                            ...params.InputProps, type: 'search', sx: {
                                borderRadius: 10,
                            },
                        }}
                    />)}
                />
            </Stack>
        </div>
        <div className="info">
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: '10px' }}>
                <button className='btn-nofi'>
                    <Badge color="secondary" badgeContent={notices.length} showZero onClick={handleClickNotice}>
                        <NotificationsActiveIcon />
                    </Badge>
                </button>
                <Menu
                    anchorEl={anchorElNotice}
                    id="account-menu"
                    open={openNotice}
                    onClose={handleCloseNotice}
                    onClick={handleCloseNotice}
                    PaperProps={{
                        elevation: 0, sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32, height: 32, ml: -0.5, mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {notices.length > 0 ? notices.map((notice) => (<>
                        <MenuItem onClick={handleCloseNotice}>
                            <div className="multiLineEllipsis" style={{
                                width: '240px'
                            }}>
                                {notice.content}
                            </div>
                        </MenuItem>
                        <Divider />
                    </>)) : <>
                        <MenuItem onClick={handleCloseNotice}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Bạn chưa có thông báo nào
                        </MenuItem>
                    </>}
                </Menu>

                {
                    user.role === "ADMIN" && (
                        <Link to={isLogged ? "/admin" : "#"} onClick={handleCartClick}>
                            <button className='btn-chat'>
                                <Badge color="secondary" showZero>
                                    <AdminPanelSettingsIcon />
                                </Badge>
                            </button>
                        </Link>
                    )
                }

                <Link to={isLogged ? "/cart" : "#"} onClick={handleCartClick}>
                    <button className='btn-chat'>
                        <Badge color="secondary" showZero>
                            <ShoppingBagIcon />
                        </Badge>
                    </button>
                </Link>

                <Link to={isLogged ? "/orders" : "#"} onClick={handleOrdersClick}>
                    <button className='btn-chat'>
                        <Badge color="secondary" showZero>
                            <SubscriptionsIcon />
                        </Badge>
                    </button>
                </Link>
                {user.username ? <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar {...stringAvatar(user?.first_name + " " + user?.last_name)}
                            sx={{
                                width: 40, height: 40, fontSize: 18, m: 2
                            }} />
                    </IconButton>
                </Tooltip> : <Link to={"/login"}>
                    <button className='login'>Login</button>
                </Link>}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0, sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32, height: 32, ml: -0.5, mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box onClick={handleToProfile}>
                        <MenuItem onClick={handleClose}>'
                            <Avatar /> {user.first_name + " " + user.last_name}
                        </MenuItem>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top', horizontal: 'left',
                }}
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="warning">
                    Vui lòng đăng nhập để có thể thực hiện chức năng này
                </Alert>
            </Snackbar>
        </div>
    </div>) : null;
};

export default Header;
