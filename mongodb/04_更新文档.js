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

    //更新文档
    try {
        //更新一本书的价格
        const result = await BookModel.updateOne({ name: '百年孤独' }, { price: 45.0 });
        console.log('更新成功', result);
    } catch (err) {
        console.log('更新失败', err);
    }

    //批量更新文档
    try {
        //将所有价格大于30的书籍的价格增加10
        const result = await BookModel.updateMany({ price: { $gt: 30 } }, { $inc: { price: 10 } });
        console.log('批量更新成功', result);
    } catch (err) {
        console.log('批量更新失败', err);
    }

});


mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接
