var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)
const shortid = require('shortid')
const monment = require('moment');
const AccountModel = require('../models/BookModel');

//记账本的列表
router.get('/account', async function(req, res, next) {
  try {
    const data = await AccountModel.find().sort({date: -1}).exec();
    res.render('list', { accounts: data ,monment: monment });
  } catch (err) {
    res.status(500).render('error', { msg: '查询失败了~~~', error: err });
  }
});

router.get('/account/create', function(req, res, next) {
  res.render('create')
});

router.post('/account', function(req, res, next) {

  //插入数据库
  AccountModel.create({
    item: req.body.item,
    date: monment(req.body.date).toDate(), // 将日期转换为Date对象
    type: req.body.type,
    amount: req.body.amount,
    note: req.body.note
  }).then(() => {

    res.render('success', { msg: '添加成功了~~~', url: '/account' });

  }).catch(err => {

    res.status(500).render('error', { msg: '添加失败了~~~', error: err });

  });
});

//删除记录
router.get('/account/:id', function(req, res, next) {
  let id = req.params.id;
 
  //删除数据库
  AccountModel.findByIdAndDelete(id).then(() => {
    //删除成功渲染成功页面
    res.render('success', { msg: '删除成功了~~~', url: '/account' });

  }).catch(err => {
    res.status(500).render('error', { msg: '删除失败了~~~', error: err});
  });
});

module.exports = router;
