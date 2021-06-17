const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require('mongoose')
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
  console.log(`Example app  listening at http://localhost:${port}`);
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
  const name = req.body.username;
  const pass = req.body.password;
  // console.log(permition(name,pass)+"!!!!!!");
  if (permition(name,pass)==true){
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
    
  }else{res.send({status:403, error:true, message:'this user can not delete or create'})}
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
////// also add a middleware (app.use(express.json());) 
////// use body insted of query

///////////step 12



try{
  mongoose.connect
  ('mongodb+srv://socrat89:socrat804499@cluster0.6b0wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}, function(){
      console.log("Connected to MongoDB ");
  })
} catch(error){
  console.log("dddddddddddddddddd");
}

var MovieSchema = mongoose.Schema({
  title: {
      type: String,
      require:true
  },
  year: {
      type: Number,
      require:true
  },
  rating:{
      type: Number,
      default:4
  }
});
var testMovies = mongoose.model('movies', MovieSchema);

app.get("/movies/read", function (req, res) {
  const Read = testMovies.save()
  res.send({ status: 200, message: Read });
})
///////////
app.post("/movies/add1", function(req, res) {
  const title = req.body.title;
  const year = req.body.year;
  const rating = req.body.rating;
  const y=parseInt(year);
  
  if (title !== "" && year !== "" &&year.length==4 && !isNaN(y))
   {
      if (rating!=="") {
      //   movies.push({ title: title, year: parseInt(year), rating: parseInt(rating) });
      newmovie=new testMovies ({title:title, year:parseInt(year), rating:parseInt(rating)})

      }else{
          // movies.push({ title: title, year: parseInt(year), rating:4 });
          newmovie=new testMovies ({title:title, year:parseInt(year), rating:4})
           }
           const movies = newmovie.save()
           res.send({ status: 200, data: movies ,message:newmovie});
  }else {
      res.status(403).send({
          status: 403,
          error: true,
          message:"you cannot create a movie without providing a title and a year",
      })
  }
});
app.delete("/movies/delete1/:id", function(req, res){
    
  const { id } = req.params;
  if(id<=movies.length && id>=0 )
  {
      // movies.splice(id-1, 1);
      // id=id-1;
      // JSON.stringify(testMovies);
      const DeleteMovie =  testMovies.remove({id})
      res.send({status:200, message:DeleteMovie})
      res.send({ status: 200, data: movies });
  }else {res.status(404).send({
      status: 404,
       error: true,
      message: `the movie ${req.params.id} does not exist`,})
  }
});
app.put("/movies/update1/:id", function(req, res) {
  let { id } = req.params;
  let title1 = req.body.title;
  let year1 = req.body.year;
  let rating1 = req.body.rating;
  id=id-1;
   
  var update={$set:{title:title1,year:year1,rating:rating1}};
  const UpdateMovies =  testMovies.updateOne(id, update);
  res.status(200).send(UpdateMovies);

  
})

/////step 13
const users = [
  { username: 'Socrat', password: 123 ,creat_Delete_per:true,update_per:true},
  { username: 'Mohmad', password: 123,creat_Delete_per:false,update_per:true},
]

app.post("/users/add", function(req, res) {
  const name = req.body.username;
  const pass = req.body.password;
  const per1=req.body.creat_Delete_per;
  const per2=req.body.update_per;

  if(name == "" || pass == ""  || isNaN(pass)||per1==""||per2=="")
  {
      res.send({status:403, error:true, message:'please enter a username and a password per1 per2'})
  }
  else{
      users.push({username:name , password:pass,creat_Delelt_per:per1,update_per:per2});
      res.send({ status: 200, message: users});
  }
})
app.delete("/users/delete/:userID", function (req, res) {
  const user_ID= req.params.userID;
  if(user_ID>=0 && user_ID <= users.length )
  {
      users.splice(user_ID,1);
      res.send({status:200, message:users})
  } else{
      res.send({status:404, error:true, message:'the user '+user_ID+ ' does not exist'});
  }
})
app.put("/users/update/:id",function (req, res) {
  let { id } = req.params;
  const name = req.body.username;
  const pass = req.body.password;
  const per1=req.body.creat_Delete_per;
  const per2=req.body.update_per;
  id=id-1;
  if(name!=""){users[id].username=name;}
  if(pass!=""  && !isNaN(parseInt(pass))){users[id].password=parseInt(pass);}
  if(per1!=""&& per2!=""){users[id].creat_Delete_per=parseInt(per1);users[id].update_per=parseInt(per2);}
  res.send({ status: 200, data: users });
})


const permition=(username,password)=>{
  let can=false;
  let isuser=false;
  users.forEach(element => {
    if (element.username==username && element.password==password)
    {isuser=true;
      if(element.creat_Delete_per){can=true;
        // console.log(can); 
        return can;
      }
      else{can=false;return can}
      
    }else{return isuser}
    
  });
}