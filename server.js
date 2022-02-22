let express = require("express");
 

let data = require("./data.json");
let server = express();


server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
}) 

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

 