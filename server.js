let express = require("express");
const { append } = require("express/lib/response");

let data = require("./data.json");

//ek naya server bnade but ye sirf create krti use chalu nhi krti
let server = express();
const cors = require("cors");
 
server.use(
  cors({
    origin: "*",
  })

)

server.get("/movies", function (req, res) {
  res.json(data);
});

server.get("/genre", function (req, res) {
  let allGenreObjects = data.map(function (el) {
    return el.genre;
  });

  let uniqueGenreObjects = [];

  for (let i = 0; i < allGenreObjects.length; i++) {
    let genreId = allGenreObjects[i]["_id"];

    let index = uniqueGenreObjects.findIndex(function (el) {
      return el._id == genreId;
    });

    if (index == -1) {
      uniqueGenreObjects.push(allGenreObjects[i]);
    }
  }

  res.json(uniqueGenreObjects);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`server running`);
});

 