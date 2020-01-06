export function dateDay(str) {
  str = Number(str)
  const d = new Date(str)
  const y = d.getFullYear()
  const mon = d.getMonth() + 1
  const day = d.getDate()
  return y + '-' + mon + '-' + day
}

export function dateTime(timestamp) {
  timestamp = Number(timestamp)
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  return Y + M + D + h + m + s
}
