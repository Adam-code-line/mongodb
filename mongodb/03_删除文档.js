//导入mongoose
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/learn')

//设置回调
mongoose.connection.once('connected', async () => {

    console.log('数据库连接成功');//连接成功

    //创建一个Schema对象
    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: {
            type: Boolean,
            default: false, //默认值为false
            // required: true, //必填项
        },
        tags: {
            type: [String], //数组类型，元素为字符串
            default: [], //默认值为空数组
        },
        pub_time: {
            type: Date,
            default: Date.now, //默认值为当前时间
        },
    });

    //创建一个Model对象
    let BookModel = mongoose.model('novels', BookSchema);


    //删除文档
    try {
        //删除人的弱点这本书
        const result = await BookModel.deleteOne({ name: '人性的弱点' });
        console.log('删除成功', result);
    } catch (err) {
        console.log('删除失败', err);
    }

    //批量删除文档
    try {
        //删除所有价格大于30的书籍
        const result = await BookModel.deleteMany({ price: { $gt: 30 } });
        console.log('批量删除成功', result);
    } catch (err) {
        console.log('批量删除失败', err);
    }
});


mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接
