修改数据编码方式：ALTER TABLE 表格名 CONVERT TO CHARACTER SET gbk COLLATE gbk_chinese_ci;
修改字段长度：alter table address modify column city char(30);
直接修改类型：alter table student modify column sname varchar(20);
新镇列: alter table active_type add column img varchar(20);

阿里云服务器使用：
1. git bash登录 ssh root@116.62.144.71
2. mysql的守护进程是mysqld，所以
systemctl start mysqld   // 启动服务
systemctl status mysqld  // 查看进程状态
3. 开启3306端口
firewall-cmd --add-port=3306/tcp
4. 查看防火墙状态
service iptables status
```js
[ { duration: '120',
    start_time: '2020-11-19',
    community_ID: '6',
    type_name: '社会实践',
    user_ID: '23',
    type_ID: '1',
    community_name: '学生会',
    name: '华为财经2020届招牌宣讲会',
    ID: '5',
    point: '4.0',
    status: '1' },
  { duration: '120',
    start_time: '2020-01-25',
    community_ID: '11',
    type_name: '创新创业',
    user_ID: '22',
    type_ID: '2',
    community_name: '绿派社',
    name: '湿地使者行动',
    ID: '24',
    point: '2.0',
    status: '7' },
  { duration: '120',
    start_time: '2020-01-18',
    community_ID: '12',
    type_name: '社会实践',
    user_ID: '4',
    type_ID: '1',
    community_name: '轮滑社',
    name: '轮聚你我，滑动青春',
    ID: '7',
    point: '1.0',
    status: '2' },
  { duration: '120',
    start_time: '2019-12-27',
    community_ID: '5',
    type_name: '社会实践',
    user_ID: '4',
    type_ID: '1',
    community_name: '青协',
    name: '南昌火车站迎新',
    ID: '10',
    point: '2.5',
    status: '3' },
  { duration: '120',
    start_time: '2019-12-23',
    community_ID: '6',
    type_name: '社会实践',
    user_ID: '23',
    type_ID: '1',
    community_name: '学生会',
    name: '华为财经HR与你畅聊职业规划',
    ID: '3',
    point: '1.5',
    status: '1' }]
```