import * as yup from "yup";

export const maintenanceSchema = yup.object().shape({
  title: yup
    .string()
    .required("Required")
    .min(1, "At least one character.")
    .max(50, "Must be less than 50 characters."),
  status: yup.bool().required("Required"),
});

export const tagSchema = yup.object().shape({
  RoleId: yup.number().required("Required."),
  PermissionId: yup.number().required("Required."),
  status: yup.bool().required("Required"),
});
