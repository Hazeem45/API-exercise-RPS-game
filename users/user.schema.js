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

const createRoom = {
  roomName: {
    notEmpty: true,
    errorMessage: "room name cannot empty",
    isLength: {
      options: {min: 5, max: 12},
      errorMessage: "room name shoulbe at least 5 chars and max 12 chars",
    },
  },
  player1Choice: {
    notEmpty: true,
    errorMessage: "your choice cannot be empty",
    isIn: {
      options: [["rock", "paper", "scissor"]],
      errorMessage: "your choice must be rock/paper/scissor",
    },
  },
};

const updateRoom = {
  player2Choice: {
    notEmpty: true,
    errorMessage: "your choice cannot be empty",
    isIn: {
      options: [["rock", "paper", "scissor"]],
      errorMessage: "your choice must be rock/paper/scissor",
    },
  },
};

module.exports = {
  registrationSchema,
  loginSchema,
  createRoom,
  updateRoom,
};
