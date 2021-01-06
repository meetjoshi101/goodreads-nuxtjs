/* eslint-disable no-console */
export default function (arg) {
  const arr = Object.entries(arg).map(e => ({
    [e[0]]: e[1]
  }))
  let query = ''
  arr.forEach((val, i) => {
    if (i === 0) {
      query = '?' + Object.keys(val) + '=' + Object.values(val)
    } else {
      query = query + '&' + Object.keys(val) + '=' + Object.values(val)
    }
  })
  return query
}
