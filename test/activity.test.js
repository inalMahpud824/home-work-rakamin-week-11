const supertest = require('supertest')
const {createActivity, removeActivity, createManyActivity, getActivity} = require('./test.util')
const {app} = require('../src/index')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const payload = {
  id: 1,
  email: 'test'
}
const key = process.env.JWT_SECRET
const aksesToken = jwt.sign(payload, key,{expiresIn: '2h'});

describe('POST /activity', function() {
  afterEach(async () => {
    await removeActivity()
  })
  it('should can create activity', async () => {
    const hasil = await supertest(app)
    .post('/activity')
    .send({
      title: 'test activity'
    })
    .set('Authorization', `Bearer ${aksesToken}`)
    
    expect(hasil.status).toBe(200)
    expect(hasil.body.result.title).toBe('test activity')
    expect(hasil.body.message).toBe('create success')
  })
})

describe('GET /activity', function () {
  beforeEach(async () => {
    await createManyActivity()
  })

  afterEach(async () => {
    await removeActivity()
  })

  it('should can get all activity', async () => {
    const hasil = await supertest(app)
    .get('/activity')
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.body.message).toBe('success')
    expect(hasil.body.result.length).toBe(15)
    expect(hasil.status).toBe(200)
  })
})


describe('PUT /activity/:id', function () {
  beforeEach(async () => {
    await createActivity()
  })

  afterEach(async () => {
    await removeActivity()
  })

  it('should can update activity', async () => {
    const activityId = await getActivity()
    const hasil = await supertest(app)
    .put('/activity/' + activityId.id)
    .send({
      title: 'test update activity'
    })
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.body.message).toBe('update success')
    expect(hasil.body.result.title).toBe('test update activity')
    expect(hasil.status).toBe(200)
  })

  it('should reject if id not found', async() => {
    const hasil = await supertest(app)
    .put('/activity/' + 12)
    .send({
      title: 'test update activity'
    })
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(err.message).toBe('Activity not found')
    expect(err).toBeDefined
    expect(hasil.status).toBe(404)
  })
})

describe('DELETE /activity/:id', function () {
  beforeEach(async () => {
    await createActivity()
  })

  afterEach(async () => {
    await removeActivity()
  })

  it('should can delete activity', async () => {
    const activityId = await getActivity()
    const hasil = await supertest(app)
    .delete('/activity/' + activityId.id)
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(hasil.body.message).toBe('delete success')
    expect(hasil.status).toBe(200)
  })

  it('should reject if id not found', async() => {
    const hasil = await supertest(app)
    .put('/activity/' + 12)
    .send({
      title: 'test update activity'
    })
    .set('Authorization', `Bearer ${aksesToken}`)

    expect(err.message).toBe('Activity not found')
    expect(err).toBeDefined
    expect(hasil.status).toBe(404)
  })
})