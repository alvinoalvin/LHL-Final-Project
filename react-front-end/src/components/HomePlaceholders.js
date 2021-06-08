import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Bar Graph goes here</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Line chart goes here</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Pie Graph</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Pie Graph</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Pie Graph</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Pie Graph</Paper>
        </Grid>
      </Grid>
    </div>
  );
}


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: 300,
//     width: 250,
//   },
//   control: {
//     padding: theme.spacing(2),
//   },
// }));

// export default function SpacingGrid() {
//   const [spacing, setSpacing] = React.useState(2);
//   const classes = useStyles();

//   const handleChange = (event) => {
//     setSpacing(Number(event.target.value));
//   };

//   return (
//     <Grid container className={classes.root} spacing={2}>
//       <Grid item xs={12}>
//         <Grid container justify="center" spacing={spacing}>
//           {[0, 1, 2, 3, 4, 5].map((value) => (
//             <Grid key={value} item>
//               <Paper className={classes.paper} />
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
