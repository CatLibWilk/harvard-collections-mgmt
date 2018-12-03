export default {
    getTitles: function(titlesArr){
        const titles = [];
        const promise = new Promise(function(res, rej) {
            const items = titlesArr.items.mods
            items.forEach(item => {
                if(item.titleInfo.title){
                    titles.push(item.titleInfo.title)
                }
            })
            res(titles)
        })
        
        return promise
    },

    dateSort: function(datesArr){
        console.log(`uptop datesArr`)
        console.log(datesArr)
     
        const dates = []
        datesArr.items.mods.map(item => {
        
                if(item.originInfo.dateIssued){
                    if(typeof(item.originInfo.dateIssued) === 'object'){
                        const str = item.originInfo.dateIssued[0].toString();
                        const stripped = str.replace(/\D/g,'');
                        console.log(stripped)
                    }
                    if(typeof(item.originInfo.dateIssued) === 'string'){
                        dates.push(item.originInfo.dateIssued)
                    }
                }
            })
            console.log(dates)

        
        const sorted = [];
        const promise = new Promise(function(res, rej) {
            
        })

        return promise;
    }
}


  