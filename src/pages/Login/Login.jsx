import React from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {useGetUsersQuery} from "../../store/reqres/reqres.api";
import MenuItem from "@mui/material/MenuItem";
import {Navigate} from "react-router-dom";
import {setUser} from "../../store/reqres/auth.slice";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {

  const user = useSelector((state) => state.auth.user);
  const {data: users = {}} = useGetUsersQuery({page: 1, itemsPerPage: 1000});
  const dispatch = useDispatch();

  if(user) return <Navigate replace to="/" />;

  console.log(setUser, 'setUser')

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Please choose the user</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user || ''}
            label="Please choose the user"
            onChange={e => dispatch(setUser(e.target.value))}
          >
            {users.data?.map(item =>
              <MenuItem key={item.id} value={item}>{item.first_name} {item.last_name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;