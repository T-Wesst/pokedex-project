import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Login() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='email' placeholder='email' name='email' ref={register} />
        <input
          type='password'
          placeholder='password'
          name='password'
          ref={register({
            required: 'PASSWORD REQUIRED',
            minLength: { value: 8, message: 'PASSWORD LENGTH IS TOO SHORT' },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input type='submit' />
      </form>
    </>
  );
}
