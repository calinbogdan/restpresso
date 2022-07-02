import { Handler } from "@restretto/core";

export const get: Handler = (req, res) => {
  res.send("hello");
};
