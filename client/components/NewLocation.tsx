import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import EditLocationForm from './EditLocationForm.tsx'
import { Location } from '../../models/Location.ts'
import LineupNav from './LineupNav.tsx'
import useCreateLocation from '../hooks/use-create-location.ts'

export default function NewLocation() {
  const createLocation = useCreateLocation()
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (data: Location) => {
    await createLocation.mutateAsync(data)
    navigate(`/location/${data.id}`)
  }, [])

  return (
    <>
      <LineupNav />
      <h2>New Location</h2>
      <EditLocationForm
        submitLabel="Create location"
        id={Number('')}
        name=""
        description=""
        onSubmit={handleSubmit}
      />
    </>
  )
}
