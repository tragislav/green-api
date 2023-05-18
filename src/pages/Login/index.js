import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from '../../hooks/useAuth';

import './styled.css';

function Login() {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const { register, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    signIn(data, () =>
      navigate(`/main`, {
        replace: true,
      }),
    );
  };

  const idInstance = register('idInstance');
  const apiTokenInstance = register('apiTokenInstance');

  return (
    <div className="LoginContainer">
      <div className="LoginFormWrapper">
        <h3 className="LoginFormTitle">Авторизация</h3>
        <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="LoginFormInput"
            ref={idInstance.ref}
            name={idInstance.name}
            onBlur={idInstance.onBlur}
            onChange={idInstance.onChange}
            type="text"
            placeholder="Ваш idInstance"
            required
          />
          <input
            className="LoginFormInput"
            ref={apiTokenInstance.ref}
            name={apiTokenInstance.name}
            onBlur={apiTokenInstance.onBlur}
            onChange={apiTokenInstance.onChange}
            type="text"
            placeholder="Ваш apiTokenInstance"
            required
          />

          <button className="LoginFormSubmit" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
