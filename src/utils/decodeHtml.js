export const decodeHtml = (input) => {
  if (typeof input !== "string") return input;
  try {
    return new DOMParser().parseFromString(input, "text/html").documentElement
      .textContent;
  } catch {
    return input;
  }
};