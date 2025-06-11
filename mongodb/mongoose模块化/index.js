//导入db
const db = require('./db/db');
//导入mongoose
const mongoose = require('mongoose');
//导入BookModel
const BookModel = require('./models/BookModel');

//调用db函数，传入成功和错误回调
db(async () => {
    console.log('数据库连接成功');

    let book = new BookModel({
        name: '百年孤独',
        author: '加西亚·马尔克斯',
        price: 39.9,
        is_hot: true,
        tags: ['小说', '经典'],
        pub_time: new Date('2023-10-01'),
    });

    try {
        const doc = await BookModel.create(book);
        console.log('保存成功', doc);
    } catch (err) {
        console.log('保存失败', err);
    }
}, () => {
    console.log('数据库连接失败');
});

