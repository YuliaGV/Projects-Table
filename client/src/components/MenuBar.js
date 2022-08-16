import * as React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Logo from '../img/Logo.png'


const pages = [    
    { text: 'Home', href: '/' },
    { text: 'Proyectos', href: '/projects' }
  ]

const settings = [
    { text: 'Login', href: '/login' },
    { text: 'Register', href: '/register' }
]



function MenuBar({ currentElement}) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  


    return (
        <AppBar position="static" style={{ background: '#132f4c' }}>
            <Container maxWidth="xl">

                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                    
                    <Link key={page.text} to={page.href}>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" style={page.text === currentElement ? {color: '#5090D3'}:{}}> {page.text}</Typography>
                        </MenuItem>
                    </Link>
                    ))}

                    </Menu>
                </Box>
            
                <Box
                    component="img"
                    alt="Projects Table"
                    sx={{
                        mr: { xs: 0, md:2},
                    }}
                    src={Logo}
                    />


                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    {pages.map((page) => (
                    <Link key={page.text} to={page.href}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            style={page.text === currentElement ? {color: '#5090D3'}:{}}
                        >
                            {page.text}
                        </Button>
                    </Link>
                    ))}



                </Box>

                <Box>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                
                    {settings.map((setting) => (
                    <Link key={setting.text} to={setting.href}>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{setting.text}</Typography>
                        </MenuItem>
                    </Link>
                    ))}



                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    
    )

}

export default MenuBar