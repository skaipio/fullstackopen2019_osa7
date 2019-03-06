const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  
  if (authorization) {
    const [header, token, ...rest] = authorization.match(/[Bb]earer\s+(.+)/)
    request.token = token
  }

  next()
}


module.exports = {
  errorHandler,
  tokenExtractor
}