import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
// axios
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/profile'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#'
  }
];

export default function AccountPopover() {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);
  console.log('hi', isLogin);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function LoginButton() {
    function handleLogin() {
      document.location = 'http://localhost:3000/login';
    }
    return (
      <Button fullWidth color="inherit" variant="outlined" onClick={handleLogin}>
        Login
      </Button>
    );
  }

  function LogoutButton() {
    async function handleLogout() {
      sessionStorage.removeItem('user');
      await axios
        .get('http://localhost:8080/logout', { withCredentials: true })
        .then(
          dispatch({
            type: 'LOGIN',
            isLogin: false
          })
        )
        .catch((err) => console.log(err.response));
    }
    return (
      <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>{isLogin ? <LogoutButton /> : <LoginButton />}</Box>
      </MenuPopover>
    </>
  );
}
