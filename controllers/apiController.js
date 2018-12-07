const axios = require("axios");
const baseUrl = 'http://api.lib.harvard.edu/v2/items.json?limit=250&';


module.exports = {
    getData: function(req, res){
        console.log('getData function, api controller hit')
        console.log(req.body)

        const queryTitle = req.body.title_input;
        const queryName = req.body.author_input;
        const querySubject = req.body.subject_input;
        
        let title = '*';
        let name = '*';
        let subject = '*';

        

        if(queryTitle==='' && queryName==='' && querySubject===''){
            res.json({message: 'Please fill in atleast one query field.'});

            }else{

                if(queryTitle !== ''){
                    title = queryTitle;
                };
                
                if(queryName !== ''){
                    name = queryName;
                };
                if(querySubject !== ''){
                    subject = querySubject;
                };
                
                
                const queryString = `${baseUrl}title=${title}&name=${name}&subject=${subject}`
                
                console.log(`sending query url: ${queryString}`)
                axios.get(queryString)
                .then(returned => {
                    // console.log(returned.data)
                    res.json(returned.data);
                    
                });
            };
        }
}

