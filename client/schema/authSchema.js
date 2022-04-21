import * as yup from "yup";
import { SERVER_URL } from "@env";

const isAvailable = async (username) =>
  await fetch(`${SERVER_URL}/auth?uname=${username}`)
    .then((response) => response.json())
    .then((data) => data.message);

export const authSchema = yup.object().shape({
  username: yup
    .string()
    .required("Required.")
    .min(6, "At least 6 characters.")
    .test("is-username-exist", "Username does not exist.", async (username) => {
      if (username) {
        const res = await isAvailable(username);
        if (res !== "available") {
          return true;
        } else {
          return false;
        }
      }
    })
    .test(
      "is-username-invalid",
      "Inactive account. Contact Admin.",
      async (username) => {
        if (username) {
          const res = await isAvailable(username);
          if (res === "inactive") {
            return false;
          } else {
            return true;
          }
        }
      }
    ),
  password: yup.string().required("Required.").min(6, "At least 6 characters."),
});
