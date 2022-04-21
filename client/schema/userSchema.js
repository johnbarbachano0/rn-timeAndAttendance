import * as yup from "yup";

const isAvailable = async (username) =>
  await fetch(`http://192.168.100.119:5007/auth?uname=${username}`)
    .then((response) => response.json())
    .then((data) => data.message);

export const addUserSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required.")
    .min(6, "At least 6 characters.")
    .max(50, "Fewer than 50 characters.")
    .test("is-username-exist", "Already in use.", async (username) => {
      if (username) {
        const res = await isAvailable(username);

        if (res === "available") {
          return true;
        } else {
          return false;
        }
      }
    }),
  password: yup
    .string()
    .required("Required.")
    .min(8, "Minimum of 8 characters.")
    .test(
      "isValidPass",
      "Needs one uppercase, one number and one symbol.",
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbole = /[!@#%&]/.test(value);
        var validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasUpperCase, hasNumber, hasSymbole];
        conditions.forEach((condition) => condition && validConditions++);
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
  firstname: yup
    .string()
    .required("Required.")
    .min(1, "At least one character.")
    .max(100, "Fewer than 100 characters."),
  lastname: yup
    .string()
    .required("Required.")
    .min(1, "At least one character.")
    .max(100, "Fewer than 100 characters."),
  email: yup
    .string()
    .required("Required.")
    .max(250, "Fewer than 250 characters.")
    .email("Invalid email format."),
  RoleId: yup.number().required("Required."),
  status: yup.bool().required("Required."),
});

export const editUserSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("Required.")
    .min(1, "At least one character.")
    .max(100, "Fewer than 100 characters."),
  lastname: yup
    .string()
    .required("Required.")
    .min(1, "At least one character.")
    .max(100, "Fewer than 100 characters."),
  email: yup
    .string()
    .required("Required.")
    .max(250, "Fewer than 250 characters.")
    .email("Invalid email format."),
  RoleId: yup.number().required("Required."),
  status: yup.bool().required("Required."),
});
