/***************************************************************************
 File: like-controller.js
 Author: Tony Hallal
 Date: 12/10/2023
 Description: handles incoming socket events and delegates to likes service.
 ****************************************************************************/
import {LikeService} from "../services/likes-service.js";

//send like count and likes
export const sendLikes = async (socket, postId) => {
    try {
   socket.emit('send_likes', await LikeService.get(postId));
        }catch(err) {
        console.log(err.message);
        socket.emit('error', err.message)
    }
}

//add a like
export const addLike = async (socket, like) => {
    try{
        await LikeService.add(like);
        const {post_id} = like;
        await sendLikes(socket, post_id);
    }catch(err) {
        console.log(err)
        socket.emit('error', err.message);
    }

}

//remove a like
export const removeLike = async (socket, like) => {
    try{
        const {like_id, post_id} = like;
        await LikeService.remove(like_id)
        await sendLikes(socket, post_id);
    }catch(err) {
        socket.emit('error',err.message);
    }
}

