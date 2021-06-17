// ////////step 12
// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const port = 3000
// app.use(express.json());
// app.listen(port, () => {
//     console.log(`listening ddd ddd  at http://localhost:${port}`)
//  })



// try{
//     mongoose.connect
//     ('mongodb+srv://socrat89:socrat804499@cluster0.6b0wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     {useNewUrlParser: true, useUnifiedTopology: true}, function(){
//         console.log("Connected to MongoDB ");
//     })
// } catch(error){
//     console.log(error.message);
// }

// var MovieSchema = mongoose.Schema({
//     title: {
//         type: String,
//         require:true
//     },
//     year: {
//         type: Number,
//         require:true
//     },
//     rating:{
//         type: Number,
//         default:4
//     }
//   });
//   var testMovies = mongoose.model('movies', MovieSchema);

//   app.get("/movies/read", function (req, res) {
//     const Read = await testMovies.save()
//     res.send({ status: 200, message: Read });
//   })
// ///////////
// app.post("/movies/add1", (req, res) => {
//     const title = req.body.title;
//     const year = req.body.year;
//     const rating = req.body.rating;
//     const y=parseInt(year);
//     if (title !== "" && year !== "" &&year.length==4 && !isNaN(y))
//      {
//         if (rating!=="") {
//         //   movies.push({ title: title, year: parseInt(year), rating: parseInt(rating) });
//         newmovie=new Movies ({title:title, year:parseInt(year), rating:parseInt(rating)})

//         }else{
//             // movies.push({ title: title, year: parseInt(year), rating:4 });
//             newmovie=new Movies ({title:title, year:parseInt(year), rating:4})
//              }
//              const movies = await movie.save()
//              res.send({ status: 200, data: movies });
//     }else {
//         res.status(403).send({
//             status: 403,
//             error: true,
//             message:"you cannot create a movie without providing a title and a year",
//         })
//     }
// });
