// validationSchema.js
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Имя обязательно для заполнения'),
    email: yup.string().email('Некорректный email').required('Email обязателен для заполнения'),
    password: yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен для заполнения'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required('Подтверждение пароля обязательно для заполнения'),
});

export default schema;
