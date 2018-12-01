export default {
    getTitles: function(test){
        const titles = [];
        const promise = new Promise(function(res, rej) {
            const items = test.items.mods
            items.forEach(item => {
                if(item.titleInfo.title){
                    titles.push(item.titleInfo.title)
                }
            })
            res(titles)
        })
        
        return promise
    }
}


  