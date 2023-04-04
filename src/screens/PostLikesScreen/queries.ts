import { gql } from "@apollo/client";

export const likesForPostByUser = gql`
  query LikesForPostByUser(
    $postID: ID!
    $userID: ModelIDKeyConditionInput # this field is optional, so if we dont filter by UserID, we will be able to get all the user that like a post
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesForPostByUser(
      postID: $postID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
            id 
            image
            name # or username probably
        }
      }
      nextToken
      startedAt
    }
  }
`;