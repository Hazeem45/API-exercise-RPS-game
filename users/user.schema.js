const registrationSchema = {
  username: {
    notEmpty: true,
    errorMessage: "username cannot empty",
    isString: {
      errorMessage: "username should be string",
    },
  },
  email: {
    notEmpty: true,
    errorMessage: "email cannot empty",
    isEmail: {
      errorMessage: "email is invalid, must use real email",
    },
  },
  password: {
    notEmpty: true,
    errorMessage: "password cannot empty",
    isLength: {
      options: {min: 8},
      errorMessage: "password should be at least 8 chars",
    },
  },
};

const loginSchema = {
  email: {
    notEmpty: true,
    errorMessage: "email cannot empty",
    isEmail: {
      errorMessage: "email is invalid, must use real email",
    },
  },
  password: {
    notEmpty: true,
    errorMessage: "password cannot empty",
    isLength: {
      options: {min: 8},
      errorMessage: "password should be at least 8 chars",
    },
  },
};

module.exports = {
  registrationSchema,
  loginSchema,
};
