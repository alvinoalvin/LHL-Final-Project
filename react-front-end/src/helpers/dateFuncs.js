function getDate(dateStr) {
  if (!dateStr) {
    return null
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate()+1;

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (year + '-' + month + '-' + dt)
}
module.exports = { getDate }