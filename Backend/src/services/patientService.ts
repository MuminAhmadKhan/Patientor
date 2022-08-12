/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import diagnoseData from '../../data/diagnoses.json';
import patientData from '../../data/det_patients';
import { diagnoseEntry, nonSensitivePatientEntry ,patientEntry,newPatientEntry, newEntry, Entry} from "../types";
import {v1 as uuid} from 'uuid';


const diagnoses : Array <diagnoseEntry> = diagnoseData;
const patients : Array <patientEntry> = patientData;
const getDiagnoses = ():diagnoseEntry[] =>{
    return diagnoses;
};

const getPatients = () : nonSensitivePatientEntry[]=> {
    return patients.map(({id , name , gender ,dateOfBirth,occupation,Entries})=>({
        id ,
        name ,
        gender , 
        dateOfBirth ,
        occupation,
        Entries}));

};
const getPatientsById = (id:string) : patientEntry|undefined=> {
    const ans = patients.find((patient:patientEntry):boolean=>patient.id===id);
   
    return ans;
};

const addPatient = (entry:newPatientEntry) => {
    const newPatient = {
        ...entry,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id : uuid()
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry:newEntry,id:string):Entry=>{
    const processedEntry:Entry = {
       
        id : uuid(),
        ...entry,
    };
    patients.forEach((patient:patientEntry)=>{
        if (patient.id===id){
            patient.Entries.push(processedEntry);
        }
    });
        return processedEntry;
};

export default {
    getDiagnoses,
    getPatients,
    addPatient,
    getPatientsById,
    addEntry
};