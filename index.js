const express = require("express");
const app = express();
const port = 3000;
const today = new Date();
var t = today.getHours() + ":" + today.getMinutes();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
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
app.get("/test/movies/create", (req, res) => {
    res.send({ status: 200, message: "create" });
});
app.get("/test/movies/read", (req, res) => {
    res.send({ status: 200, message: "read" ,data:movies});
});
app.get("/test/movies/update", (req, res) => {
    res.send({ status: 200, message: "update" });
});
app.get("/test/movies/delete", (req, res) => {
    res.send({ status: 200, message: "delete" });
});

