import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Gender, Patient } from "../types";
import { useStateValue } from "../state";
import {displayPatient} from "../reducers";
import HealthcheckEntry from "./HealthcheckEntry";
import OccupationalHealthcareentry from "./OccupationalHealthcareentry";
import Hospitalentry from "./Hospitalentry";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';  
import FemaleIcon from '@mui/icons-material/Female';
function PatientDisplay() {
   const {id} = useParams<{id:string}>(); 
   
   const [state, dispatch] = useStateValue();
      

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
   const entryType = (entry:Entry)=>{
     switch(entry.type) {
       case "Hospital":
         return <Hospitalentry entry={entry}/>;
       case "HealthCheck":
         return <HealthcheckEntry entry={entry}/>;
       case "OccupationalHealthcare":
         return <OccupationalHealthcareentry entry={entry}/>;
        default:
          return <></>;
     }

   };
   React.useEffect(() => {
   

    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patient);
        dispatch(displayPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };
    if (id!==state.patient.id)
    void fetchPatient();
  }, [id]);


  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/enteries`,
        values
      );
      state.patient.Entries.push(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h3>{state.patient.name}    {state.patient.gender===Gender.Male?<MaleIcon/>:<FemaleIcon/>}</h3>
      <p>SSN:{state.patient.ssn}</p>
     
     
     {state.patient.Entries?state.patient.Entries.map((Entry)=>{
       return <div key={Entry.id}>
        
       {entryType(Entry)}
       </div>;
      }
       ):""} 
       <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={addNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
}

export default PatientDisplay;   