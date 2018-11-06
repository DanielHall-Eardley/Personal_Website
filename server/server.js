const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const nodeMailer = require("nodemailer")
const password = require("../src/config.js")
const PORT = process.env.PORT || 8080

const Schema = mongoose.Schema

const RpgStats = new Schema({
    name: String,
    level: Number
})

const Youtube = new Schema({
    title: String,
    url:String,
    urlPicture:String,
})

app.use(cors())

app.use(bodyParser())

app.use(express.static("/home/ubuntu/src/build"))

mongoose.connect("mongodb://localhost:27017/src")
mongoose.Promise = global.Promise

const database = mongoose.connection
database.on("error", console.error.bind(console, "connection error"))
database.once("open", ()=>{ console.log("database connected")})

app.listen(PORT, ()=>{ console.log("listening for requests")})

const Skills = mongoose.model("Skills", RpgStats)
const YoutubeSearch = mongoose.model("YoutubeSearch", Youtube)

app.post("/Update", (req, res)=>{
    Skills({
        name: req.body.name,
        level: req.body.level
    }).save()
    .then(()=>{
        Skills.find({}).then(skills=>{
           res.send(skills)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.get("/Update", (req, res)=>{
    Skills.find({}).then(skills=>{
        res.send(skills)
    })
})

app.put("/Update", (req, res)=>{
    let query = {name: req.body.name}
    let update = {
        level: req.body.level
    }
    Skills.findOneAndUpdate(query, update, {runValidators:true, new:true})
    .then(()=>{
        Skills.find({}).then(skills=>{
           res.send(skills)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.delete("/Update", (req, res)=>{
    Skills.deleteOne({name: req.body.name})
    .then(()=>{
        Skills.find({}).then(skills=>{
           res.send(skills)
        })
    }).catch(err=>{
        console.log(err)
    })
})


app.post("/Search", (req, res)=>{
    YoutubeSearch({
        title: req.body.title,
        url: req.body.url,
        urlPicture: req.body.urlPicture
    }).save()
    .then(()=>{
        YoutubeSearch.find({}).then(likes=>{
           res.send(likes)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.get("/Search", (req, res)=>{
    YoutubeSearch.find({}).then(likes=>{
        res.send(likes)
    })
})

app.put("/Search", (req, res)=>{
    let query = {title: req.body.title}
    let update = {
        url: req.body.url,
        urlPicture: req.body.urlPicture
    }
    YoutubeSearch.findOneAndUpdate(query, update, {runValidators:true, new:true})
    .then(()=>{
        YoutubeSearch.find({}).then(likes=>{
           res.send(likes)
        })
    }).catch(err=>{
        console.log(err)
    })
})

app.delete("/Search", (req, res)=>{
    YoutubeSearch.deleteOne({title: req.body.title})
    .then(()=>{
        YoutubeSearch.find({}).then(likes=>{
           res.send(likes)
        })
    }).catch(err=>{
        console.log(err)
    })
})

let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth:{
      user: "danielhellcat.web.dev@gmail.com",
      pass: password.hardcodedPassword,
    },
})
  
app.post("/Email", async(req, res)=>{
  let emailData = {
    to: "350chevy8@gmail.com",
    subject: req.body.subject,
    html: `<h3>${req.body.name}</h3><p>${req.body.message}</p><p>${req.body.email}</p>`
  }
  let result = await emailData
  transporter.sendMail(result, (err, info)=>{
    if(err){
      res.send("There was a problem sending your message")
      console.log(err)
    }else if(info){
      res.send("Message sent!")
      console.log(info)
    }
  })
})

app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + '../build'});
});
  
