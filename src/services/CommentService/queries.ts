import { gql } from "@apollo/client";

export const getPost =gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      createdAt 
      updatedAt
      nofComments
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const updatePost = gql`
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      nofComments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const commentsByPost =gql`
  query CommentsByPost(
    $postID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postID: $postID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        userID
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;

export const createComment = gql`
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      comment
      userID
      postID
      Post {
        id
        nofComments
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;