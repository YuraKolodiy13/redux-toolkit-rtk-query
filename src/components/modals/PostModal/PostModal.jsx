import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useCreatePostMutation, useEditPostMutation} from "../../../store/reqres/reqres.api";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";

const PostModal = ({isPostModalOpen, closeModal, post}) => {

  const user = useSelector((state) => state.auth.user);
  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();
  const [newPost, setNewPost] = useState({title: '', body: '', idUser: user?.id})

  const handleCreatePost = () => {
    if(post){
      editPost(newPost);
    }else {
      createPost(newPost);
    }
    closeModal();
  }

  console.log(post, 'post')

  useEffect(() => {
    if(post) setNewPost(post);
  },[post])


  return (
    <Modal
      className='modal modal-wide'
      open={isPostModalOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isPostModalOpen}>
        <div className='modal__content'>
          <TextField
            label="Title"
            variant="outlined"
            value={newPost.title}
            onChange={e => setNewPost({...newPost, title: e.target.value})}
          />

          <TextField
            label="Body"
            variant="outlined"
            value={newPost.body}
            onChange={e => setNewPost({...newPost, body: e.target.value})}
          />
          <Button
            variant="contained"
            onClick={handleCreatePost}
            disabled={!newPost.title || !newPost.body}
          >{post ? 'Edit' : 'Add'} post</Button>
        </div>
      </Fade>
    </Modal>
  )
};
export default PostModal;