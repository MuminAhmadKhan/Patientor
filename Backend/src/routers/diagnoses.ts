import express from "express";
import patientServices from '../services/patientService';
const router = express.Router();



router.get('/',(_req,res)=>{
    res.send(patientServices.getDiagnoses());
});


export default router ;