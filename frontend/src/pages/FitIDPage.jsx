

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFitIDForm } from '../hooks/useFitIDForm';
import { StepIndicator } from '../components/forms/StepIndicator';
import { FormSections } from '../components/forms/FormSections';
import { fitidApi } from '../services/api';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Loader2, Target, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const FitIDPage = () => {
  const navigate = useNavigate();
  const {
    form,
    currentStep,
    nextStep,
    prevStep,
    isSubmitting,
    setIsSubmitting,
    setSubmittedData,
  } = useFitIDForm();

  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getFieldsForStep = (step) => {
    const fieldGroups = {
      0: ['email', 'firstName', 'country'],
      1: ['trouserSize', 'trouserSizeOther', 'trouserFit'],
      2: ['fitIssues', 'fitIssuesOther'],
      3: ['bodyDistribution'],
      4: ['workType', 'workTypeOther', 'movements', 'movementsOther'],
      5: ['fitPreference'],
      6: ['bodyScanInterest', 'smartphone'],
      7: ['consent'],
    };
    return fieldGroups[step] || [];
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fitidApi.submit(data);
      
      if (response.data.success) {
        setSubmittedData(response.data.data);
        toast.success('FitID submitted successfully!');
        navigate('/confirmation', { 
          state: { 
            fitId: response.data.data.fitId,
            email: response.data.data.email,
            firstName: response.data.data.firstName,
            isNewUser: response.data.data.isNewUser,
          } 
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / 8) * 100;

  return (
    <div className="min-h-screen bg-black pt-28 sm:pt-24 md:pt-28">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fa6902]/20 text-[#fa6902] rounded-full text-sm font-medium tracking-wide mb-4">
            <Target className="w-4 h-4" />
            <span>Step {currentStep + 1} of 8</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Perfect Fit
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Answer a few questions to discover your personalized Fit ID
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#fa6902] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Form */}
        <motion.div
          className="bg-[#111111] rounded-3xl shadow-xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormSections 
                    form={form} 
                    currentStep={currentStep} 
                    errors={errors}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white/70 font-medium w-full sm:w-auto justify-center cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep === 7 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#fa6902] hover:bg-[#e05e00] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My Fit ID
                        <Target className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-[#fa6902] hover:bg-[#e05e00] text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-white/40 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#fa6902] rounded-full" />
            Your data is secure. We'll never share your information.
            <span className="w-1.5 h-1.5 bg-[#fa6902] rounded-full" />
          </p>
        </motion.div>
      </div>
    </div>
  );
};
