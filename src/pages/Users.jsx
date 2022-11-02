import React, {useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {useCreateUserMutation, useGetUsersQuery, useRemoveUserMutation} from "../store/reqres/reqres.api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";

const Users = () => {

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [newUser, setNewUser] = useState({first_name: '', last_name: ''})
  const {data: users = {}} = useGetUsersQuery({page, itemsPerPage});
  const [createUser] = useCreateUserMutation();
  const [removeUser] = useRemoveUserMutation();

  const handleRemoveUser = (id) => {
    setPage(Math.ceil((users.totalCount - 1) / itemsPerPage));
    removeUser(id);
  }
  const handleEditUser = (id) => {
    removeUser(id);
  }

  return (
    <div className="Users">
      <div className="users__create">
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
        <button onClick={() => createUser(newUser)}>Add</button>
      </div>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.data?.map((item) => (
          <ListItem
            style={{position: 'relative'}}
            key={item.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(item.id)}>
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