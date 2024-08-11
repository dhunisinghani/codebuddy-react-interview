import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { AppContext } from "../context/MultiStepFormContext";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const MultiStepForm = () => {
  const labels = ["First Step", "Second Step", "Third Step"];
  const variant = "standard";
  const margin = "normal";
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phone: "",
    acceptTermsAndCondition: false,
  });

  const handleNext = () => {
    setActiveStep((prev) => {
      return prev + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prev) => {
      return prev - 1;
    });
  };

  const save = (values) => {
    setFormValues((prev) => Object.assign(prev, values));
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" align="center">
            Multi Step Form
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
            React Material UI multi step form with basic form validation logic.
          </Typography>
        </Box>
        <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <AppContext.Provider
          value={{ variant, margin, activeStep, handleNext, handleBack, save, formValues }}
        >
          {handleSteps(activeStep)}
        </AppContext.Provider>
      </Paper>
    </Container>
  );
};

export default MultiStepForm;
