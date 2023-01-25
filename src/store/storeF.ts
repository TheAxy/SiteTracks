import { observable, action } from 'mobx';

const genius = require('genius-lyrics-api')

const Store = observable ({
    options : {
        apiKey: 'AWRZQ3r57Gh2ZMQUG1SrrCPiCqrQgp1DzFEHU1cO_ex2rKDJfYIDuA0Pp4-rVJml', 
        title: '',
        artist: '',
        optimizeQuery: true
    },
    activeTitle : '',
    resPost: [{
        rPost:'',
        rTitle:''
    }],
    lyrics : '',
    
    setPost: action((arr: string[]) => {
        arr.forEach(p => {
            Store.resPost.push({rPost: p, rTitle: Store.activeTitle})
        })
    }),
    setTitleOption: action((title: string) => {
        Store.options.title = title
    }),
    setTitleActive: action((title: string) => {
        Store.activeTitle = title
    }),
    setLyrics: action((payload: string) => {
        Store.lyrics = payload
    }),
    setArtist: action((payload: string) => {
        Store.options.artist = payload
    }),

    clearPost: action(() => {
        Store.resPost = []
    }),

    CheckRepeat: action((posts: string[]): string[] => {
        return Array.from(new Set(posts))
    }),

    Change: action(async(title: string, artist: string) => {
        Store.setTitleOption(title)
        Store.setArtist(artist)
        await genius.getSong(Store.options).then((song: any) => {
            return Store.setLyrics(`${song.lyrics}`)   
        })
        Store.setTitleActive(title)
    }),

    Search: action((what: string) => {
        let a = [];
        if (Store.lyrics.length !== 0){
            let lastIndex = -1
            while ((lastIndex = Store.lyrics.indexOf(what, lastIndex + 1)) !== -1) {
                a.push(lastIndex)
            }
        }
        return a
    }),

    Line: action((what: string) => {
        const findResult = Store.Search(what.toLowerCase())
        const transfer = Store.Transfer(Store.lyrics.toLowerCase())

        let result: any = {}
    
        for (let i = 0; i < findResult.length; i++) {
          const element = findResult[i];
          for (let j = 0; j < transfer.length-1; j++) {
            const length = Object.keys(result).length
            if (transfer[j] <= element && transfer[j+1] >= element){
              if (length === 0 || transfer[j] > result[length-1][0]){
                result[length] = [transfer[j], transfer[j+1]]
              }
            }
          }
        }
        Store.Slice(result, Store.lyrics)
    }),

    Slice: action((arr: any[], str: string) => {
        let a: string[] = []
        Object.values(arr).map(post => {
            a = [...a, str.slice(post[0], post[1])]
        })
        a = Store.CheckRepeat(a)
        Store.setPost(a)
    }),

    Transfer: action((str: string) => {
        let a = []
        for(let i = 0; i < Store.lyrics.length; i++){
          if (Store.lyrics[i] === '\n') a.push(i)
        }
        return a
    }),

    Final: action((word: string, artist: string, title: string) => {
        let arr: any = ''
        Store.clearPost()
        if (word && title && artist) {
            arr = new Promise(async(resolve, reject) => {
                await Store.Change(title, artist)
                Store.Line(word)
                return resolve(null)
            })
        }
        return arr
    }),
})

export default Store;