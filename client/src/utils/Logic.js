import { OutgoingMessage } from "http";

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

    dateSort: function(datesArr, input_range){
        console.log(`uptop datesArr`)
        console.log(datesArr.items.mods)
        
        const range = input_range;
        const dates = []
        let newItem
        let sort_date
        
        console.log(range)
        
        datesArr.items.mods.map(item => {

                if(item.originInfo.dateIssued){
                    

                    console.log(item.originInfo.dateIssued)
                    console.log(typeof(item.originInfo.dateIssued))
                    if(typeof(item.originInfo.dateIssued) == 'string'){
                        const stripped = item.originInfo.dateIssued.replace(/\D/g,'');
                        const limited = parseInt(stripped.slice(0,4))
                        const newItem = {'data': item, 'sort_date': limited}
                        dates.push(newItem)
                    }

                    if(typeof(item.originInfo.dateIssued) == 'object'){
                        console.log('complex standard date')

                            
                            if(typeof(item.originInfo.dateIssued[0]) == 'string'){
                                console.log(item.originInfo.dateIssued[0])
                                const stripped = item.originInfo.dateIssued[0].replace(/\D/g,'');
                                const limited = stripped.slice(0,4)
                            
                                sort_date = parseInt(limited)
                            }else{
                                console.log('non-string complex')
                                sort_date = parseInt(item.originInfo.dateIssued[0]);

                            }
                            newItem = {'data': item, 'sort_date': sort_date}
                            dates.push(newItem)

                    }
                }else{
                    console.log('non-standard date info')
                    console.log(item)
                    console.log(item.originInfo)
                    if(item.originInfo[0].dateIssued['#text']){
                        console.log('nested marc info date')
                        
                        console.log(item.originInfo[0].dateIssued['#text'])
                        sort_date = parseInt(item.originInfo[0].dateIssued['#text'])
                    }else{
                        console.log(item.originInfo[0].dateIssued[0]['#text'])
                       sort_date = parseInt(item.originInfo[0].dateIssued[0]['#text'])
                    }
                        newItem = {'data': item, 'sort_date': sort_date};
                        dates.push(newItem)
                }
            }
        )
            console.log(dates)
           this.sortFunction(dates, range)
                .then(result => {
                    console.log(result)
                })
        const sorted = [];
        
    },

   sortFunction: function(dates, range){
       return new Promise(function(res, rej){
        
        const limiter = (new Date().getFullYear())-range
        console.log(limiter)
        const limitedArray =
        dates.filter(item => item.sort_date > limiter ? true : false
        )
        res(limitedArray)

       })
   }
}


