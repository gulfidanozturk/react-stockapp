import React, { useState } from 'react'
import {Avatar, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../../store/uiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop)=> prop !=='open'})
(({theme, open})=>({
  zIndex: theme.zIndex.drawer+1, 
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp, 
    duration: theme.transitions.enteringScreen
  }), 
  ...(open&&{
    width: `calc(100% - ${drawerWidth}px)`, 
    marginLift: drawerWidth, 
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp, 
      duration: theme.transitions.leavingSceen
    }),
  })
}))


const Header = () => {

  const currentUser = useSelector(state=> state.auth.currentUser)
  const sidebarOpen = useSelector(state=> state.ui.sidebarOpen);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <AppBar open={sidebarOpen} position="absolute">
        <Toolbar sx={{pr:'24px'}}>
          <IconButton size="large" edge="start" color="inherit" sx={{mr:2}} 
          onClick={()=> dispatch(uiActions.toggleMenu())}
          >
              <MenuIcon/>
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow:1}} style={{ fontFamily:'Pathway Extreme' }}
    >
      <FontAwesomeIcon icon={faStar} />
      {' Stock App '}
      <FontAwesomeIcon icon={faStar} />
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" 
          noWrap 
          sx={{cursor:'pointer'}}
           onClick={(e)=> setAnchorEl(e.currentTarget)}
          > 
            {currentUser&& <Avatar alt={currentUser.toUpperCase()} src="/broken-image.jpg"/>}
          </Typography>
          {currentUser && (
            <Menu 
              anchorEl={anchorEl}
              open={Boolean(anchorEl)} anchorOrigin={{vertical:'top', horizontal:'right'}}
              keepMounted
              transformOrigin={{vertical:'top', horizontal:'right'}}
              onClose={()=> setAnchorEl(null)}
            >
              <MenuItem onClick={()=> dispatch(logout(navigate))}> Logout</MenuItem>
            </Menu>
          )}
        </Toolbar>
    </AppBar>
  )
}

export default Header