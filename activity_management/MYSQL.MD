修改数据编码方式：ALTER TABLE 表格名 CONVERT TO CHARACTER SET gbk COLLATE gbk_chinese_ci;
修改字段长度：alter table address modify column city char(30);
直接修改类型：alter table student modify column sname varchar(20);