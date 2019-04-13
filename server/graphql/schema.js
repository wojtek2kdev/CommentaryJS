import { gql } from 'apollo-server-express';

export default gql`

  scalar DateTime, URL, EmojiCode 

  type Comment {
    _id: ID!
    owner: User! 
    content: String!
    media: [URL]
    reactions: [Reaction]
    replies: [Reply]
    channel_id: ID!
    channel: Channel!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Reply {
    _id: ID!
    owner: User!
    content: String!
    media: [URL]
    reactions: [Reaction]
    comment_id: ID!
    comment: Comment
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Reaction {
    _id: ID!
    owner: User!
    to: ID!
    emoji_id: ID!
    emoji: Emoji 
  }
  

  type User {
    id: ID!
    name: String!
    thumbnail: URL 
    profile: URL 
    createdAt: DateTime
  }

  type Channel {
    _id: ID!
    owner: User!
    comments: [Comment]
  }

  type Emoji {
    _id: ID!
    unicode: String!
    code: EmojiCode!
  }

  input Pagination {
    from: Int = 0
    to: Int = 10
  }

  schema {
    Query {
      channel(_id: ID!): Channel
      comments(channelId: ID!, pagination: Pagination): [Comment]
      replies(commentId: ID!, pagination: Pagination): [Reply]
    }
  }

`;

