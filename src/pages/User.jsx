import React from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useGetUserQuery} from "../store/reqres/reqres.api";
import {useParams} from "react-router-dom";

const User = () => {

  const {id} = useParams();
  const {data: user = {}} = useGetUserQuery(id);

  console.log(user, 'user')

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={user.avatar}
        alt="user"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores blanditiis consequuntur cupiditate dolor ducimus ea est eum exercitationem expedita in, iusto libero magni maiores molestiae nesciunt nostrum odit omnis possimus quidem quis quos sed similique suscipit tempore ut velit veniam vitae voluptas. Molestias, neque, saepe. A alias atque blanditiis consequatur consequuntur doloremque ea, ex inventore iure nam nihil, nisi odit officiis perferendis quam quisquam, ut. A accusantium doloremque fugit, iste labore officiis reiciendis repellat. Aliquam aliquid amet aperiam aspernatur corporis cumque deserunt doloribus dolorum earum error ex exercitationem illo illum impedit in itaque laboriosam maiores maxime minus modi nam nisi nobis odit officia officiis placeat praesentium, quas quia quisquam quo quos ratione repudiandae sequi sunt suscipit tempora totam? Aliquid asperiores, deleniti dicta eos incidunt iusto quaerat reprehenderit soluta. Asperiores dicta incidunt modi natus perspiciatis placeat. Aliquam atque beatae commodi explicabo, inventore ipsum itaque maiores minus obcaecati perspiciatis quasi qui quos repellendus reprehenderit rerum soluta suscipit? Ad, assumenda consequatur, cumque dolorem, dolores enim eos error fugiat inventore iure laboriosam mollitia necessitatibus omnis optio perferendis perspiciatis quis quos recusandae reiciendis repellendus sit veritatis voluptatem. Aliquid consequuntur, dicta doloremque exercitationem expedita fugit libero magni molestias nisi nobis nulla odio optio perferendis possimus quam quos, soluta velit veritatis! Doloremque harum nemo quasi qui quidem temporibus vel. Ab ad amet asperiores aspernatur, at consequuntur cupiditate doloremque eligendi eveniet explicabo facilis in ipsa maxime molestias natus nostrum numquam obcaecati odit, perspiciatis porro quas, sapiente sed sunt totam voluptatibus. A ad aliquid cupiditate dolor earum facilis, fuga itaque iure laborum laudantium nobis numquam officia perferendis praesentium quia sequi voluptatem. Consequatur maxime quisquam rem sint? Ab accusantium atque debitis dolores eum itaque iusto minima odit quam quisquam quo quod, repellat repellendus reprehenderit tempore. Adipisci ea id molestias odit placeat porro praesentium similique unde vitae. Atque, quam.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default User;