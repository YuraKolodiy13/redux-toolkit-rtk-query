import React from "react";
import {BrowserRouter, Route, Routes, Navigate, NavLink} from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import Faq from "./pages/Faq";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import './App.scss';
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const navItems = ['posts', 'users'];
const settings = ['Profile', 'Logout'];

function App() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <NavLink to='/' end>Home</NavLink>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <NavLink to={`/${item}`} key={item}>
                  {item}
                </NavLink>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
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
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Routes>
            <Route path='/' element={<Navigate replace to="/posts" />} />
            <Route path='/posts' element={<Posts/>} />
            <Route path='/posts/:id' element={<SinglePost/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/users/:id' element={<User/>} />
            <Route path='/faq' element={<Faq/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
