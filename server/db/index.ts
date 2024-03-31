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

export async function getLocationById(id:number) {
  const location: LocationData = await connection('locations').where('id', id).first()
  return location as Location
}

export async function updateLocation(id:number, name:string, description:string) {
  return await connection('locations').where('id', id).update('name', name).update('description', description)
}

export async function createEvent(obj:any) {
  return await connection('events')
    .insert({
      name: obj.name,
      description: obj.description,
      day: obj.day,
      location_id: obj.location_id,
      time: obj.time,
    })
    .returning('id')
}

export async function deleteEvent(id: number) {
  return await connection('events').where('id', id).del()
}

export async function getEventById(id: number) {
  return await connection('events')
  .select(
    'location_id as locationId', 
    'name', 
    'day', 
    'time', 
    'description'
    
    )
  .where('id', id).first()
}

export async function updateEvent(id: number, name: string, description: string, day: string, locationId: number, time: string) {
  return await connection('events').where('id', id).update({ name, description, day, location_id: locationId, time })
}

