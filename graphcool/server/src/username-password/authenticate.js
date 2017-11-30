const fromEvent = require('graphcool-lib').fromEvent
const bcrypt = require('bcryptjs')

function getUser(api, username) {
  return api.request(`
    query {
      User(username: "${username}"){
        id
        password
        role
        username
      }
    }`)
    .then((userQueryResult) => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error)
      } else {
        return userQueryResult.User
      }
    })
}

module.exports = function(event) {
  if (!event.context.graphcool.pat) {
    console.log('Please provide a valid root token!')
    return { error: 'Email Authentication not configured correctly.'}
  }

  const username = event.data.username
  const password = event.data.password
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getUser(api, username)
    .then((graphcoolUser) => {
      if (graphcoolUser === null) {
        return Promise.reject("Invalid Credentials") //returning same generic error so user can't find out what emails are registered.
      } else {
        return bcrypt.compare(password, graphcoolUser.password)
          .then(passwordCorrect => {
            if (passwordCorrect) {
              return graphcoolUser
              // return graphcoolUser.id
            } else {
              return Promise.reject("Invalid Credentials")
            }
          })
      }
    })
    .then(graphcoolUser => {
      return graphcool.generateAuthToken(graphcoolUser, 'User')
      .then(token => {
        return { data: { id: graphcoolUser.id, role: graphcoolUser.role, username: graphcoolUser.username, token } }
      })
    })
    .catch(error => {
      console.log(`Error: ${JSON.stringify(error)}`)

      // don't expose error message to client!
      return { error: `An unexpected error occured` }
    })
}
