import React, {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {useGetUsersQuery, useRemoveUserMutation} from "../../store/reqres/reqres.api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";
import UserModal from "../../components/modals/UserModal/UserModal";
import Button from "@mui/material/Button";

const Users = () => {

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const {data: users = {}} = useGetUsersQuery({page, itemsPerPage});
  const [removeUser] = useRemoveUserMutation();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleRemoveUser = (id) => {
    setPage(Math.ceil((users.totalCount - 1) / itemsPerPage));
    removeUser(id);
  }
  const handleEditUser = (user) => {
    setUser(user);
    setIsUserModalOpen(true)
  }

  const closeUserModal = () => {
    setUser(null);
    setIsUserModalOpen(false);
  }

  return (
    <div className="Users">
      <Button variant="contained" onClick={() => setIsUserModalOpen(true)}>Add user</Button>
      {isUserModalOpen && (
        <UserModal
          isUserModalOpen={isUserModalOpen}
          closeModal={closeUserModal}
          user={user}
        />
      )}

      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.data?.map((item) => (
          <ListItem
            style={{position: 'relative'}}
            key={item.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveUser(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${item + 1}`}
                  src={item.avatar}
                />
              </ListItemAvatar>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} secondary={item.email} />
            </ListItemButton>
            <Link to={`/users/${item.id}`} style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}/>
          </ListItem>
        ))}
      </List>
      {users.totalCount > users.data?.length && (
        <Pagination
          count={Math.ceil(users.totalCount / itemsPerPage)}
          shape="rounded"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      )}
    </div>
  );
};

export default Users;