import { CustomError } from "../error/custom.js";

export default function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  res.status(500).json({ err });
}
