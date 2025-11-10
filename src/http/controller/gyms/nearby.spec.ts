import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'The best gym in town for JavaScript enthusiasts.',
        phone: '123-456-7890',
        latitude: 40.7128,
        longitude: -74.006,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'The best gym in town for JavaScript enthusiasts.',
        phone: '123-456-7890',
        latitude: -16.33147141163066,
        longitude: -48.94483118610259,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 40.7128,
        longitude: -74.006,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
