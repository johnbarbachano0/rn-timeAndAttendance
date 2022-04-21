import "intl";
import "intl/locale-data/jsonp/en";

export function dateTimeConverter(ISOdate, line) {
  const dateFormat = new Date(ISOdate).toLocaleDateString();
  const timeFormat = new Date(ISOdate).toLocaleTimeString();
  if (line === 2) {
    return (
      <>
        <p style={{ padding: 0, margin: 0 }}>{dateFormat}</p>
        <p style={{ padding: 0, margin: 0 }}>{timeFormat}</p>
      </>
    );
  } else {
    return dateFormat + " " + timeFormat;
  }
}

export function dateConverter(ISOdate) {
  const dateFormat = new Date(ISOdate).toLocaleDateString();
  return dateFormat;
}

export function timeConverter(ISOdate) {
  const timeFormat = new Date(ISOdate).toLocaleTimeString();
  return timeFormat;
}

export function removeSpace(value) {
  return value.replace(/\s/g, "");
}

export function capitalize(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export function capitalizeFirstLetters(str) {
  const arr = str?.split(" ");
  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1);
  }
  return arr.join(" ");
}

export const getIsoToday = () => {
  return new Date().toLocaleDateString(navigator.language);
};

export const getHourMin = (date) => {
  return new Date(date).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getHourMinSec = (date) => {
  return new Date(date).toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const hourMinFormat = (date) => {
  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};

export const hourMinSecFormat = (date) => {
  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));
};

export const combineDateTime = (date, time) => {
  const currDate = new Date(date);
  const currTime = new Date(time);
  const yr = currDate?.getFullYear();
  const mon = currDate?.getMonth();
  const d = currDate?.getDate();
  const h = currTime?.getHours();
  const m = currTime?.getMinutes();
  const s = currTime?.getSeconds();
  const ms = currTime?.getMilliseconds();

  return new Date(yr, mon, d, h, m, s, ms);
};

export const getRound = (data, length) => {
  return Number.parseFloat(data).toFixed(length);
};

export const removeArrayDuplicates = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const fullname = (first, last) => {
  return capitalize(first) + " " + capitalize(last);
};

export const avatarLabel = (first, last) => {
  return capitalize(first.charAt(0)) + capitalize(last.charAt(0));
};

export const dirtyValues = (dirtyFields, allValues) => {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
  // Here, we have an object
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      dirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
};

export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const filterObj = (rawObj, allowedArray) =>
  Object.keys(rawObj)
    .filter((key) => allowedArray.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: rawObj[key],
      };
    }, {});

export const objectToText = (data, type) => {
  const keyValueValidator = (key, value) => {
    return key === "status"
      ? value === true
        ? "Active"
        : "Inactive"
      : key === "firstname" || key === "lastname"
      ? value === null
        ? "<blank>"
        : capitalizeFirstLetters(value)
      : key === "createdAt" || key === "updatedAt" || key === "lastLogin"
      ? dateTimeConverter(value)
      : key === "deleted"
      ? value
        ? "True"
        : "False"
      : value === null
      ? "<blank>"
      : value;
  };

  var list = [];
  if (data !== null) {
    for (const [key, value] of Object.entries(data)) {
      list.push(`${capitalize(key)}: ${keyValueValidator(key, value)}\r\n`);
    }
    return list;
  }
  return "";
};

export const isDisplay = (id, arr) => {
  return arr?.includes(id);
};
