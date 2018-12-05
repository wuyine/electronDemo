create database if not exists jlweb;
use jlweb;

select * from users;


create database if not exists test;
use test;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(32) NOT NULL,
    sex VARCHAR(32),
    phone VARCHAR(32),
    email VARCHAR(32),
    create_time DATETIME,
    update_time DATETIME
);

CREATE TABLE IF NOT EXISTS article(
    id int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id int UNSIGNED NOT NULL,
    category_id VARCHAR(32),
    createTime DATETIME,
    update_time DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
