let express = require('express')
let app = express()
let posts = require('./posts.json')
let fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req,res) {
    res.send('hello world')
})

app.post('./', function (req, res) {
    res.send("this is a post a request")
})

app.get('/posts', (req, res) => {
    return res.json({posts})
})

app.get('/posts/:id', (req, res) => {
    let id = req.params.id
    let foundUsers = posts.find(post => {
        return String(post.id) === id
    } )
    if(foundUsers){
        return res.status(200).json({posts: foundUsers})
    } else {
        return res.status(404).json({message: "not identified"})
    }
    })
    
  app.post('/posts', (req, res) => {
       console.log(req.body.newPost);
       posts.push(req.body.newPost );
       console.log({posts})
       return res.json({message: "new post created" })
  })

  app.put('/posts/:id', (req, res) => {
       let id = req.params.id;
       let foundPosts = posts.find(post => {
           return String(post.id) === req.params.id
       })
       console.log(posts.indexOf(foundPosts))
       posts.push(req.body.posts)
       console.log({posts:id})
       let userIndex = posts.indexOf(foundPosts);
       posts[userIndex].title = req.body.title
       posts[userIndex].body = req.body.body
       let update = JSON.stringify(posts, null, 2)
       fs.writeFile('posts.json', update, function(err) {
           if(err) {
               return res.status(500).json({message: err})
           }
       })
       return res.status(200).json({message: " updated files"})

    

  })


let port = app.listen(3002, (req, res) => {
    console.log("listen up")
})