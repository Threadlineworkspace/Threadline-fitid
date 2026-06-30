import React from 'react';

export const FormSections = ({ currentStep, form, errors }) => {
  const { register, watch, setValue } = form;
  const selectedIssues = watch('fitIssues') || [];
  const selectedMovements = watch('movements') || [];
  const trouserSize = watch('trouserSize');

  const fitIssueOptions = [
    'Waist too loose', 
    'Waist too tight', 
    'Tight in thighs',
    'Tight in hips', 
    'Tight in crotch when moving',
    'Fall down when bending or squatting', 
    'Wear out between thighs',
    'No major issues', 
    "Knee doesn't sit in the right place", 
    'Other'
  ];

  const movementOptions = [
    'Squatting', 
    'Kneeling', 
    'Climbing', 
    'Crawling',
    'Walking long distances', 
    'Bending or lifting', 
    'Other'
  ];

  const countryOptions = ['UK', 'USA', 'Europe', 'Australia/NZ', 'Other'];
  const trouserSizeOptions = [
    'UK 6 (US 2)', 'UK 8 (US 4)', 'UK 10 (US 6)',
    'UK 12 (US 8)', 'UK 14 (US 10)', 'UK 16 (US 12)',
    'UK 18 (US 14)', 'UK 20 (US 16)', 'UK 22 (US 18)', 'Other'
  ];
  const trouserFitOptions = ['Too tight', 'Too loose', 'Fit in some areas but not others', 'Fit well'];
  const bodyDistributionOptions = ['More in hips', 'More in thighs', 'Evenly distributed', 'Not sure'];
  const workTypeOptions = [
    'Painting and decorating', 'Construction', 'Electrical', 'Plumbing',
    'Welding', 'Gardening and landscaping', 'DIY', 'Other'
  ];
  const fitPreferenceOptions = ['Stretch fabric', 'High waist', 'Loose fit', 'Specific brand', 'Nothing ever fits properly'];
  const bodyScanOptions = ['Yes', 'Maybe - depending how it works', 'No'];
  const smartphoneOptions = ['Yes', 'No'];

  const handleCheckboxChange = (field, value, currentArray, setValue) => {
    const updated = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setValue(field, updated);
  };

  const renderSection = () => {
    switch (currentStep) {
      case 0: // Basic Details
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  What's your email address? <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">What's your first name?</label>
                <input
                  {...register('firstName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Where are you based? <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('country')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select your country</option>
                  {countryOptions.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
              </div>
            </div>
          </>
        );

      case 1: // Size
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Current Size</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  What size trousers do you currently buy? <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('trouserSize')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select your size</option>
                  {trouserSizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.trouserSize && <p className="text-red-500 text-sm mt-1">{errors.trouserSize.message}</p>}
              </div>

              {trouserSize === 'Other' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Please specify your size</label>
                  <input
                    {...register('trouserSizeOther')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your size"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  How do your trousers usually fit? <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('trouserFit')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select fit</option>
                  {trouserFitOptions.map(fit => (
                    <option key={fit} value={fit}>{fit}</option>
                  ))}
                </select>
                {errors.trouserFit && <p className="text-red-500 text-sm mt-1">{errors.trouserFit.message}</p>}
              </div>
            </div>
          </>
        );

      case 2: // Fit Issues
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Fit Issues</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Where do you usually have issues with trousers? <span className="text-red-500">*</span> (Select up to 3)
            </p>
            <div className="space-y-3">
              {fitIssueOptions.map(issue => (
                <div key={issue} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                  <input
                    type="checkbox"
                    id={`issue-${issue}`}
                    checked={selectedIssues.includes(issue)}
                    onChange={() => handleCheckboxChange('fitIssues', issue, selectedIssues, setValue)}
                    disabled={selectedIssues.length >= 3 && !selectedIssues.includes(issue)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor={`issue-${issue}`} className="text-sm cursor-pointer">
                    {issue}
                  </label>
                </div>
              ))}
              {errors.fitIssues && <p className="text-red-500 text-sm">{errors.fitIssues.message}</p>}
            </div>

            {selectedIssues.includes('Other') && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Please specify</label>
                <input
                  {...register('fitIssuesOther')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your fit issue"
                />
              </div>
            )}
          </>
        );

      case 3: // Body Distribution
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Body Distribution</h2>
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">
                Where do you carry most of your lower body volume? <span className="text-red-500">*</span>
              </label>
              {bodyDistributionOptions.map(option => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                  <input
                    type="radio"
                    {...register('bodyDistribution')}
                    value={option}
                    id={`body-${option}`}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor={`body-${option}`} className="cursor-pointer">{option}</label>
                </div>
              ))}
              {errors.bodyDistribution && <p className="text-red-500 text-sm">{errors.bodyDistribution.message}</p>}
            </div>
          </>
        );

      case 4: // Movement
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Movement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  What do you mainly use your trousers for? <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('workType')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select work type</option>
                  {workTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.workType && <p className="text-red-500 text-sm">{errors.workType.message}</p>}
              </div>

              {watch('workType') === 'Other' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Please specify</label>
                  <input
                    {...register('workTypeOther')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter work type"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  What movements do you do most? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {movementOptions.map(movement => (
                    <div key={movement} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                      <input
                        type="checkbox"
                        id={`movement-${movement}`}
                        checked={selectedMovements.includes(movement)}
                        onChange={() => handleCheckboxChange('movements', movement, selectedMovements, setValue)}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`movement-${movement}`} className="text-sm cursor-pointer">
                        {movement}
                      </label>
                    </div>
                  ))}
                  {errors.movements && <p className="text-red-500 text-sm">{errors.movements.message}</p>}
                </div>
              </div>

              {selectedMovements.includes('Other') && (
                <div>
                  <label className="block text-sm font-medium mb-1">Please specify</label>
                  <input
                    {...register('movementsOther')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter movements"
                  />
                </div>
              )}
            </div>
          </>
        );

      case 5: // What Works
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">What Currently Works</h2>
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">
                When you do find trousers that fit better, what usually makes them work? <span className="text-red-500">*</span>
              </label>
              {fitPreferenceOptions.map(option => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                  <input
                    type="radio"
                    {...register('fitPreference')}
                    value={option}
                    id={`pref-${option}`}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor={`pref-${option}`} className="cursor-pointer">{option}</label>
                </div>
              ))}
              {errors.fitPreference && <p className="text-red-500 text-sm">{errors.fitPreference.message}</p>}
            </div>
          </>
        );

      case 6: // Body Scanning
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Body Scanning</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Would you be open to getting your Fit ID through a body scanning app using your phone camera? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {bodyScanOptions.map(option => (
                    <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                      <input
                        type="radio"
                        {...register('bodyScanInterest')}
                        value={option}
                        id={`scan-${option}`}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor={`scan-${option}`} className="cursor-pointer">{option}</label>
                    </div>
                  ))}
                  {errors.bodyScanInterest && <p className="text-red-500 text-sm">{errors.bodyScanInterest.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Do you have a smartphone with a good camera? <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  {smartphoneOptions.map(option => (
                    <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors">
                      <input
                        type="radio"
                        {...register('smartphone')}
                        value={option}
                        id={`phone-${option}`}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor={`phone-${option}`} className="cursor-pointer">{option}</label>
                    </div>
                  ))}
                  {errors.smartphone && <p className="text-red-500 text-sm">{errors.smartphone.message}</p>}
                </div>
              </div>
            </div>
          </>
        );

      case 7: // Consent
        return (
          <>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Consent</h2>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consent')}
                  id="consent"
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <div>
                  <label htmlFor="consent" className="text-sm cursor-pointer">
                    I agree to Threadline collecting and using my responses to provide my Fit ID, 
                    improve products and services, and develop better fit and sizing solutions, 
                    and to contact me about updates and early access. <span className="text-red-500">*</span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return <div>Section {currentStep + 1}</div>;
    }
  };

  return <div className="space-y-6">{renderSection()}</div>;
};