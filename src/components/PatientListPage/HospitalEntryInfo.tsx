import { Box, Typography } from '@mui/material'

import { HospitalEntry } from '../../types'

import DisplayDiagnosisCodes from './DisplayDiagnosisCodes'

const HospitalEntryInfo = ({ entry }: {entry: HospitalEntry}) => {

  const containerStyle = {
    border: '1px solid black',
    padding: '10px',
    marginBottom: '10px'
  }

  const itemsStyle = {
    marginBottom: '1px'
  }

  return (
    <Box style = {containerStyle}>
      <Typography variant="h5" style={itemsStyle}>{entry.date}</Typography>
      <Typography variant="body1" style={itemsStyle}>{entry.description}</Typography>
      <Typography variant="body2" style={itemsStyle}>Diagnosed by {entry.specialist}</Typography>
      <Typography variant="body2" style={itemsStyle}>
        Discharged at {entry.discharge.date} - {entry.discharge.criteria}
      </Typography >
      <div style={itemsStyle}>
        {entry.diagnosisCodes ? <DisplayDiagnosisCodes diagnosisCodes={entry.diagnosisCodes} /> : null}
      </div>
    </Box>
  )
}

export default HospitalEntryInfo