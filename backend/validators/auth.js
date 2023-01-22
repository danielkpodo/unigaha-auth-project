import Joi from 'joi';

function validateRegistration(data) {
  const schema = Joi.object({
    firstName: Joi.string().required().label('Firstname'),
    lastName: Joi.string().required().label('Lastname'),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().message('Invalid email format').required(),
    password: Joi.string().min(8).max(30).required().label('Password'),
    confirmPassword: Joi.string(),
  });
  return schema.validate(data);
}

const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string().email().message('Invalid email format').required(),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

const verifyPasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

export { validateRegistration, validateLogin, verifyPasswords };
