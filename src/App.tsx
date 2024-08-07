import { Button, Divider, Container, Typography, Alert } from '@mui/material'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import axios from 'axios'

import { apiBaseUrl } from './constants'

import { Patient } from './types'

import patientService from './services/patients'

import PatientListPage from './components/PatientListPage'
import SinglePatient from './components/PatientListPage/SinglePatient'

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const patients = await patientService.getAll()
        setPatients(patients)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
        } else {
          console.log('something went wrong')
        }
      }
    }
    void fetchPatientList()
  }, [])

  const failedToFetch = () => {
    return (
      <Alert severity="error" style={{ marginTop: '1em' }}>
        Failed to fetch data from the backend. Please check your connection or try again later.
      </Alert>
    )
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element = {<SinglePatient />}/>
          </Routes>
          {patients.length === 0 ? failedToFetch() : null}
        </Container>
      </Router>
    </div>
  )
}

export default App
