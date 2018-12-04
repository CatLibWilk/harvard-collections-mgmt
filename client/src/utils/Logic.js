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
        console.log(datesArr.items.mods)
     
        const dates = []
        datesArr.items.mods.map(item => {

                if(item.originInfo.dateIssued){
                    console.log(item.originInfo.dateIssued)
                    console.log(typeof(item.originInfo.dateIssued))
                    if(typeof(item.originInfo.dateIssued) == 'string'){
                        const stripped = item.originInfo.dateIssued.replace(/\D/g,'');
                        const limited = stripped.slice(0,4)
                        const newItem = {'data': item, 'sort-date': limited}
                        dates.push(newItem)
                    }

                    if(typeof(item.originInfo.dateIssued) == 'object'){
                        console.log('complex standard date')

                            let sort_date
                            if(typeof(item.originInfo.dateIssued[0]) == 'string'){
                                console.log(item.originInfo.dateIssued[0])
                                const stripped = item.originInfo.dateIssued[0].replace(/\D/g,'');
                                const limited = stripped.slice(0,4)
                            
                                sort_date = limited
                            }else{
                                console.log('non-string complex')
                                sort_date = item.originInfo.dateIssued[0];

                            }
                            const newItem = {'data': item, 'sort-date': sort_date}
                            dates.push(newItem)

                    }
                }else{
                    console.log('non-standard date info')
                    console.log(item)
                }
            }
        )
           console.log(dates)
            
        const sorted = [];
        const promise = new Promise(function(res, rej) {
            
        })

        return promise;
    }
}


