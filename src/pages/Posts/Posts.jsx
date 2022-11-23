import React, {useState} from 'react';
import {
  useGetPostsQuery,
  useRemovePostMutation,
} from "../../store/reqres/reqres.api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import PostModal from "../../components/modals/PostModal/PostModal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

const Posts = () => {

  const user = useSelector((state) => state.auth.user)
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const {data: posts = {}} = useGetPostsQuery({page, itemsPerPage});
  const [removePost] = useRemovePostMutation();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [post, setPost] = useState(null);

  const handleRemovePost = (id) => {
    // setPage(Math.ceil((posts.totalCount - 1) / itemsPerPage));
    removePost(id);
  }
  const handleEditPost = (post) => {
    setPost(post);
    setIsPostModalOpen(true)
  }

  const closePostModal = () => {
    setPost(null);
    setIsPostModalOpen(false);
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Posts</Typography>
      </Breadcrumbs>
      <Button variant="contained" onClick={() => setIsPostModalOpen(true)}>Add post</Button>
      {isPostModalOpen && (
        <PostModal
          isPostModalOpen={isPostModalOpen}
          closeModal={closePostModal}
          post={post}
        />
      )}

      <List>
        {posts.data?.map(item =>
          <ListItem
            key={item.id}
            secondaryAction={item.idUser === user?.id &&
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPost(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePost(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Link to={`/posts/${item.id}`}>
              <ListItemText
                primary={item.title}
                secondary={item.body}
              />
            </Link>
          </ListItem>
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