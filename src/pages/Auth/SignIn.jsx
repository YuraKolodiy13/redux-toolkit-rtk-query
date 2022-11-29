import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {useSignInMutation} from "../../store/reqres/reqres.api";

const SignIn = () => {

  const user = useSelector((state) => state.auth.user);
  const [signIn] = useSignInMutation();
  const {handleSubmit, formState: {errors}, control} = useForm();
  const onSubmit = data => signIn(data);

  if(user) return <Navigate replace to="/" />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='auth'>
        <div className="auth__row">
          <Controller
            render={({ field }) => <TextField {...field} label="Email"/>}
            name="email"
            control={control}
            rules={{
              required: "this is a required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address"
              }
            }}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="auth__row">
          <Controller
            render={({ field }) => <TextField type='password' {...field} label="Password"/>}
            name="password"
            control={control}
            rules={{
              required: "this is a required",
              pattern: {
                minLength: 6,
                message: "The password has to contain at least 6 symbols"
              }
            }}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <Button type='submit' variant="contained">Sign in</Button>
      </form>
    </div>
  );
};

export default SignIn;