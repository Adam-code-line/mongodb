// 引入mongoose模块
const mongoose = require('mongoose');

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

//导出BookModel
module.exports = BookModel;