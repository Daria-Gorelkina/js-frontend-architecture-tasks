import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const form = document.querySelector('[data-form="sign-up"]');
  const submitButton = form.querySelector('input[type="submit"]');

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    valid: false,
    submitting: false,
  };

  const state = onChange(initialState, (path) => {
    const { errors, submitting, valid } = state;

    if (path === 'errors') {
      Object.keys(errors).forEach((key) => {
        const input = form.querySelector(`[name="${key}"]`);
        const feedback = input.nextElementSibling;
        if (errors[key]) {
          input.classList.add('is-invalid');
          feedback.textContent = errors[key].message;
        } else {
          input.classList.remove('is-invalid');
          feedback.textContent = '';
        }
      });
    }

    if (path === 'submitting') {
      submitButton.disabled = submitting;
    }

    if (path === 'valid') {
      submitButton.disabled = !valid || submitting;
    }
  });

  form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    state[name] = value;

    const currentErrors = validate(state);
    state.errors = currentErrors;
    state.valid = isEmpty(currentErrors);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    state.submitting = true;

    try {
      await axios.post(routes.usersPath(), state);
      form.outerHTML = '<div data-container="sign-up">User Created!</div>';
    } catch (error) {
      console.error(error);
    } finally {
      state.submitting = false;
    }
  });
};
// END
