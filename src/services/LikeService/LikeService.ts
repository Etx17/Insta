import { useMutation } from "@apollo/client";
import { Post, UpdatePostMutation, UpdatePostMutationVariables } from "../../API";
import { updatePost } from "./queries";

const useLikeService = (post: Post) => {
    const [doUpdatePost] = useMutation<
      UpdatePostMutation, 
      UpdatePostMutationVariables
    >(updatePost);

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

    return {
      incrementNofLikes,
    }
}

export default useLikeService;
