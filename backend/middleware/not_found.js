export default function notFound(req, res) {
  return res.status(404).json("page not found");
}
