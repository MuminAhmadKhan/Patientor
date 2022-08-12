import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import {useStateValue} from "../state/state";
import { TextField, SelectField, HealthOption , DiagnosisSelection } from "../AddPatientModal/FormField";

import {  Entry, HealthCheckRating   } from "../types"; 

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, "id" >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthOptions: HealthOption[] = [
  { value:HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
    const [{diagnosis}] =useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes:[],
        type:"HealthCheck",
        healthCheckRating:HealthCheckRating.Healthy,
        
        
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type==="Hospital" && !values.discharge.date && !values.discharge.criteria){
          errors.discharge=requiredError;
        }
        if(values.type==="OccupationalHealthcare" && !values.employerName){
          errors.employerName=requiredError;
        }
        if(values.type==="OccupationalHealthcare" && values.sickLeave  ){
          if(!values.sickLeave.startDate||!values.sickLeave.endDate)
          errors.employerName=requiredError;
        }
       
        
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldValue,setFieldTouched,values }) => {
        
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field fullwidth='true' style={{ marginBottom: "0.5em" }} name="type" component="select">
                    <option value="HealthCheck">HealthCheck</option>
                    <option value="Hospital">Hospital</option>
                    <option value="OccupationalHealthcare">OccupationalHealthcare</option>
                    
            </Field>
            
            {values.type==="HealthCheck" && <SelectField label="HealthCheckRating" name="healthCheckRating" options={healthOptions} />} {/*needs check*/}
            {values.type==="Hospital" && 
               <> <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              /> 
              <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
            label="Discharge Criteria"
            placeholder="CRITERIA"
            name="discharge.criteria"
            component={TextField}
          />
          </>
        }
        {values.type==="OccupationalHealthcare" && 
        <> 
         <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnosis)}
      /> 
            <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
            <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
            />
            <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
