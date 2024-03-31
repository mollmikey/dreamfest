import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventData } from '../../models/Event.ts'
import LineupNav from './LineupNav.tsx'
import { useCreateEvent } from '../hooks/api.ts'
import EditLocationForm from './EditLocationForm.tsx'

export default function NewEvent() {
  const createEvent = useCreateEvent()
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (data: EventData) => {
    await createEvent.mutateAsync(data)
    navigate(`/schedule/${data.locationId}`)
  }, [])

  return (
    <>
      <LineupNav />
      <h2>New Location</h2>
      <EditLocationForm id={0} name={''} description={''} />
    </>
  )
}
