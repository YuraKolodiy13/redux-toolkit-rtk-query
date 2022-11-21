import React from 'react';
import {useParams} from "react-router-dom";
import {useGetPostCommentsQuery, useGetPostQuery} from "../store/reqres/reqres.api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const SinglePost = () => {

  const {id} = useParams();
  const {data: post = {}} = useGetPostQuery(id);
  const {data: comments = []} = useGetPostCommentsQuery(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {comments.map((item, i) =>
          <ListItem alignItems="flex-start">
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

export default SinglePost;