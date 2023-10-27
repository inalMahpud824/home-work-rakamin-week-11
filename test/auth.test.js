const supertest = require('supertest')
const {createUser, removeUser} = require('./test.util')
const {app} = require('../src/index')

describe('POST auth/register', function(){
  afterEach(async () => {
    await removeUser()
  }) 
  it('should can register', async () => {
    const host = await supertest(app)
    .post('/auth/register')
    .send({
      email: "test",
      password: "rahasia"
    })

    expect(host.status).toBe(200)
    expect(host.body.result.email).toBe('test')
    expect(host.body.result.password).toBeUndefined()
  }) 

  it('should reject if email already registered', async() => {
    const hasil = await supertest(app)
    .post('/auth/register')
    .send({
      email: "test",
      password: "rahasia"
    })

    expect(hasil.body.result.email).toBe('test')
    expect(hasil.body.result.password).toBeUndefined()

    const server = await supertest(app)
    .post('/auth/register')
    .send({
      email: "test",
      password: "rahasia"
    })
    expect(server.status).toBe(409)
    expect(err).toBeDefined()
    expect(err.message).toBe('email already exist')
  })
})

describe('POST auth/login', function () {
  beforeEach(async() => {
    await createUser()
  })

  afterEach(async () => {
    await removeUser()
  }) 

  it('should can login', async () => {
    const hasil = await supertest(app)
    .post('/auth/login')
    .send({
      email: "test",
      password: "rahasia"
    })

    expect(hasil.status).toBe(200)
    expect(hasil.body.message).toBe('login succes')
    expect(hasil.header.authorization).toBeDefined()
  })

  it('should reject if email wrong', async() => {
    const hasil = await supertest(app)
    .post('/auth/login')
    .send({
      email: "tes",
      password: "rahasia"
    })

    expect(hasil.status).toBe(401)
    expect(err.message).toBe('email or password wrong')
  })

  it('should reject if password wrong', async() => {
    const hasil = await supertest(app)
    .post('/auth/login')
    .send({
      email: "test",
      password: "rahasia123"
    })

    expect(hasil.status).toBe(401)
    expect(err.message).toBe('email or password wrong')
  })

})


