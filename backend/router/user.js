var express = require('express');
var pg = require('pg');
var router = express.Router();

var pgConfig = 'postgres://postgres:wsm123@localhost:5432/webgis';

// 获取用户信息的接口
router.get('/get', function (req, res) {
    var client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('SELECT * FROM "user" WHERE name=$1;', ['admin'], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
                res.send({
                    status: 'fail',
                    msg: 'query error',
                });
            } else {
                console.log('query sunccess,data is' + rst);
                res.send({
                    status: 'success',
                    data: rst.rows,
                });
            }
            client.end();
        });
    });
});

// 用户注册接口
router.post('/post', function (req, res) {
    var client = new pg.Client(pgConfig);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query(
            'INSERT INTO "user"(name, pwd, phone, email) VALUES ($1,$2,$3,$4);',
            ['test02', 'webgis', '345678', '345678@qq.com'],
            function (isErr, rst) {
                if (isErr) {
                    console.log('query error:' + isErr.message);
                    res.send({
                        status: 'fail',
                        msg: 'insert error',
                    });
                } else {
                    console.log('query sunccess,data is' + rst);
                    res.send({
                        status: 'success',
                        data: [],
                    });
                }
                client.end();
            },
        );
    });
});

module.exports = router;
