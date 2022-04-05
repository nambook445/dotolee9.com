import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//axios
import axios from 'axios';
// utils
import { SERVER } from '../../utils/domain';

export default function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { isLogin } = useSelector((state) => state.isLogined);
  const { user } = useSelector((state) => state.userData);

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
    }
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function LoginButton() {
    function handleLogin() {
      navigate('login', { replace: true });
    }
    return (
      <Button fullWidth color="inherit" variant="outlined" onClick={handleLogin}>
        Login
      </Button>
    );
  }

  function LogoutButton() {
    async function handleLogout() {
      await axios
        .get(`${SERVER}/user/logout`, {
          withCredentials: true
        })
        .then(
          dispatch({
            type: 'LOGIN',
            isLogin: false
          }),
          dispatch({
            type: 'USER',
            user: {
              id: '',
              username: '',
              nickname: '',
              image: ''
            }
          })
        )
        .catch((err) => console.log(err.response))
        .then(navigate('app', { replace: true }));
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
        {isLogin ? (
          <Avatar src={`${SERVER}/images/profile/${user.image}`} alt="photoURL" />
        ) : (
          <Avatar src="" alt="photoURL" />
        )}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {isLogin ? (
            <Typography variant="subtitle1" noWrap>
              {user.username}
            </Typography>
          ) : (
            <Typography variant="subtitle1" noWrap>
              비회원
            </Typography>
          )}
          {isLogin ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user.nickname}
            </Typography>
          ) : (
            <Typography variant="subtitle1" noWrap></Typography>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        {(isLogin ? MENU_OPTIONS : []).map((option) => (
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
