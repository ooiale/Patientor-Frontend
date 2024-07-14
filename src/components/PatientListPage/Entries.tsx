import { Typography } from '@mui/material'

import HealthCheckEntryInfo from './HealthCheckEntryInfo'
import HospitalEntryInfo from './HospitalEntryInfo'
import OccupationalHealthcareEntryInfo
  from './OccupationalHealthcareEntryInfo'

import EntriesModal from '../AddEntryModal/EntriesModal'

import { Entry } from '../../types'

interface Props {
  entries: Entry[]
  setDummy: React.Dispatch<React.SetStateAction<number>>
}

const Entries = ({ entries, setDummy }: Props) => {

  function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`)
  }


  const displayEntryInfo = (entry: Entry) => {
    switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryInfo entry={entry} key={entry.id}/>
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryInfo entry={entry} key={entry.id}/>
    case 'HealthCheck':
      return <HealthCheckEntryInfo entry={entry} key={entry.id} />
    default:
      assertNever(entry)
    }
  }

  return (
    <div>
      <EntriesModal setDummy={setDummy}/>
      <Typography variant="h5" sx={{ paddingTop: '20px', paddingBottom: '10px' }}>
        entries
      </Typography>
      <div >
        {entries.map(e => displayEntryInfo(e))}
      </div>
    </div>
  )
}

export default Entries