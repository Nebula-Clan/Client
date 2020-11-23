export function dateDuration(date) {
  const unixTime = new Date(date).getTime()
  const now = new Date().getTime()
  if (now - unixTime < 36e+5) {
    return Math.floor((now - unixTime) / 60000) + ' m'
  } else if (now - unixTime > 36e+5 && now - unixTime < 36e+5 * 24) {
    return Math.floor((now - unixTime) / 36e+5) + ' h'
  } else {
    return Math.floor((now - unixTime) / (36e+5 * 24)) + ' day(s)'
  }
}
