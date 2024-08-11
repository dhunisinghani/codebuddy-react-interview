import { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppContext } from "../context/MultiStepFormContext";

const StepOne = () => {
  const { variant, margin, handleNext, save, formValues } = useContext(AppContext);
  const { email, password } = formValues;
  const initialValues = {
    email,
    password,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is a required field").email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){2,})(?=(.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]){2,}).{8,}$/,
        "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.",
      ),
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
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="Email"
                  name="email"
                  placeholder="Your email address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                // disabled={!dirty || !isValid}
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
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

export default StepOne;
