const axios = require("axios");
const baseUrl = 'http://api.lib.harvard.edu/v2/items.json?';


module.exports = {
    getData: function(req, res){
        console.log('getData function, api controller hit')
        console.log(req.body)
        const queryString = `${baseUrl}q=${req.body.query}`
        console.log(`sending query url: ${queryString}`)
        axios.get(queryString)
              .then(returned => {
                    
                  res.json(returned.data)
              })
    }
}