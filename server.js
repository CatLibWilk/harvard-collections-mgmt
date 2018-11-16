require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes')


//middleware
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }


app.listen(PORT, function(){
      console.log(`listening on port ${PORT}`)
});

