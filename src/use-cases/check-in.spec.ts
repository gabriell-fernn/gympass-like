import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -16.7300426,
      longitude: -49.2836511,
    })

    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -16.7300426,
      userLongitude: -49.2836511,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -16.7300426,
      userLongitude: -49.2836511,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -16.7300426,
        userLongitude: -49.2836511,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -16.7300426,
      userLongitude: -49.2836511,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distante gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-16.723804000548817),
      longitude: new Decimal(-49.26076171300568),
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -16.7300426,
        userLongitude: -49.2836511,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
