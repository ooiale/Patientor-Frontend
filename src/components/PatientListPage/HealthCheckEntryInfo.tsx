import { Box, Typography } from '@mui/material'
import { Favorite } from '@mui/icons-material'

import { HealthCheckEntry, HealthCheckRating } from '../../types'

import DisplayDiagnosisCodes from './DisplayDiagnosisCodes'

const HealthCheckEntryInfo = ({ entry }: {entry: HealthCheckEntry}) => {

  const containerStyle = {
    border: '1px solid black',
    padding: '10px',
    marginBottom: '10px'
  }

  const itemsStyle = {
    marginBottom: '1px'
  }

  const healthCheckRatingArray = Object.values(HealthCheckRating)
  // [0, 1, 2, 3: health, lowrisk, highrisk, criticalrisk]
  const colorHash = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red'
  }

  return (
    <div>
      <Box style = {containerStyle}>
        <Typography variant="h5" style={itemsStyle}>
          {entry.date}
        </Typography>
        <Typography variant="body1" style={itemsStyle}>{entry.description}</Typography>
        <Typography variant="body2" style={itemsStyle}>Diagnosed by {entry.specialist}</Typography>
        <Typography variant="body2" style={itemsStyle}>
          {healthCheckRatingArray[entry.healthCheckRating]} <Favorite style={{ color: colorHash[entry.healthCheckRating] }} />
        </Typography >
        <div style={itemsStyle}>
          {entry.diagnosisCodes ? <DisplayDiagnosisCodes diagnosisCodes={entry.diagnosisCodes} /> : null}
        </div>
      </Box>
    </div>
  )
}

export default HealthCheckEntryInfo