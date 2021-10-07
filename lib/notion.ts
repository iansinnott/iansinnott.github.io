import assert from "assert";

export const renderRichPlainText = (xs: any[]) => {
  assert(xs && xs.map, "renderRichPlainText was not passed a map. " + xs);
  return xs
    .map((x) => x.plain_text)
    .filter(Boolean)
    .join(" ");
};

export const notionPropVal = (x) => {
  return x[x.type];
};
