const {app} = require('../src/index')
const supertest = require('supertest')
const {createActivity, removeActivity, removeItem, createItem, getItem} = require('./test.util')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
  id: 1,
  email: 'test'
}
const key = process.env.JWT_SECRET
const aksesToken = jwt.sign(payload, key,{expiresIn: '2h'});


describe('POST /items' , function() {
  afterEach( async () => {
    removeItem(),
    removeActivity()
  })
  it('should can create item', async () => {
    const activityId = await createActivity()
    console.log(activityId.id)
    const hasil = await supertest(app)
    .post('/items')
    .send({
      activity_id: activityId.id,
      title: 'test',
      isActive: true
    })
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(200)
    expect(hasil.body.result.activity_id).toBe(parseInt(`${activityId.id}`))
    expect(hasil.body.result.title).toBe('test')
    expect(hasil.body.result.isActive).toBe(true)
    expect(hasil.body.message).toBe('create success')

  })
})


describe('GET /items' , function() {
  beforeEach(async () => {
    const aktifitas = await createActivity()
    const id = parseInt(aktifitas.id)
    await createItem(id)
  })
  afterEach( async () => {
    removeItem(),
    removeActivity()
  })
  it('should can get item', async () => {
    const hasil = await supertest(app)
    .get('/items')
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(200)
    expect(hasil.body.result).toBeDefined()
    expect(hasil.body.message).toBe('success')
  })
})

describe('GET /items/:id' , function() {
  beforeEach(async () => {
    const aktifitas = await createActivity()
    const id = parseInt(aktifitas.id)
    await createItem(id)
  })
  afterEach( async () => {
    removeItem(),
    removeActivity()
  })
  it('should can get item by id', async () => {
    const itemId = await getItem()
    const hasil = await supertest(app)
    .get('/items/' + itemId.id)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(200)
    expect(hasil.body.result).toBeDefined()
    expect(hasil.body.message).toBe('success')
  })

  it('should reject if id item not found', async () => {
    const hasil = await supertest(app)
    .get('/items/' + 0)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(404)
    expect(hasil.body.result).toBeUndefined()
    expect(err.message).toBe('Item not found')
  })
})


describe('PUT /items/:id' , function() {
  beforeEach(async () => {
    const aktifitas = await createActivity()
    const id = parseInt(aktifitas.id)
    await createItem(id)
  })
  afterEach( async () => {
    removeItem(),
    removeActivity()
  })

  it('should can update by id', async () => {
    const itemId = await getItem()
    const hasil = await supertest(app)
    .put('/items/' + itemId.id)
    .send({
      title: 'test update item'
    })
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(200)
    expect(hasil.body.result).toBeDefined()
    expect(hasil.body.result.title).toBe('test update item')
    expect(hasil.body.message).toBe('update success')
  })

  it('should reject if id item not found', async () => {
    const hasil = await supertest(app)
    .put('/items/' + 0)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(404)
    expect(hasil.body.result).toBeUndefined()
    expect(err.message).toBe('Item not found')
  })
})



describe('DELETE /items/:id' , function() {
  beforeEach(async () => {
    const aktifitas = await createActivity()
    const id = parseInt(aktifitas.id)
    await createItem(id)
  })
  afterEach( async () => {
    removeItem(),
    removeActivity()
  })
  it('should can delete by id', async () => {
    const itemId = await getItem()
    const hasil = await supertest(app)
    .delete('/items/' + itemId.id)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(200)
    expect(hasil.body.message).toBe('delete success')
  })

  it('should reject if id item not found', async () => {
    const hasil = await supertest(app)
    .delete('/items/' + 0)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.status).toBe(404)
    expect(hasil.body.result).toBeUndefined()
    expect(err.message).toBe('Item not found')
  })
})


