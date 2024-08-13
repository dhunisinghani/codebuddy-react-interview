import { useContext } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { AppContext } from "../context/MultiStepFormContext";

import { useNavigate } from "react-router-dom";

const StepThree = () => {
  const navigate = useNavigate();
  const { variant, margin, handleBack, formValues, save } = useContext(AppContext);
  const { countryCode, phone, acceptTermsAndCondition } = formValues;
  const initialValues = {
    countryCode,
    phone,
    acceptTermsAndCondition,
  };

  const mobileRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    countryCode: Yup.string().required("Country Code is a required field"),
    phone: Yup.string()
      .matches(mobileRegExp, "Phone number is not valid")
      .min(10, "Phone number must have 10 digits")
      .max(10, "Phone number must have 10 digits")
      .required("Required"),
    acceptTermsAndCondition: Yup.boolean()
      .required()
      .isTrue("Please accept our terms and conditions"),
  });

  const handleSubmit = (values) => {
    const { countryCode, phone } = values;
    save({
      countryCode,
      phone,
    });
    navigate("/posts");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, handleSubmit }) => {
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  select
                  SelectProps={{
                    native: true,
                  }}
                  label="Country Code"
                  name="countryCode"
                  value={values.countryCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.countryCode)}
                  helperText={errors.countryCode}
                  required
                >
                  <option value=""> </option>
                  <option value="+91">India(+91)</option>
                  <option value="+1">America(+1)</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  margin={margin}
                  fullWidth
                  label="Phone number"
                  name="phone"
                  placeholder="i.e: xxx-xxx-xxxx"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.acceptTermsAndCondition}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="acceptTermsAndCondition"
                      color="primary"
                      required
                    />
                  }
                  label="Agree to terms and conditions"
                />
                <FormHelperText error={Boolean(errors.acceptTermsAndCondition)}>
                  {errors.acceptTermsAndCondition}
                </FormHelperText>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                color="primary"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default StepThree;
