import { createClient, fetchExchange } from 'urql'

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8787/graphql'

export const graphqlClient = createClient({
  url: GRAPHQL_ENDPOINT,
  exchanges: [fetchExchange],
  requestPolicy: 'network-only', // 总是从网络获取最新数据
})

// GraphQL 查询和 Mutation
export const SEND_MESSAGE_MUTATION = `
  mutation SendMessage($conversationId: ID!, $message: String!) {
    sendMessage(conversationId: $conversationId, message: $message) {
      id
      role
      content
      timestamp
    }
  }
`

export const CREATE_CONVERSATION_MUTATION = `
  mutation CreateConversation($title: String) {
    createConversation(title: $title) {
      id
      title
      messages {
        id
        role
        content
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`

export const DELETE_CONVERSATION_MUTATION = `
  mutation DeleteConversation($id: ID!) {
    deleteConversation(id: $id)
  }
`

export const GET_CONVERSATIONS_QUERY = `
  query GetConversations {
    conversations {
      id
      title
      messages {
        id
        role
        content
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CONVERSATION_QUERY = `
  query GetConversation($id: ID!) {
    conversation(id: $id) {
      id
      title
      messages {
        id
        role
        content
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`
