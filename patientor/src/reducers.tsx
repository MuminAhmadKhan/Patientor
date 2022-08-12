import { Action } from "./state";
import { Diagnosis, Patient } from "./types";

export const setPatients=(patientList:Patient[]):Action=>{
    return {
        type: "SET_PATIENT_LIST", 
        payload: patientList
    };
};

export const addPatient = (newPatient:Patient):Action=>{
    return {
            type: "ADD_PATIENT" ,
            payload: newPatient
    };
    
    
};

export const displayPatient = (patient:Patient):Action=>{
    return{ 
        type: "DISPLAY_PATIENT",
         payload: patient 
        };
};

export const setDiagnosis = (diagnosis:Diagnosis[]):Action=>{
    return {
        type:"SET_DIAGNOSIS",
        payload:diagnosis
    };

};