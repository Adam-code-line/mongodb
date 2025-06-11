//导入mongoose
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/learn')

//设置回调
mongoose.connection.once('connected', () => {
    console.log('数据库连接成功');//连接成功
});

mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接