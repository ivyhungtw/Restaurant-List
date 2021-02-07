const getAppCookies = req => {
  // Extract cookies from the request headers
  const rawCookies = req.headers.cookie.split('; ')

  const parsedCookies = {}
  rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split('=')
    parsedCookies[parsedCookie[0]] = parsedCookie[1]
  })

  return parsedCookies
}

// Get the value of the userId from parsedCookies
const getUserId = (req, res) => getAppCookies(req, res)['userId']

// Export
module.exports = getUserId
