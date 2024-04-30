import { InputLabel, Select, MenuItem } from '@mui/material';


interface Props {
  healthCheckRating: number
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>
}

const HealthCheckForm = ({healthCheckRating,setHealthCheckRating}: Props) => {

  const healthCheckRatingArray = [0, 1, 2, 3];

  return (
    <>
      <InputLabel htmlFor="healthCheckRating-input">Health check rating</InputLabel>
      <Select
        id='healthCheckRating-input'
        type='number'
        fullWidth
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
      >
        {Object.values(healthCheckRatingArray).map( v => 
          <MenuItem
            key={v}
            value={v}
          >
            {v}
          </MenuItem>
        )}
      </Select>
    </>
  );
};

export default HealthCheckForm;