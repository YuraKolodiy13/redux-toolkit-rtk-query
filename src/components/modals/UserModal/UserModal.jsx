import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {useCreateUserMutation, useEditUserMutation} from "../../../store/reqres/reqres.api";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import './UserModal.scss';
import Button from "@mui/material/Button";

const UserModal = ({isUserModalOpen, closeModal, user}) => {

  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditUserMutation();
  const [newUser, setNewUser] = useState({first_name: '', last_name: ''})

  const handleCreateUser = () => {
    if(user){
      editUser(newUser);
    }else {
      createUser(newUser);
    }
    closeModal();
  }

  console.log(user, 'user')

  useEffect(() => {
    if(user) setNewUser(user);
  },[user])


  return (
    <Modal
      className='modal modal-wide'
      open={isUserModalOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isUserModalOpen}>
        <div className='modal__content'>
          <TextField
            label="First Name"
            variant="outlined"
            value={newUser.first_name}
            onChange={e => setNewUser({...newUser, first_name: e.target.value})}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            value={newUser.last_name}
            onChange={e => setNewUser({...newUser, last_name: e.target.value})}
          />
          <Button
            variant="contained"
            onClick={handleCreateUser}
            disabled={!newUser.first_name || !newUser.last_name}
          >{user ? 'Edit' : 'Add'} user</Button>
        </div>
      </Fade>
    </Modal>
  )
};
export default UserModal;