// function checkRec(userID, type, skill, deliverableName, time) {
//   if (!userID) {
//     setAlert({ message: 'Please pick a user!', severity: 'warning'})
//     return false
//   }

//   if (!type) {
//     setAlert({ message: 'Please pick a type!', severity: 'warning'})
//     return false
//   }

//   if (!skill) {
//     setAlert({ message: 'Please pick a skill!', severity: 'warning'})
//     return false
//   }

//   if (!deliverableName) {
//     setAlert({ message: 'Please enter a description', severity: 'warning'})
//     return false
//   }

//   if (!time) {
//     setAlert({ message: 'Please enter an estimated time', severity: 'warning'})
//     return false
//   }

//   if (typeof time !== 'Number') {
//     setAlert({ message: 'Please enter a number', severity: 'Error'})
//     return false
//   }

//   return true;
// };

// module.exports = { checkRec }