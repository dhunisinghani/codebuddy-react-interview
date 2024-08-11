import { useContext } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppContext } from "../context/MultiStepFormContext";

const StepTwo = () => {
  const { variant, margin, handleNext, handleBack, formValues, save } = useContext(AppContext);
  const { firstName, lastName, address } = formValues;
  const initialValues = {
    firstName,
    lastName,
    address,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("This field is required")
      .min(2)
      .max(50)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: Yup.string()
      .notRequired()
      .min(2)
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    address: Yup.string().required().min(10),
  });

  const handleSubmit = (values) => {
    save(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched, handleSubmit, isValid, dirty }) => {
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="First Name"
                  name="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="Address"
                  name="address"
                  placeholder="Address"
                  value={values.address}
                  onChange={handleChange}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
              <Button
                variant="contained"
                disabled={!dirty || !isValid}
                color="primary"
                onClick={() => {
                  handleSubmit();
                  handleNext();
                }}
              >
                Save and Next
              </Button>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default StepTwo;
