const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const Schema = mongoose.Schema

const RpgStats = new Schema({
    name: String,
    level: Number
})

const Message = new Schema({
    messages: String,
    created_at: Date
})

const Youtube = new Schema({
    title: String,
    url:String,
    urlPicture:String,
})

app.use(cors())

app.use(bodyParser())

mongoose.connect("mongodb://localhost/Personal_website")
mongoose.Promise = global.Promise

const database = mongoose.connection
database.on("error", console.error.bind(console, "connection error"))
database.once("open", ()=>{ console.log("database connected")})

app.listen(8080, ()=>{ console.log("listening for requests")})

const Skills = mongoose.model("Skills", RpgStats)
const Messages = mongoose.model("Messages", Message)
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
