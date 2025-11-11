import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create GYm (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'The best gym in town for JavaScript enthusiasts.',
        phone: '123-456-7890',
        latitude: 40.7128,
        longitude: -74.006,
      })

    expect(response.statusCode).toEqual(201)
  })
})
