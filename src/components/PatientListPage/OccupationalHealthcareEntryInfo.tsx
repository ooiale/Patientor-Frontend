import { Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

import DisplayDiagnosisCodes from './DisplayDiagnosisCodes'

import { OccupationalHealthcareEntry } from '../../types'


const OccupationalHealthcareEntryInfo = ({ entry }: {entry: OccupationalHealthcareEntry}) => {

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
      <Typography variant="h5" style={itemsStyle}>
        {entry.date} <WorkOutlineIcon /> {entry.employerName}
      </Typography>
      <Typography variant="body1" style={itemsStyle}>{entry.description}</Typography>
      <Typography variant="body2" style={itemsStyle}>Diagnosed by {entry.specialist}</Typography>
      <Typography variant="body2" style={itemsStyle}>
        sick leave period: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
      </Typography >
      <div style={itemsStyle}>
        {entry.diagnosisCodes ? <DisplayDiagnosisCodes diagnosisCodes={entry.diagnosisCodes} /> : null}
      </div>
    </Box>
  )
}

export default OccupationalHealthcareEntryInfo