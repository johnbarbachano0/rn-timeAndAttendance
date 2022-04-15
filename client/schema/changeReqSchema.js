import * as yup from "yup";

export const changeReqSchema = yup.object().shape({
  date: yup.date().required("Required."),
  datetime: yup.date().required("Required."),
  TimeLogTypeId: yup.number().required("Required."),
  ChangeRequestStatusId: yup.number().required("Required."),
  reason: yup.string().required("Required").max(250, "Max of 250 characters."),
});
