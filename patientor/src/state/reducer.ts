import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "DISPLAY_PATIENT";
      payload: Patient;
  }
  | {
    type:"SET_DIAGNOSIS";
    payload : Diagnosis[];
  } ;
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "DISPLAY_PATIENT":
        return {
          ...state,
          patient:action.payload
        };
      case "SET_DIAGNOSIS":
        return {
          ...state,
          diagnosis:{
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
          }
        };
    default:
      return state;
  }
};
