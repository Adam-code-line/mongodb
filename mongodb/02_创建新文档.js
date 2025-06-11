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
    let BookModel = mongoose.model('books', BookSchema);

    //创建一个文档对象
    let book = new BookModel({
        name: '百年孤独',
        author: '加西亚·马尔克斯',
        price: 39.9,
        is_hot: true,
        tags: ['小说', '经典'], //可以添加tags字段
        // is_hot: false, //如果不传递is_hot字段，则默认值为false
        pub_time: new Date('2023-10-01'), //可以添加pub_time字段
        // pub_time: Date.now(), //如果不传递pub_time字段，则默认值为当前时间
    });

    //批量插入文档到数据库（使用await）
        await BookModel.insertMany([
        {
            name: '活着',
            author: '余华',
            price: 25.0,
            is_hot: true,
            tags: ['哲学', '人生'],
            pub_time: new Date('1993-10-1'),
        },
        {
            name: '时间简史',
            author: '斯蒂芬·霍金',
            price: 45.0,
            is_hot: true,
            tags: ['科普', '物理'],
            pub_time: new Date('1988-04-01'),
        },
    ]);

    //保存文档到数据库（使用await）
    try {
        const data = await book.save();
        console.log('保存成功', data);
    } catch (err) {
        console.log('保存失败', err);
    }
});

mongoose.connection.on('error', () => {
    console.log('数据库连接失败');
});//连接失败

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接断开');
});//断开连接