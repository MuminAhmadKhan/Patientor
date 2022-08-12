import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatiententry } from '../utils';

const router =express.Router();

router.get('/',(_req,res)=>{
    res.send(patientService.getPatients());
});
router.get('/:id',(req,res)=>{
    const id:string = req.params.id;
    res.send(patientService.getPatientsById(id));
});

router.post('/',(req,res)=>{
    try{
        const newPatientEntry = toNewPatiententry(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.json(newPatient);
    }
    catch(error:unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});
router.post('/:id/enteries',(req,res)=>{
    try{
        const id:string = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newEntry = toNewEntry(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const addedEntry = patientService.addEntry(newEntry,id);
        res.json(addedEntry);
    }
    catch(error:unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});

export default router;