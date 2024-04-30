import { TextField, InputLabel, Box } from '@mui/material';

interface Props {
  employerName: string
  sickStart: string
  sickEnd: string
  setEmployerName: React.Dispatch<React.SetStateAction<string>>
  setSickStart: React.Dispatch<React.SetStateAction<string>>
  setSickEnd: React.Dispatch<React.SetStateAction<string>>
}

const OccupationalHealthcareForm = ({employerName, sickStart, sickEnd, setEmployerName, setSickStart, setSickEnd}: Props) => {

  return (
    <>
      <Box sx={{ my: 2 }} /> {/* Add margin on the y-axis */}
      <TextField
        id='employer-input'
        type='text'
        label='employer name'
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
        fullWidth
        />
      <InputLabel htmlFor="sickStart-input">sick leave start date</InputLabel>
      <TextField
        id='sickStart-input'
        type='date'
        value={sickStart}
        onChange={(e) => setSickStart(e.target.value)}
        fullWidth
      />
      <InputLabel htmlFor="sickEnd-input">sick leave end date</InputLabel>
      <TextField
        id='sickEnd-input'
        type='date'
        value={sickEnd}
        onChange={(e) => setSickEnd(e.target.value)}
        fullWidth
      />
    </>
  );
};

export default OccupationalHealthcareForm;