import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const steps = [
  { number: 1, label: 'Basic Details' },
  { number: 2, label: 'Size' },
  { number: 3, label: 'Fit Issues' },
  { number: 4, label: 'Body Distribution' },
  { number: 5, label: 'Movement' },
  { number: 6, label: 'What Works' },
  { number: 7, label: 'Body Scanning' },
  { number: 8, label: 'Consent' },
];

export const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12 px-4">
      <div className="relative flex justify-between">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          {/* Progress Bar Fill */}
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.number} className="relative flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors z-10",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-gray-400 border-gray-300"
                )}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>
              <span
                className={cn(
                  "text-xs mt-2 text-center hidden sm:block",
                  isActive ? "text-primary font-medium" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};