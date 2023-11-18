
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Container, FormControl, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const pages = [
  {
    pageName: 'Dashboard',
    pageLink: '/',
    pageIcon: <DashboardIcon/>
  },
  {
    pageName: 'Accounts',
    pageLink: '/Accounts',
    pageIcon: <AccountBalanceWalletIcon/>
  },
  {
    pageName: 'Paypal',
    pageLink: '/Paypal',
    pageIcon: <AttachMoneyIcon/>
  },
  {
    pageName: 'Reports',
    pageLink: '/Reports',
    pageIcon: <DescriptionIcon/>
  },
  {
    pageName: 'Advisor',
    pageLink: '/Advisor',
    pageIcon: <PersonIcon/>
  },
  {
    pageName: 'Contacts',
    pageLink: '/Contacts',
    pageIcon: <ContactsIcon/>
  },
]


const SideBar = (props) => {
const currentPath = window.location.pathname
 // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
          <div className='flex items-center font-extrabold text-xl'>
            <img src='/images/Assiduus_TM_Logo-1.png' className='w-full h-12  xs:invisible' />           
          </div>
      </Toolbar>
      
      <Divider />
      <List>
        {pages.map((p, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton 
            sx={{
              backgroundColor: p.pageLink === currentPath ? '#47b747' : 'transparent',
              color: p.pageLink === currentPath ? '#fff' : 'inherit',
            }}
            >
              <ListItemIcon>
                {p.pageIcon}
              </ListItemIcon>
              <ListItemText  sx={{ opacity: open ? 1 : 0}} ><a href={p.pageLink}>{p.pageName}</a></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  //const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        <div className="flex flex-row flex-1 justify-end items-center text-black">
            <div className="mx-2">                
                <FormControl sx={{ width: '25ch', height: '20px'}}>
                    <OutlinedInput
                      placeholder="Search"
                      startAdornment={<SearchIcon position='start' />}
                    />
              </FormControl>
            </div>
            <div className='mx-4'>
              <NotificationsIcon />
            </div>
            <div className='flex flex-row items-center mx-4'>
            <img src='/images/hero-image-1.png' className='border shadow-lg w-10 h-10 rounded-full' alt='profile img' />
                <ArrowDropDownIcon/>
            </div>
          </div>  
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="lg" style={{ marginTop: "5%"}}>
        {props.children}    
        
        </Container>    
      </Box>
    </Box>
  );
}

export default SideBar;
