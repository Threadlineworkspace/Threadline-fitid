import React from 'react';

// Shared dark-theme input class
const inputCls = "w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/15 text-white placeholder:text-white/30 rounded-lg focus:ring-2 focus:ring-[#fa6902] focus:border-[#fa6902] outline-none transition-colors";
const selectCls = "w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/15 text-white rounded-lg focus:ring-2 focus:ring-[#fa6902] focus:border-[#fa6902] outline-none transition-colors appearance-none";
const labelCls = "block text-sm font-medium text-white/80 mb-1";
const optionRowCls = "flex items-center space-x-3 p-3 rounded-lg border border-white/10 hover:border-[#fa6902]/40 transition-colors cursor-pointer";
const optionLabelCls = "text-sm text-white/80 cursor-pointer select-none";
const sectionTitleCls = "text-2xl font-semibold text-white mb-6";
const errorCls = "text-red-400 text-sm mt-1";

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
            <h2 className={sectionTitleCls}>Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  What's your email address? <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className={inputCls}
                  placeholder="you@example.com"
                />
                {errors.email && <p className={errorCls}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelCls}>What's your first name?</label>
                <input
                  {...register('firstName')}
                  className={inputCls}
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label className={labelCls}>
                  Where are you based? <span className="text-red-400">*</span>
                </label>
                <select
                  {...register('country')}
                  className={selectCls}
                >
                  <option value="" className="bg-[#1a1a1a] text-white/40">Select your country</option>
                  {countryOptions.map(country => (
                    <option key={country} value={country} className="bg-[#1a1a1a] text-white">{country}</option>
                  ))}
                </select>
                {errors.country && <p className={errorCls}>{errors.country.message}</p>}
              </div>
            </div>
          </>
        );

      case 1: // Size
        return (
          <>
            <h2 className={sectionTitleCls}>Current Size</h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  What size trousers do you currently buy? <span className="text-red-400">*</span>
                </label>
                <select
                  {...register('trouserSize')}
                  className={selectCls}
                >
                  <option value="" className="bg-[#1a1a1a] text-white/40">Select your size</option>
                  {trouserSizeOptions.map(size => (
                    <option key={size} value={size} className="bg-[#1a1a1a] text-white">{size}</option>
                  ))}
                </select>
                {errors.trouserSize && <p className={errorCls}>{errors.trouserSize.message}</p>}
              </div>

              {trouserSize === 'Other' && (
                <div>
                  <label className={labelCls}>Please specify your size</label>
                  <input
                    {...register('trouserSizeOther')}
                    className={inputCls}
                    placeholder="Enter your size"
                  />
                </div>
              )}

              <div>
                <label className={labelCls}>
                  How do your trousers usually fit? <span className="text-red-400">*</span>
                </label>
                <select
                  {...register('trouserFit')}
                  className={selectCls}
                >
                  <option value="" className="bg-[#1a1a1a] text-white/40">Select fit</option>
                  {trouserFitOptions.map(fit => (
                    <option key={fit} value={fit} className="bg-[#1a1a1a] text-white">{fit}</option>
                  ))}
                </select>
                {errors.trouserFit && <p className={errorCls}>{errors.trouserFit.message}</p>}
              </div>
            </div>
          </>
        );

      case 2: // Fit Issues
        return (
          <>
            <h2 className={sectionTitleCls}>Fit Issues</h2>
            <p className="text-sm text-white/50 mb-4">
              Where do you usually have issues with trousers? <span className="text-red-400">*</span> (Select up to 3)
            </p>
            <div className="space-y-3">
              {fitIssueOptions.map(issue => (
                <div key={issue} className={optionRowCls} onClick={() => handleCheckboxChange('fitIssues', issue, selectedIssues, setValue)}>
                  <input
                    type="checkbox"
                    id={`issue-${issue}`}
                    checked={selectedIssues.includes(issue)}
                    onChange={() => handleCheckboxChange('fitIssues', issue, selectedIssues, setValue)}
                    disabled={selectedIssues.length >= 3 && !selectedIssues.includes(issue)}
                    className="w-4 h-4 accent-[#fa6902] border-white/20 rounded"
                    onClick={e => e.stopPropagation()}
                  />
                  <label htmlFor={`issue-${issue}`} className={optionLabelCls}>
                    {issue}
                  </label>
                </div>
              ))}
              {errors.fitIssues && <p className={errorCls}>{errors.fitIssues.message}</p>}
            </div>

            {selectedIssues.includes('Other') && (
              <div className="mt-4">
                <label className={labelCls}>Please specify</label>
                <input
                  {...register('fitIssuesOther')}
                  className={inputCls}
                  placeholder="Describe your fit issue"
                />
              </div>
            )}
          </>
        );

      case 3: // Body Distribution
        return (
          <>
            <h2 className={sectionTitleCls}>Body Distribution</h2>
            <div className="space-y-3">
              <label className={labelCls}>
                Where do you carry most of your lower body volume? <span className="text-red-400">*</span>
              </label>
              {bodyDistributionOptions.map(option => (
                <div key={option} className={optionRowCls}>
                  <input
                    type="radio"
                    {...register('bodyDistribution')}
                    value={option}
                    id={`body-${option}`}
                    className="w-4 h-4 accent-[#fa6902] border-white/20"
                  />
                  <label htmlFor={`body-${option}`} className={optionLabelCls}>{option}</label>
                </div>
              ))}
              {errors.bodyDistribution && <p className={errorCls}>{errors.bodyDistribution.message}</p>}
            </div>
          </>
        );

      case 4: // Movement
        return (
          <>
            <h2 className={sectionTitleCls}>Movement</h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  What do you mainly use your trousers for? <span className="text-red-400">*</span>
                </label>
                <select
                  {...register('workType')}
                  className={selectCls}
                >
                  <option value="" className="bg-[#1a1a1a] text-white/40">Select work type</option>
                  {workTypeOptions.map(type => (
                    <option key={type} value={type} className="bg-[#1a1a1a] text-white">{type}</option>
                  ))}
                </select>
                {errors.workType && <p className={errorCls}>{errors.workType.message}</p>}
              </div>

              {watch('workType') === 'Other' && (
                <div>
                  <label className={labelCls}>Please specify</label>
                  <input
                    {...register('workTypeOther')}
                    className={inputCls}
                    placeholder="Enter work type"
                  />
                </div>
              )}

              <div>
                <label className={labelCls}>
                  What movements do you do most? <span className="text-red-400">*</span>
                </label>
                <div className="space-y-3">
                  {movementOptions.map(movement => (
                    <div key={movement} className={optionRowCls} onClick={() => handleCheckboxChange('movements', movement, selectedMovements, setValue)}>
                      <input
                        type="checkbox"
                        id={`movement-${movement}`}
                        checked={selectedMovements.includes(movement)}
                        onChange={() => handleCheckboxChange('movements', movement, selectedMovements, setValue)}
                        className="w-4 h-4 accent-[#fa6902] border-white/20 rounded"
                        onClick={e => e.stopPropagation()}
                      />
                      <label htmlFor={`movement-${movement}`} className={optionLabelCls}>
                        {movement}
                      </label>
                    </div>
                  ))}
                  {errors.movements && <p className={errorCls}>{errors.movements.message}</p>}
                </div>
              </div>

              {selectedMovements.includes('Other') && (
                <div>
                  <label className={labelCls}>Please specify</label>
                  <input
                    {...register('movementsOther')}
                    className={inputCls}
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
            <h2 className={sectionTitleCls}>What Currently Works</h2>
            <div className="space-y-3">
              <label className={labelCls}>
                When you do find trousers that fit better, what usually makes them work? <span className="text-red-400">*</span>
              </label>
              {fitPreferenceOptions.map(option => (
                <div key={option} className={optionRowCls}>
                  <input
                    type="radio"
                    {...register('fitPreference')}
                    value={option}
                    id={`pref-${option}`}
                    className="w-4 h-4 accent-[#fa6902] border-white/20"
                  />
                  <label htmlFor={`pref-${option}`} className={optionLabelCls}>{option}</label>
                </div>
              ))}
              {errors.fitPreference && <p className={errorCls}>{errors.fitPreference.message}</p>}
            </div>
          </>
        );

      case 6: // Body Scanning
        return (
          <>
            <h2 className={sectionTitleCls}>Body Scanning</h2>
            <div className="space-y-6">
              <div>
                <label className={labelCls}>
                  Would you be open to getting your Fit ID through a body scanning app using your phone camera? <span className="text-red-400">*</span>
                </label>
                <div className="space-y-3">
                  {bodyScanOptions.map(option => (
                    <div key={option} className={optionRowCls}>
                      <input
                        type="radio"
                        {...register('bodyScanInterest')}
                        value={option}
                        id={`scan-${option}`}
                        className="w-4 h-4 accent-[#fa6902] border-white/20"
                      />
                      <label htmlFor={`scan-${option}`} className={optionLabelCls}>{option}</label>
                    </div>
                  ))}
                  {errors.bodyScanInterest && <p className={errorCls}>{errors.bodyScanInterest.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  Do you have a smartphone with a good camera? <span className="text-red-400">*</span>
                </label>
                <div className="flex space-x-4">
                  {smartphoneOptions.map(option => (
                    <div key={option} className={`${optionRowCls} flex-1`}>
                      <input
                        type="radio"
                        {...register('smartphone')}
                        value={option}
                        id={`phone-${option}`}
                        className="w-4 h-4 accent-[#fa6902] border-white/20"
                      />
                      <label htmlFor={`phone-${option}`} className={optionLabelCls}>{option}</label>
                    </div>
                  ))}
                  {errors.smartphone && <p className={errorCls}>{errors.smartphone.message}</p>}
                </div>
              </div>
            </div>
          </>
        );

      case 7: // Consent
        return (
          <>
            <h2 className={sectionTitleCls}>Consent</h2>
            <div className="p-4 border border-white/15 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consent')}
                  id="consent"
                  className="w-4 h-4 accent-[#fa6902] border-white/20 rounded mt-1 flex-shrink-0"
                />
                <div>
                  <label htmlFor="consent" className="text-sm text-white/80 cursor-pointer leading-relaxed">
                    I agree to Threadline collecting and using my responses to provide my Fit ID, 
                    improve products and services, and develop better fit and sizing solutions, 
                    and to contact me about updates and early access. <span className="text-red-400">*</span>
                  </label>
                  {errors.consent && <p className={errorCls}>{errors.consent.message}</p>}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return <div className="text-white">Section {currentStep + 1}</div>;
    }
  };

  return <div className="space-y-6">{renderSection()}</div>;
};
