import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import styles from './RegistrationForm.module.css'; // Подключаем файл стилей

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createUser, { loading, error }] = useMutation(CREATE_USER);

    const onSubmit = async (data) => {
        try {
            const response = await createUser({
                variables: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            });
            console.log(response.data.createUser);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
            <input type="text" {...register('name', { required: true })} placeholder="Имя" className={styles.input} />
            {errors.name && <span className={styles.error}>Имя обязательно</span>}
            <input type="email" {...register('email', { required: true })} placeholder="Email" className={styles.input} />
            {errors.email && <span className={styles.error}>Почта обязательна</span>}
            <input type="password" {...register('password', { required: true })} placeholder="Пароль" className={styles.input} />
            {errors.password && <span className={styles.error}>Пароль обязателен</span>}
            <input type="password" {...register('passwordConfirmation', { required: true })} placeholder="Подтверждение пароля" className={styles.input} />
            {errors.passwordConfirmation && <span className={styles.error}>Подтверждение пароля обязательно</span>}
            <button type="submit" disabled={loading} className={styles.button}>Зарегистрироваться</button>
            {loading && <p>Отправка...</p>}
            {error && <p className={styles.error}>Ошибка: {error.message}</p>}
        </form>
    );
}

export default RegistrationForm;
