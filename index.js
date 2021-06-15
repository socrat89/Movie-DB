const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
// let router = express.Router();
// const bodyParser=require('body-parser');
// const cors=require('cors');
// app.use(cors());
// app.use(bodyParser());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const today = new Date();
var t = today.getHours() + ":" + today.getMinutes();
const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];



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
  moviesmovies;
});
app.get("/test/movies/create", (req, res) => {
  res.send({ status: 200, message: "create" });
});
app.get("/test/movies/read", (req, res) => {
  res.send({ status: 200, message: "read", data: movies });
});
app.get("/test/movies/update", (req, res) => {
  res.send({ status: 200, message: "update" });
});
app.get("/test/movies/delete", (req, res) => {
  res.send({ status: 200, message: "delete" });
});

app.get("/movies/read/by-date", function (req, res) {
  movies.sort(function (a, b) {
    return b.year - a.year;
  });
  // res.send({ status: 200, message:"ordered by Date"})
  res.send({ status: 200, message: movies });
});

app.get("/movies/read/by-rate", function (req, res) {
  movies.sort(function (a, b) {
    return b.rating - a.rating;
  });
  res.send({ status: 200, message: movies });
});

app.get("/movies/read/by-title", function (req, res) {
  movies.sort(function (a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  res.send({ status: 200, message: movies });
});

app.get("/movies/read/id/:id", (req, res) => {
  const { id } = req.params;
  if (id <= movies.length - 1 && id > 0) {
    res.send({ status: 200, data: movies[id] });
  } else {
    res.status(404).send({
      status: 404,
      error: true,
      message: "the movie <ID> does not exist",
    });
  }
});
////////////////step8
app.post("/movies/add", (req, res) => {
    const title = req.body.title;
    const year = req.body.year;
    const rating = req.body.rating;
    const y=parseInt(year);
    if (title !== "" && year !== "" &&year.length==4 && !isNaN(y))
     {
        if (rating!=="") {
          movies.push({ title: title, year: parseInt(year), rating: parseInt(rating) });
          
        }else{movies.push({ title: title, year: parseInt(year), rating:4 });}
        res.send({ status: 200, data: movies });
    }else {
        res.status(403).send({
            status: 403,
            error: true,
            message:"you cannot create a movie without providing a title and a year",
        })
    }
});
/////////////step 9  
app.delete("/movies/delete/:id", (req, res) => {
    
    const { id } = req.params;
    if(id<=movies.length && id>=0 )
    {
        movies.splice(id-1, 1);
        res.send({ status: 200, data: movies });
    }else {res.status(404).send({
        status: 404,
         error: true,
        message: `the movie ${req.params.id} does not exist`,})
    }
});
///////// step 10     /movies/update/<ID>?title=<NEW_TITLE>,
app.put("/movies/update/:id", (req, res) => {
    let { id } = req.params;
    let title = req.body.title;
    let year = req.body.year;
    let rating = req.body.rating;
    id=id-1;
    if(title!=""){movies[id].title=title;}
    if(year!="" && year.length==4 && !isNaN(parseInt(year))){movies[id].year=parseInt(year);}
    if(rating!=""&& rating>0){movies[id].rating=parseInt(rating);}
    res.send({ status: 200, data: movies });
})

/////step 11    replace get with (post for adding)(delete for removing)(put for updating)
////// also add a middle (app.use(express.json());) 
////// use body insted of query




