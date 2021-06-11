function getDate(dateStr, plus1) {
  if (!dateStr) {
    return null
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  if (plus1) {
    dt += 1
  }

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (month + '-' + dt + '-' + year)
  // return (year + '-' + month + '-' + dt)
}
module.exports = { getDate }