import React, { useContext } from 'react';
import '../styles/App.scss';
import clsx from 'clsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/* import components */
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import reactStyles from '../helpers/react-styles';

/* Custom Components */
import SkillDashboard from './SkillDashboard';
import Home from "./Home";
import Team from "./Team";
import Recommend from "./Recommend";
import Report from "./Report";
import Skills from "./Skills";

/* import icons */
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ShareIcon from '@material-ui/icons/Share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import { authContext } from '../providers/AuthProvider';


const useStyles = reactStyles;

export default function Application() {
  document.title = "Lifelong learning";
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { first_name, last_name, position } = useContext(authContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className='tool-bar'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div className='website-info-container'>
              
              <img alt="logo" src="images/LLogo.svg" height />
            
              {/* <Typography variant="h4" noWrap id='website-logo'> Life Long Learning</Typography> */}
              <div className='user-container'>
                <div className='user-info-container'>
                  <Typography noWrap align='right' id='user-name'>{first_name+' '+last_name}</Typography>
                  <Typography noWrap align='right' id='user-position'>{position}</Typography>
                </div>
                <FontAwesomeIcon id='user-icon' icon={faUserAstronaut} size="3x"/>
              </div>
            </div>

          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/">
              <ListItem className={classes.list}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText disableTypography className='tab-item' primary='Home'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/report">
              <ListItem>
                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                <ListItemText disableTypography className='tab-item' primary='Report'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/recommend">
              <ListItem>
                <ListItemIcon><ShareIcon /></ListItemIcon>
                <ListItemText disableTypography className='tab-item' primary='Recommend'></ListItemText>
              </ListItem>
              </Link>
              <Link to="/allSkills">
              <ListItem>
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                <ListItemText  disableTypography className='tab-item' primary='All Skills'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/team">
              <ListItem>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText disableTypography className='tab-item' primary='Team'></ListItemText>
              </ListItem>
            </Link>
              <Divider />
          </List>
        </Drawer>

        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Switch>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/skill">
              <SkillDashboard />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/allSkills">
              <Skills/>
            </Route>
            <Route path="/recommend">
              <Recommend />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

