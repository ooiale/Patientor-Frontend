import { Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';

import axios from 'axios';

import { useState, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';

import patients from '../../services/patients';

import { EntryWithoutId } from '../../types';

import HospitalEntryForm from './HospitalEntryForm';
import HealthCheckForm from './HealthCheckForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';


interface Props {
  handleCloseModal: () => void
  setError: React.Dispatch<React.SetStateAction<string>>
  setDummy: React.Dispatch<React.SetStateAction<number>>
}

const EntriesForm =  ({handleCloseModal, setError, setDummy}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [healthCheckRating, setHealthcheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickStart, setSickStart] = useState('');
  const [sickEnd, setSickEnd] = useState('');

  const id = useParams().id;
  const typeArray = ["OccupationalHealthcare", "HealthCheck", "Hospital"];

  const displayError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const diagnosisCodesArray = diagnosisCodes 
      ?diagnosisCodes.split(' ')
      :[];

    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria
    };

    const sickLeave = {
      startDate: sickStart,
      endDate: sickEnd
    };

    let entryObject;
    switch (type) {
      case 'Hospital':
        entryObject = {
          description,
          date,
          specialist,
          type,
          ...(diagnosisCodesArray.length > 0 ? { diagnosisCodes: diagnosisCodesArray } : {}),
          ...(discharge.date && discharge.criteria ? { discharge: discharge } : {}),
        };
        break;
      case 'HealthCheck':
        entryObject = {
          description,
          date,
          specialist,
          type,
          ...(diagnosisCodesArray.length > 0 ? { diagnosisCodes: diagnosisCodesArray } : {}),
          healthCheckRating
        };
        break;
      case 'OccupationalHealthcare':
        entryObject = {
          description,
          date,
          specialist,
          type,
          ...(diagnosisCodesArray.length > 0 ? { diagnosisCodes: diagnosisCodesArray } : {}),
          ...(employerName ? { employerName: employerName } : {}),
          ...(sickLeave.startDate !== '' && sickLeave.endDate !== ''
            ? {sickLeave: sickLeave}
            : {}
          )
        };
        break;
      default:
        setError('missing type or is invalid');
        break;
    }

    if (!id) return null;
  
    try {
      await patients.addNewEntry(id, entryObject as EntryWithoutId);
      console.log('sent', entryObject);
      setDummy(Math.floor(Math.random() * 1000) + 1);
      handleCloseModal(); // Close the modal after form submission
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error.response.data === 'string') {
          displayError(error.response.data);
          console.log('error: ', error.response.data);
        } else {
          displayError('unrecognized axios error');
          console.log('unrecognized axios error');
        }
      }else {
        displayError('unknown error');
        console.log('unknown error');
      }
    }
  };

  const displaySpecificForm = () => {
    switch (type) {
      case 'Hospital':
        return <HospitalEntryForm 
          dischargeDate={dischargeDate}
          dischargeCriteria={dischargeCriteria}
          setDischargeDate={setDischargeDate}
          setDischargeCriteria={setDischargeCriteria}
        />;
      case 'HealthCheck':
        return <HealthCheckForm 
          healthCheckRating = {healthCheckRating}
          setHealthCheckRating = {setHealthcheckRating}
          />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareForm 
          employerName={employerName}
          sickStart={sickStart}
          sickEnd={sickEnd}
          setEmployerName={setEmployerName}
          setSickStart={setSickStart}
          setSickEnd={setSickEnd}
          />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <InputLabel htmlFor="date-input">Date</InputLabel>
      <TextField
        id='date-input'
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
      <TextField
        type='text'
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        type='text'
        label="specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
      />
      <TextField
        type='text'
        label="diagnosisCodes (separate them with blank spaces)"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        fullWidth
      />
      <InputLabel htmlFor="type-input">Type</InputLabel>
      <Select
        id='type-input'
        type='text'
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {typeArray.map( t => 
          <MenuItem
            key={t}
            value={t}
          >
            {t}
          </MenuItem>
        )}
      </Select>
      {displaySpecificForm()}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default EntriesForm;
