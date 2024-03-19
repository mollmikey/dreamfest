import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  const locations: LocationData[] = await connection('locations').select()
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events: EventData[] = await connection('events')
    .select(
    'events.id as id', 
    'day', 'time', 
    'locations.name as locationName', 
    'events.name as eventName',
    'events.description as description'
    )
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
  return events as unknown as EventWithLocation[]
}