const ERROR = {
  ALL_FIELD_REQUIRED: "All field required",
  USER_NOT_FOUND: "User not found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  PERMISSION_DENIED: "Permission denied",
  TOKEN_INVALID: "Token invalid",
  NO_TOKEN: "Token not provided",
  AUTH_FAILED: "Authentication failed! Please check the request",
  INCORRECT_CREDENTIALS: "Incorrect username or password",
  EMIL_ALREADY_REG: "Email already registered",
  ID_REQUIRED: "Id required"
};

const SUCCESS = {
  USER_UPDATED:"user details saved successfully",
  USER_REMOVED:"user removed successfully",
  OK: "OK",
  AUTH_SUCCESS: "Authentication successful!",
  LOGOUT: "Successfully logout",
  ADMIN_CREATED: "Admin registered successfully"
};

module.exports = {SUCCESS,ERROR};
