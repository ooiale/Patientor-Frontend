import { useEffect, useState } from "react";

import diagnosis from "../../services/diagnosis";

import { Diagnosis } from "../../types";

interface Props {
  diagnosisCodes: string[]
}

const DisplayDiagnosisCodes = ({diagnosisCodes}: Props) => {
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const diagnosisInfo = await diagnosis.getAll();
        setDiagnosisList(diagnosisInfo);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchDiagnosis();
  }, []);

  return (
    <ul style={{paddingLeft: 0}}>
      Diagnosis Codes: 
      {diagnosisCodes.map(c => {
        const diagnose = diagnosisList ? diagnosisList.find(d => d.code === c) : null;
        return (
          <li key={c} style={{ marginLeft: '1.5rem' }}> 
            {`${c}:  ${diagnose ? diagnose.name : null}`} 
          </li>
        );
      })}
    </ul>
  );
};

export default DisplayDiagnosisCodes;
