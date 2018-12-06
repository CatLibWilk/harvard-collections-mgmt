import { OutgoingMessage } from "http";

export default {
    getBasicBib: function(titlesArr){
        console.log(titlesArr)
        const processedItems = [];
        let sort_date
        let retrievedTitle = ''

        const promise = new Promise(function(res, rej) {
            const items = titlesArr.items.mods
            items.forEach(item => {
                const newItem = {
                    title: '',
                    author: '',
                    pubDate: '',
                    raw: item
                }
                ///title retrieve
                if(item.titleInfo.title){
                        retrievedTitle = item.titleInfo.title
                        
                    }else{
                        retrievedTitle = item.titleInfo[0].title
                        
                    }
                
                if(retrievedTitle.length<100){
                    newItem.title = retrievedTitle
                }else{
                    newItem.title = `${retrievedTitle.slice(0,101)}...`
                }

                //author retrieve
                if(item.name){
                    console.log(item)
                    console.log(`item.name is a ${typeof(item.name)}`)
                    console.log(item.name.length)
                    if(item.name.length > 1) {
                        console.log(item.name[0])
                        if(typeof(item.name[0].namePart) == 'string'){
                            newItem.author = item.name[0].namePart
                        }else{
                            newItem.author = item.name[0].namePart[0]
                        }
                    }else{
                        newItem.author = item.name.namePart[0];
                    }
                    }

               
                
                
                

                ///date retrieve
                if(item.originInfo.dateIssued){
                        
                        console.log(item.originInfo.dateIssued)
                        console.log(typeof(item.originInfo.dateIssued))
                        if(typeof(item.originInfo.dateIssued) == 'string'){
                            const stripped = item.originInfo.dateIssued.replace(/\D/g,'');
                            const limited = parseInt(stripped.slice(0,4))

                            newItem.pubDate = limited;
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
                                newItem.pubDate = sort_date;

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
                            
                            newItem.pubDate = sort_date
                    }
                    processedItems.push(newItem)

            })
            res(processedItems)
        })
        
        return promise
    },

    dateSort: function(datesArr, input_range){
        console.log(datesArr.items.mods)
        
        const range = input_range;
        const dates = []
        let newItem
        let sort_date
        
        const filtered = new Promise(function(res, rej){
            
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
            );

            console.log(dates)
            const sortFunction = function(dates, range){
                return new Promise(function(res, rej){
                    
                    const limiter = (new Date().getFullYear())-range

                    const limitedArray = dates.filter(item => item.sort_date > limiter ? true : false)
            
                    res(limitedArray)
            
                })
            }

            sortFunction(dates, range)
                .then(result => {
                    res(result)
                })
        
        })
        return filtered;
    },


   
}


