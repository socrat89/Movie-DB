const express = require("express");
const app = express();
const port = 3000;
const today = new Date();
var t = today.getHours() + ":" + today.getMinutes();
const st = "s";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get("/test", (req, res) => {
  res.send({ status: 200, message: "ok" });
});
app.get("/time", (req, res) => {
  res.send({ status: 200, message: t });
});
app.get("/hello", (req, res) => {
  res.send({ status: 200, message: "" });
});
app.get("/hello/:id", (req, res) => {
  const { id } = req.params;
  res.send({ status: 200, message: "hello " + id });
});
app.get("/search", (req, res) => {
  const data = req.query.s;
  if (data) res.send({ status: 200, message: "ok", data: data });
  else
    res.status(500).send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
});
