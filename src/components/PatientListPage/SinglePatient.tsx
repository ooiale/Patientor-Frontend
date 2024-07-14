import { Typography } from '@mui/material'
import { Male, Female } from '@mui/icons-material'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Patient } from '../../types'

import patients from '../../services/patients'

import Entries from './Entries'


const SinglePatient =  () => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [dummy, setDummy] = useState(0)

  const id = useParams().id as string

  console.log('RENDER')

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientInfo =  await patients.getById(id)
        setPatient(patientInfo)
      } catch (error) {
        console.log('error:', error)
      }
    }
    fetchPatient()

  }, [id, dummy])

  if (!id || !patient) {
    return null
  }

  const genderSymbol = (gender: string) => {
    switch (gender) {
    case 'male':
      return <Male color="primary" />
    case 'female':
      return <Female color="secondary" />
    default:
      return null
    }
  }


  return (
    <div>
      <Typography variant="h5" sx={{ paddingTop: '20px', paddingBottom: '10px' }}>
        {patient.name}
        {genderSymbol(patient.gender)}
      </Typography>
      <Typography variant="body1">
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </Typography>
      <Entries entries={patient.entries} setDummy={setDummy}/>
    </div>
  )
}

export default SinglePatient