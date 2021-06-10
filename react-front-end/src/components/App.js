import React, { Component } from 'react';
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
import HomeDashboard from './HomeDashboard'
import SignUp from './SignUp';
import Team from "./Team";
import Recommend from "./Recommend";
import Report from "./Report";
import Test from "./Test";

/* import icons */
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';


const useStyles = reactStyles;

export default function Application() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
          <Toolbar>
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
            <Typography variant="h6" noWrap> Life Long Learning</Typography>
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
              <ListItem>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Home'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/team">
              <ListItem>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary='Team'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/skill">
              <ListItem>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary='Skill'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/report">
              <ListItem>
                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                <ListItemText primary='Report'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/recommend">
              <ListItem>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Recommend'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/test">
              <ListItem>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Test'></ListItemText>
              </ListItem>
            </Link>
            <Link to="/signup">
              <ListItem>
                <ListItemIcon><LockOpenIcon /></ListItemIcon>
                <ListItemText primary='Sign Up'></ListItemText>
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/skill">
              <SkillDashboard />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/recommend">
              <Recommend />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/">
              <HomeDashboard />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}






/* Template data */
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       message: 'Click the button to load data!'
//     }
//   }

//   fetchData = () => {
//     axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
//     .then((response) => {
//       // handle success
//       console.log(response.data) // The entire response from the Rails API

//       console.log(response.data.message) // Just the message
//       this.setState({
//         message: response.data.message
//       });
//     }) 
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>{ this.state.message }</h1>
//         <button onClick={this.fetchData} >
//           Fetch Data
//         </button>        
//       </div>
//     );
//   }
// }
// export default App;
