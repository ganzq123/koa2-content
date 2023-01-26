/**
 * @description user api test
 */

const server = require('../server');

//用户信息
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
  userName,
  password,
  nickName:userName,
  gender:1
}

//存储cookie
let COOKIE = '';

//注册
test('注册功能',async()=>{
  const res = await server
      .post('/api/user/register')
      .send(testUser)
      expect(res.body.error).toBe(0)
})

//重复注册
test('重复注册',async()=>{
  const res = await server
  .post('/api/user/register')
  .send(testUser)
  expect(res.body.error).not.toBe(0);
})

//查询用户名是否存在
test('查询注册的用户名',async()=>{
  const res = await server
  .post('/api/user/isExist')
  .send({userName})
  expect(res.body.error).toBe(0);
})

//json schema 检测
test('json schema 检测',async()=>{
  const res = await server
  .post('/api/user/register')
  .send({
    userName:'123',
    password:'a',
    gender:'mail'
  })
  expect(res.body.error).not.toBe(0);
})

//登录
test('登录',async()=>{
  const res = await server
  .post('/api/user/login')
  .send({
    userName,
    password
  })
  expect(res.body.error).toBe(0);

  //获取cookie
  // COOKIE = res.headers['set-cookie']
})

//删除
test('删除用户',async()=>{
  const res = await server
  .post('/api/user/delete')
  .send({
    userName
  })
  expect(res.body.error).toBe(0);
})

//再次查询用户,应该不存在
test('再次查询',async()=>{
  const res = await server
  .post('/api/user/isExist')
  .send({userName});
  expect(res.body.error).not.toBe(0);
})