import { TextField, InputLabel } from '@mui/material'

interface Props {
  dischargeDate: string
  dischargeCriteria: string
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}

const HospitalEntryForm = ({ dischargeDate, dischargeCriteria,setDischargeDate, setDischargeCriteria }: Props) => {
  return (
    <>
      <InputLabel htmlFor="dischargeDate-input">discharge date</InputLabel>
      <TextField
        id='dischargeDate-input'
        type='date'
        value={dischargeDate}
        onChange={(e) => setDischargeDate(e.target.value)}
        fullWidth
      />
      <TextField
        type='text'
        label='discharge criteria'
        value={dischargeCriteria}
        onChange={(e) => setDischargeCriteria(e.target.value)}
        fullWidth
      />
    </>
  )
}

export default HospitalEntryForm