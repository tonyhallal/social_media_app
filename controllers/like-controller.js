/***************************************************************************
 File: like-controller.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: handles incoming socket events and delegates to likes service.
 ****************************************************************************/
import {LikeService} from "../services/likes-service.js";

//send like count and likes
export const sendLikes = async (socket, postId) => {
   socket.emit('send_likes', await LikeService.get(postId));
}

//add a like
export const addLike = async (socket, like) => {
    await LikeService.add(like);
    const {post_id} = like;
    await sendLikes(socket, post_id);
}

//remove a like
export const removeLike = async (socket, like) => {
    const {like_id, post_id} = like;
    await LikeService.remove(like_id)
    await sendLikes(socket, post_id);
}

