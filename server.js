require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi')
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }


  app.listen(PORT, function(){
      console.log(`listening on port ${PORT}`)
  });

