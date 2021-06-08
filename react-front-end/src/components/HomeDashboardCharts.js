import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';


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
  
  
  //placeholder for bar chart
  const data = {
    labels: ['React', 'Javascript', 'Writing', 'French', 'Code', 'PHP', 'Rails'],
    datasets: [
      {
        label: 'Skills in progress',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  
  
  
  //placeholder for line chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Completed',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
       
      }
    ]
  };
  
  
  
  //placeholder for pie chart
  const pieData = {
    labels: [
      'In Progress',
      'Complete',
      'Staged'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]}

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <div>
        <h2>Progress this week</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
    </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><h2>Completion Rate</h2><Line data={lineData} /></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><h3>Most in-progress</h3><h2>React</h2><Doughnut data={pieData}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><h3>Most in staged</h3><h2>People Skills</h2><Doughnut data={pieData}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><h3>Most complete</h3><h2>Management</h2><Doughnut data={pieData}/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><h3>Newest Skill</h3><h2>Javascript</h2><Doughnut data={pieData}/></Paper>
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
