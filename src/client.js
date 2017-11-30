import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { apiEndpoint } from './config'
//import gql from 'graphql-tag'


const httpLink = createHttpLink({ uri: apiEndpoint })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

export const client = new ApolloClient({ 
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
})


// client.query({ query: gql`{
//   allPosts(orderBy: createdAt_DESC) {
//     id
//     imageUrl
//     description
//     author {
//       id
//       name
//       role
//     }
//   }
// }` }).then(console.log);
//