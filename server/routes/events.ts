import express from 'express'

import { validateDay } from './helpers.ts'

import * as db from '../db/index.ts'

const router = express.Router()
export default router

router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const location = Number(locationId)
    const day = validateDay(req.body.day)
    const id = 0
    // TODO: call your new db.addNewEvent function and use the returned ID
    const newObj = { name, description, time, location_id: location, day }
    const newEvent = db.createEvent(newObj)
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json(newEvent)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // TODO: DELETE the event with this matching ID
    await db.deleteEvent(id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // TODO: Replace event below with the event from the database using its id
    // NOTE: It should have the same shape as this one
    const event = await db.getEventById(id)
    if (!event) {
      res.sendStatus(404)
      return
    }
    // TODO: if there's no event with that id, respond with a 404 instead
    res.json(event)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)

    // TODO: UPDATE the event in the db with the matching ID using these details,
    // if no event has a matching id, respond with a 404 instead
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
