const express = require('express')
var _ = require('lodash');
const app = express()
var moment = require("moment");

app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://172.17.61.25:27017/olt', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const OnuPreconfig = mongoose.model('OnuPreconfig', new mongoose.Schema({
    mac: { type: String, required: true, index: true },
    lanport: { type: Number },
    vlanmode: { type: String },
    servicetype: { type: String },
    vlanid: { type: Number },
    createtime: { type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm') },
    status: { type: Boolean, default: false },
    finishtime: { type: Date },
},
    {
        toJSON: { getters: true }
    }
))
/*   status: {
       type: Boolean, default: false, get: v => {
           if (v == true) return '已完成'
           else return '未配置'
       }
   },
*/
const OltInfo = mongoose.model('OltInfo', new mongoose.Schema({
    name: { type: String, required: true, index: true },
    ipaddr: { type: String, required: true, },
    snmpro: { type: String },
    snmprw: { type: String },
    areaid: { type: String }
}
))
const Area = mongoose.model('Area', new mongoose.Schema({
    name: { type: String, required: true, index: true },
    level: { type: Number, required: true, },
    belongtoid: { type: String }
}
))


app.get('/', async (req, res) => {
    res.send('')
})

app.post('/api/area/', async (req, res) => {
    const area = await Area.create(req.body)
    res.send({
        status: true
    })
})

//新增ONU预配置
app.post('/api/onu/preconfig', async (req, res) => {
    const preconfig = await OnuPreconfig.create(req.body)
    res.send({
        status: true
    })
})

//获取所有ONU预配置
app.get('/api/onu/preconfig', async (req, res) => {
    const preconfigs = await OnuPreconfig.find()
    console.log(preconfigs)
    res.send(preconfigs)
})

//删除ONU预配置
app.delete('/api/onu/preconfig/:id', async (req, res) => {
    await OnuPreconfig.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

//获取ONU预配置
app.get('/api/onu/preconfig/:id', async (req, res) => {
    const preconfig = await OnuPreconfig.findById(req.params.id)
    res.send(preconfig)
})

//搜索ONU预配置
app.get('/api/onu/preconfig/searchmac/:mac', async (req, res) => {
    const preconfig = await OnuPreconfig.find({ mac: { $regex: req.params.mac } })
    //   preconfig = preconfig.toJSON({getters: true})
    console.log(preconfig)
    res.send(preconfig)
})

//修改ONU预配置
app.put('/api/onu/preconfig/:id', async (req, res) => {
    const preconfig = await OnuPreconfig.findByIdAndUpdate(req.params.id, _.pick(req.body, ['mac', 'lanport', 'vlanmode', 'servicetype', 'vlanid']))
    res.send({
        status: true
    })
})

app.listen(3001, () => {
    console.log('http://localhost:3001/')
})
