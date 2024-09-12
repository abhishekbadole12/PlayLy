export const validateRegistrationForm = async (userDetails) => {
  const errors = {};
  let isValid = true;

  if (!userDetails.username) {
    errors.username = "Username is required.";
    isValid = false;
  }
  if (!userDetails.email) {
    errors.email = "Email is required.";
    isValid = false;
  }
  if (!userDetails.password) {
    errors.password = "Password is required.";
    isValid = false;
  }
  if (userDetails.password !== userDetails.confirm_password) {
    errors.confirm_password = "Passwords do not match.";
    isValid = false;
  }

  return { isValid, errors };
};
