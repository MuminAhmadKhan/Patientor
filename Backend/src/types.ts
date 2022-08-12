export interface diagnoseEntry {
    code:string
    name:string
    latin?:string

}

export interface patientEntry {
        "id": string,
        "name": string,
        "dateOfBirth": string,
        "ssn": string,
        "gender": gender,
        "occupation": string,
        "Entries":Entry[]
}

export type nonSensitivePatientEntry =  Omit <patientEntry , 'ssn' >;

export type newPatientEntry = Omit <patientEntry,'id'> ;

export enum gender {
    male = "male",
    female = "female"
}
 export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnoseEntry['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  export interface HospitalEntry extends BaseEntry {
      type:"Hospital";
      discharge : {
          date:string;
          criteria:string;
      }
  }
  export interface OccupationalHealthcareEntry extends BaseEntry {
        type :"OccupationalHealthcare";
        employerName:string;
        sickLeave?: {
            startDate:string;
            endDate:string;
        }
  }
  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

  export type newEntry = UnionOmit <Entry,'id'> ;