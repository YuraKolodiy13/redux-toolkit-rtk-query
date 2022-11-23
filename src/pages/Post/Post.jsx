import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useGetPostCommentsQuery, useGetPostQuery} from "../../store/reqres/reqres.api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Post = () => {

  const {id} = useParams();
  const {data: post = {}} = useGetPostQuery(id);
  const {data: comments = []} = useGetPostCommentsQuery(id);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/posts">Posts</Link>
        <Typography color="text.primary">{post.title}</Typography>
      </Breadcrumbs>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map(item =>
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.email} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={item.body}
            />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Post;