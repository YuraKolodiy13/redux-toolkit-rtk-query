import React, {useState} from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {useGetUsersQuery} from "../../store/reqres/reqres.api";
import MenuItem from "@mui/material/MenuItem";
import {Navigate, useNavigate} from "react-router-dom";

const Login = () => {

  // const navigate = useNavigate();
  const {data: users = {}} = useGetUsersQuery({page: 1, itemsPerPage: 1000});
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    localStorage.setItem('user', JSON.stringify(e.target.value));
    setUser(e.target.value);
  }

  if(localStorage.getItem('user')) return <Navigate replace to="/" />;

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Please choose the user</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Please choose the user"
            onChange={handleChange}
          >
            {users.data?.map(item =>
              <MenuItem value={item}>{item.first_name} {item.last_name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;