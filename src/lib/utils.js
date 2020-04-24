import _format from "date-fns/format";

// Flip curry
export const format = (fmt) => (date) => _format(date, fmt);

// I didn't yet decide to import ramda here because I didn't want files
// including the utils file to have to import anything from ramda.
const tap = (f) => (x) => (f(x), x);

// Useful for dropping into functional pipelines as a quick debugger
export const tapper = tap((x) =>
  console.log("what the hell is the value???", x)
);
