import { CustomError } from "../error/custom";

export default function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  res.status(500).json({ err: "Internal server error" });
}
