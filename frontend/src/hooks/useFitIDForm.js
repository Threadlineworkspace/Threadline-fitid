import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Form validation schema
const fitIDSchema = z.object({
  // Section 1: Basic Details
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  firstName: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  
  // Section 2: Current Size
  trouserSize: z.string().min(1, 'Trouser size is required'),
  trouserSizeOther: z.string().optional(),
  trouserFit: z.string().min(1, 'Trouser fit is required'),
  
  // Section 3: Fit Issues
  fitIssues: z.array(z.string()).max(3, 'Select up to 3 fit issues'),
  fitIssuesOther: z.string().optional(),
  
  // Section 4: Body Distribution
  bodyDistribution: z.string().min(1, 'Body distribution is required'),
  
  // Section 5: Movement
  workType: z.string().min(1, 'Work type is required'),
  workTypeOther: z.string().optional(),
  movements: z.array(z.string()).min(1, 'Select at least one movement'),
  movementsOther: z.string().optional(),
  
  // Section 6: What Works
  fitPreference: z.string().min(1, 'Fit preference is required'),
  
  // Section 7: Body Scanning
  bodyScanInterest: z.string().min(1, 'This field is required'),
  smartphone: z.string().min(1, 'This field is required'),
  
  // Section 8: Consent
  consent: z.boolean().refine(val => val === true, 'You must agree to continue'),
});

export const useFitIDForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const form = useForm({
    resolver: zodResolver(fitIDSchema),
    defaultValues: {
      email: '',
      firstName: '',
      country: '',
      trouserSize: '',
      trouserSizeOther: '',
      trouserFit: '',
      fitIssues: [],
      fitIssuesOther: '',
      bodyDistribution: '',
      workType: '',
      workTypeOther: '',
      movements: [],
      movementsOther: '',
      fitPreference: '',
      bodyScanInterest: '',
      smartphone: '',
      consent: false,
    },
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return {
    form,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    isSubmitting,
    setIsSubmitting,
    submittedData,
    setSubmittedData,
  };
};