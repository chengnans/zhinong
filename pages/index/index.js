// index.js
var mqtt= require('../../utils/mqtt.min.js')
 var client=null
Page({
  data: {
tempo:'0',
hum:'0',
lx:'0',
tr:'0',
eyht:'0',
led:false,
beep:false
  },
  // 事件处理函数
 
  onLoad() {
    this.connectmqtt()
  },
 connectmqtt:function(){
   var that=this
   const options={
     connectTimeout:4000,
     clientId:'cheng',
     port:8084,
     username:'d3ac73a4b1ee7335d1fcb652b57f4bf3',
     password:'demotest'
   }
   client=mqtt.connect('wxs://t.yoyolife.fun/mqtt',options)
   client.on('connect',(e)=>{
     console.log('服务器连接成功')
     client.subscribe('/iot/6254/cc',{qos:0},function(err){
       if(!err)
       {console.log('订阅成功')}
     })
   })
   //信息监听事件
   client.on('message',function(topic,message){
     let tem={}
     tem=JSON.parse(message)
     that.setData({
       tempo:tem.temp,
       hum:tem.humi,
       lx:tem.lengtn,
       tr:tem.trsd,
       eyht:tem.co
     })
     console.log(tem)
     console.log('收到'+message.toString())
   })
   client.on('reconnect',(error)=>{
     console.log('正在重新连接',error)
   })
   client.on('error',(error)=>{
    console.log('连接失败',error)
  })
 },
 onledchange:function(event){
   console.log(event.detail)
   let sw=event.detail.value
   console.log(event.detail.value)
   if(sw)
   {
    client.publish('/iot/6254/cc','{"target":"led","value":1}',function(err){
      if(!err)
      {
        console.log('成功发送指令-开')
      }
    })
   }
   else
   {
    client.publish('/iot/6254/cc','{"target":"led","value":0}',function(err){
      if(!err)
      {
        console.log('成功发送指令-关')
      }
    })
   }
 },
 onbeepchange:function(event){
  console.log(event.detail)
  let sw=event.detail.value
  console.log(event.detail.value)
  if(sw)
  {
   client.publish('/iot/6254/cc','{"target":"beep","value":1}',function(err){
     if(!err)
     {
       console.log('成功发送指令-开')
     }
   })
  }
  else
  {
   client.publish('/iot/6254/cc','{"target":"beep","value":0}',function(err){
     if(!err)
     {
       console.log('成功发送指令-关')
     }
   })
  }
}
 
})
