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

    //读取文档

    //读取单个书籍
    // try {
    //     const book = await BookModel.findOne({ name: '人性的弱点' });
    //     console.log('单个书籍:', book);
    // } catch (err) {
    //     console.log('读取失败', err);
    // }

    // try {
    //     //读取所有书籍
    //     const books = await BookModel.find({});
    //     console.log('所有书籍:', books);
    // } catch (err) {
    //     console.log('读取失败', err);
    // }

    //个性化读取,只读取名字和作者
    try {
        const books = await BookModel.find({}, 'name author');
        console.log('个性化读取:', books);
    } catch (err) {
        console.log('读取失败', err);
    }

    //价格升序排序读取
    try {
        const books = await BookModel.find({}).select({ name: 1 , author: 1 , _id: 0 }).sort({ price: 1 });
        console.log('价格升序排序读取:', books);
    } catch (err) {
        console.log('读取失败', err);
    }

    //数据截取
    try {
        const books = await BookModel.find({}).select({ name: 1 , author: 1 , _id: 0 }).sort({ price: 1 }).limit(2);
        console.log('价格升序排序读取:', books);
    } catch (err) {
        console.log('读取失败', err);
    }


});


mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接
