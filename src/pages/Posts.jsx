import React, {useState} from 'react';
import {useGetPostsQuery} from "../store/reqres/reqres.api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";

const Posts = () => {

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const {data: posts = {}} = useGetPostsQuery({page, itemsPerPage});

  return (
    <div>
      <List>
        {posts.data?.map(item =>
          <Link to={`/posts/${item.id}`}>
            <ListItem>
              <ListItemText
                primary={item.title}
                secondary={item.body}
              />
            </ListItem>
          </Link>
        )}
      </List>
      {posts.totalCount > posts.data?.length && (
        <Pagination
          count={Math.ceil(posts.totalCount / itemsPerPage)}
          shape="rounded"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      )}
    </div>
  );
};

export default Posts;