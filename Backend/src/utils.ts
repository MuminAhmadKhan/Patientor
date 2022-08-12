import { newPatientEntry,gender, newEntry, diagnoseEntry , BaseEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating, HospitalEntry} from "./types";

const isString = (text:unknown):text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date:string):boolean => {
    return Boolean(Date.parse(date));
};
 
const parseName = (name:unknown):string =>{
    if (!name || !isString(name))
        throw new Error("Missing or Incorrect name");
    return name;

};



const parseDate = (date:unknown):string => {
    if (!date || !isString(date)|| !isDate(date))
        throw new Error("Missing or Incorrect data"+date);
    return date;
};

const parseSsn = (ssn:unknown):string => {
    if (!ssn || !isString(ssn))
        throw new Error("Missing or Incorrect ssn");
    return ssn;
};

const parseOccupation = (occupation:unknown):string =>{
    if (!occupation || !isString(occupation))
        throw new Error("Missing or Incorrect occupation");
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param:any):param is gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(gender).includes(param);
};

const parseGender = (gender:unknown):gender=>{
    if (!gender || !isGender(gender))
        throw new Error("Missing or Incorrect gender");
    return gender;
};
const parseDescription = (description:unknown):string =>{
    if (!description || !isString(description))
        throw new Error("Missing or Incorrect description");
    return description;
};
const parseSpecialist = (specialist:unknown):string =>{
    if (!specialist || !isString(specialist))
        throw new Error("Missing or Incorrect specialist");
    return specialist;
};
const parseEmployername = (employerName:unknown):string =>{
    if (!employerName || !isString(employerName))
        throw new Error("Missing or Incorrect employerName");
    return employerName;
};

const parseCode = (code:unknown):string =>{
    if (!code || !isString(code))
        throw new Error("Missing or Incorrect code");
    return code;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseCodes = (codes:any):Array<diagnoseEntry['code']>=>{
    if (!codes )
        throw new Error("Missing or Incorrect diagnosiscodes");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    codes.forEach((code: unknown)=>parseCode(code));
    return codes as Array<diagnoseEntry['code']> ;
};
const parseRating = (rating:unknown):HealthCheckRating=>{
    if(!HealthCheckRating||!(rating===0||rating===1||rating===2||rating===3))
    throw new Error("Missing or Incorrect rating");
    return rating as HealthCheckRating;

};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatiententry = (object:any):newPatientEntry => {
    const newEntry = {
        name:parseName(object.name),
        dateOfBirth : parseDate(object.dateOfBirth),
        ssn:parseSsn(object.ssn),
        gender:parseGender(object.gender),
        occupation:parseOccupation(object.occupation),
        Entries:[]
    };
    return newEntry;

};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object:any):newEntry => {
    let  newEntry:Omit<BaseEntry,"id"> = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    };
    if (object.diagnoseCodes)
    {  newEntry =  Object.assign({}, newEntry, {
        diagnosisCodes:parseCodes(object.diagnoseCodes)
    });
    }
    if (!(object.type==="HealthCheck"||object.type==="Hospital"||object.type==="OccupationalHealthcare")){
        throw new Error("Missing or Incorrect type");
    }
    switch (object.type){
        case "OccupationalHealthcare":
            const newOccEntry:Omit<OccupationalHealthcareEntry,'id'> =  Object.assign({}, newEntry, {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type:object.type,
                employerName:parseEmployername(object.employerName)
            });
            if(object.sickLeave) {
                newOccEntry['sickLeave'] =  {startDate:parseDate(object.sickLeave.startDate),endDate:parseDate(object.sickLeave.endDate)};
        }
        return newOccEntry;
        case "HealthCheck":
            const HealthEntry:Omit<HealthCheckEntry,'id'> = Object.assign({}, newEntry, {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type:object.type,
                healthCheckRating:parseRating(object.healthCheckRating)
            });
            return HealthEntry;
        case "Hospital":
            const hospitalEntry:Omit<HospitalEntry,'id'> = Object.assign({}, newEntry, {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type:object.type,
                discharge:{
                    date:parseDate(object.discharge.date),
                    criteria:parseDescription(object.discharge.criteria)
                }
            });
            return hospitalEntry;
    }
    return "" as unknown as newEntry; //should never reach  here
};
export {toNewPatiententry,toNewEntry};