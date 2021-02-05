const express = require('express')
const app = express()
var moment = require("moment"); 

app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://172.17.61.25:27017/olt', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
const OnuPreconfig = mongoose.model('OnuPreconfig', new mongoose.Schema({
    mac: { type: String , required: true, index: true },
    lanport: { type: Number },
    vlanmode: { type: String },
    servicetype: { type: String },
    vlanid: { type: Number },
    createtime: { type: Date, default:Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm')},
    status: { type:Boolean , default: false, get: v => {
        if(v == true) return '已完成'
        else return '未配置'
    } },
    finishtime: { type: Date },
},
{
    toJSON: {getters: true}
}))

app.get('/', async (req, res) => {
    res.send('index')
})
app.post('/api/onu/preconfig', async (req, res) => {
    const preconfig = await OnuPreconfig.create(req.body)
    res.send(preconfig)
})

app.get('/api/onu/preconfig', async(req,res)=>{
    let preconfigs = await OnuPreconfig.find()
    res.send(preconfigs)
})

app.delete('/api/onu/preconfig/:id', async(req,res)=> {
    await OnuPreconfig.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

app.get('/api/onu/preconfig/:id', async(req,res)=> {
    let preconfig = await OnuPreconfig.findById(req.params.id)
 //   preconfig = preconfig.toJSON({getters: true})
    console.log(preconfig)
    res.send(preconfig)
})

app.put('/api/onu/preconfig/:id', async(req,res)=> {
    const preconfig = await OnuPreconfig.findByIdAndUpdate(req.params.id, req.body)
    res.send(preconfig)
})

app.listen(3001, () => {
    console.log('http://localhost:3001/')
})
