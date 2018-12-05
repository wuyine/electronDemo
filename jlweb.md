### 需要的表
1. 用户表 -> user 登录用户可以后台编辑
```
id: 主键
username: 用户名
password: 密码
createTime: 创建时间
nickname: 昵称
其他信息
```
2. 文章表 -> article 
```
id: 主键
title：标题
content：内容
creator_id: 创建者id
creator_name: 创建者姓名
creator_nickname: 创建者昵称
createTime: 创建时间
updateTime: 更新时间

```

3. 评论留言表 -> comment
```
id：主键
topic_id: 主题id
topic_type: 主题type
content：评论内容
form_uid 评论用户
to_uid 评论目标用户id

```