import { useMutation, useQuery } from "@apollo/client";
import { CreateLikeMutation, CreateLikeMutationVariables, DeleteLikeMutation, DeleteLikeMutationVariables, LikesForPostByUserQuery, LikesForPostByUserQueryVariables, Post, UpdatePostMutation, UpdatePostMutationVariables } from "../../API";
import { createLike, updatePost, deleteLike, likesForPostByUser } from "./queries";
import { useAuthContext } from "../../contexts/AuthContext";

const useLikeService = (post: Post) => {
    const {userId} = useAuthContext()

    const {data: usersLikeData} = useQuery<
      LikesForPostByUserQuery, 
      LikesForPostByUserQueryVariables
    >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userId}}})

    const [doUpdatePost] = useMutation<
      UpdatePostMutation, 
      UpdatePostMutationVariables
    >(updatePost);

    const [doCreateLike] = useMutation<  // by default, the mutation will not refetch the query (so the heart would not be red), so we need to specify it in the refetchQueries option
      CreateLikeMutation, 
      CreateLikeMutationVariables
    >(createLike, {variables: {input: {postID: post.id, userID: userId}}, refetchQueries: ["LikesForPostByUser"] });
   
    const [doDeleteLike] = useMutation<
      DeleteLikeMutation,
      DeleteLikeMutationVariables
    >(deleteLike)

    const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(
        like => !like?._deleted
      )?.[0];

    const incrementNofLikes = (amount: 1 | -1) => {
      doUpdatePost(
        { variables :{
          input: {
            id: post.id,
            _version: post._version,
            nofLikes: post.nofLikes + amount,
          },
        },
      });
    };

    const onAddLike = () => {
        doCreateLike();
        incrementNofLikes(1);
    };
    
    const onDeleteLike = () => {
        if (!userLike) {return};
        doDeleteLike({variables: {input: {id: userLike.id, _version: userLike._version}}});
        incrementNofLikes(-1);
    };

    
    const toggleLike = () => {
        if(userLike){
            onDeleteLike();
        } else {
            onAddLike();
        }
    };
      

    return {
      toggleLike,
      isLiked: !!userLike, //We are parsing userLike as a boolean value. if userLIke is an object its gonna be true; if it's undefined then false
    }
}

export default useLikeService;
