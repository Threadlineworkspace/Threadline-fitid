

// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   CheckCircle2, 
//   ArrowRight, 
//   Mail, 
//   User, 
//   Target,
//   Ruler,
//   Move,
//   Share2,
//   ArrowUpRight
// } from 'lucide-react';
// import { Button } from '../components/ui/button';

// export const ConfirmationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { fitId, email, firstName, isNewUser } = location.state || {};

//   useEffect(() => {
//     if (!fitId) {
//       navigate('/');
//     }
//   }, [fitId, navigate]);

//   const getFitIdDetails = () => {
//     const details = {
//       'Lift': {
//         color: 'from-[#C76A32] to-[#B85D2A]',
//         bgColor: 'bg-[#C76A32]/10',
//         borderColor: 'border-[#C76A32]/30',
//         icon: Target,
//         textColor: 'text-[#C76A32]',
//         description: 'You have a waist-to-hip differential that requires more room in the hip and thigh area.',
//         topics: [
//           'Waist-to-hip differential',
//           'Fit conflict between waist and hip/thigh',
//           'Hip and thigh volume requirements',
//           'Movement restriction in standard fits'
//         ]
//       },
//       'Triangle': {
//         color: 'from-[#323352] to-[#1a1a3e]',
//         bgColor: 'bg-[#323352]/10',
//         borderColor: 'border-[#323352]/30',
//         icon: Move,
//         textColor: 'text-[#323352]',
//         description: 'You have movement-based fit challenges related to crotch and rise mechanics.',
//         topics: [
//           'Crotch and rise mechanics',
//           'Stability challenges during movement',
//           'Movement fit issues',
//           'Bending and squatting comfort'
//         ]
//       },
//       'Rectangle': {
//         color: 'from-[#5C5B77] to-[#4a4963]',
//         bgColor: 'bg-[#5C5B77]/10',
//         borderColor: 'border-[#5C5B77]/30',
//         icon: Ruler,
//         textColor: 'text-[#5C5B77]',
//         description: 'You have a balanced body proportion with standard fit requirements.',
//         topics: [
//           'Balanced body proportions',
//           'Standard fit profile',
//           'More straightforward fit requirements'
//         ]
//       }
//     };
//     return details[fitId] || details['Rectangle'];
//   };

//   const details = getFitIdDetails();
//   const IconComponent = details.icon;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#F5F2EA] to-white flex items-center justify-center px-4 py-12 pt-32 xs:pt-28 sm:pt-24 md:pt-28">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-2xl"
//       >
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
//           {/* Success Header */}
//           <div className={`bg-gradient-to-r ${details.color} p-10 text-white text-center relative overflow-hidden`}>
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
//             </div>
//             <div className="relative">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.2, type: 'spring' }}
//                 className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6"
//               >
//                 <CheckCircle2 className="w-10 h-10" />
//               </motion.div>
//               <h1 className="text-3xl font-bold font-heading">
//                 Your FitID is Ready!
//               </h1>
//               <p className="text-white/90 text-lg mt-2">
//                 {isNewUser ? 'Welcome to Threadline!' : 'Updated your FitID successfully!'}
//               </p>
//             </div>
//           </div>

//           <div className="p-8 md:p-10">
//             {/* FitID Badge */}
//             <div className="flex items-center justify-center gap-3 mb-6">
//               <div className={`w-14 h-14 rounded-2xl ${details.bgColor} border ${details.borderColor} flex items-center justify-center`}>
//                 <IconComponent className={`w-7 h-7 ${details.textColor}`} />
//               </div>
//               <span className={`text-3xl font-bold font-heading ${details.textColor}`}>{fitId}</span>
//             </div>

//             <p className="text-[#5C5B77] text-center text-lg mb-8 leading-relaxed">
//               {details.description}
//             </p>

//             {/* User Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F5F2EA] rounded-xl mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
//                   <User className="w-5 h-5 text-[#5C5B77]" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-[#5C5B77] font-medium uppercase tracking-wider">Name</p>
//                   <p className="font-semibold text-[#323352]">{firstName || 'Anonymous'}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
//                   <Mail className="w-5 h-5 text-[#5C5B77]" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-[#5C5B77] font-medium uppercase tracking-wider">Email</p>
//                   <p className="font-semibold text-[#323352]">{email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* What This Means */}
//             <div className="mb-8">
//               <h3 className="font-heading text-lg font-bold text-[#323352] mb-4 flex items-center gap-2">
//                 <Target className="w-5 h-5 text-[#C76A32]" />
//                 What This Means For You
//               </h3>
//               <div className={`p-4 ${details.bgColor} border ${details.borderColor} rounded-xl`}>
//                 <ul className="space-y-3">
//                   {details.topics.map((topic, index) => (
//                     <motion.li
//                       key={index}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 * (index + 1) }}
//                       className="flex items-start gap-3 text-sm text-[#323352]"
//                     >
//                       <span className="text-[#C76A32] mt-0.5">✦</span>
//                       <span>{topic}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Next Steps */}
//             <div className="p-5 bg-[#F5F2EA] rounded-xl border border-[#C76A32]/10 mb-8">
//               <h4 className="font-semibold text-sm text-[#323352] mb-2 flex items-center gap-2">
//                 <Share2 className="w-4 h-4 text-[#C76A32]" />
//                 What's Next?
//               </h4>
//               <p className="text-sm text-[#5C5B77] leading-relaxed">
//                 We've sent your FitID report to <strong className="text-[#323352]">{email}</strong>. 
//                 Check your inbox for a detailed breakdown and personalized recommendations.
//               </p>
//               <p className="text-sm text-[#5C5B77] leading-relaxed mt-2">
//                 Stay tuned — we're building workwear designed around real bodies like yours!
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Button 
//                 onClick={() => navigate('/')}
//                 className="flex-1 bg-[#C76A32] hover:bg-[#B85D2A] text-white rounded-xl py-6"
//               >
//                 Take the FitID Again
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//               <Button 
//                 variant="outline" 
//                 onClick={() => window.open('https://threadline.work', '_blank')}
//                 className="flex-1 border-[#323352] text-[#323352] hover:bg-[#323352] hover:text-white rounded-xl py-6"
//               >
//                 Learn More
//                 <ArrowUpRight className="w-4 h-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  User, 
  Target,
  Ruler,
  Move,
  Share2,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

export const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fitId, email, firstName, isNewUser } = location.state || {};

  useEffect(() => {
    if (!fitId) {
      navigate('/');
    }
  }, [fitId, navigate]);

  const getFitIdDetails = () => {
    const details = {
      'Lift': {
        color: 'from-[#C76A32] to-[#B85D2A]',
        bgColor: 'bg-[#C76A32]/10',
        borderColor: 'border-[#C76A32]/30',
        icon: Target,
        textColor: 'text-[#C76A32]',
        description: 'You have a waist-to-hip differential that requires more room in the hip and thigh area.',
        topics: [
          'Waist-to-hip differential',
          'Fit conflict between waist and hip/thigh',
          'Hip and thigh volume requirements',
          'Movement restriction in standard fits'
        ]
      },
      'Triangle': {
        color: 'from-[#323352] to-[#1a1a3e]',
        bgColor: 'bg-[#323352]/10',
        borderColor: 'border-[#323352]/30',
        icon: Move,
        textColor: 'text-[#323352]',
        description: 'You have movement-based fit challenges related to crotch and rise mechanics.',
        topics: [
          'Crotch and rise mechanics',
          'Stability challenges during movement',
          'Movement fit issues',
          'Bending and squatting comfort'
        ]
      },
      'Rectangle': {
        color: 'from-[#5C5B77] to-[#4a4963]',
        bgColor: 'bg-[#5C5B77]/10',
        borderColor: 'border-[#5C5B77]/30',
        icon: Ruler,
        textColor: 'text-[#5C5B77]',
        description: 'You have a balanced body proportion with standard fit requirements.',
        topics: [
          'Balanced body proportions',
          'Standard fit profile',
          'More straightforward fit requirements'
        ]
      }
    };
    return details[fitId] || details['Rectangle'];
  };

  const details = getFitIdDetails();
  const IconComponent = details.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F2EA] to-white flex items-center justify-center px-4 py-12 pt-32 xs:pt-28 sm:pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Success Header */}
          <div className={`bg-gradient-to-r ${details.color} p-10 text-white text-center relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h1 className="text-3xl font-bold font-heading">
                Your FitID is Ready!
              </h1>
              <p className="text-white/90 text-lg mt-2">
                {isNewUser ? 'Welcome to Threadline!' : 'Updated your FitID successfully!'}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* FitID Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${details.bgColor} border ${details.borderColor} flex items-center justify-center`}>
                <IconComponent className={`w-7 h-7 ${details.textColor}`} />
              </div>
              <span className={`text-3xl font-bold font-heading ${details.textColor}`}>{fitId}</span>
            </div>

            <p className="text-[#5C5B77] text-center text-lg mb-8 leading-relaxed">
              {details.description}
            </p>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F5F2EA] rounded-xl mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-[#5C5B77]" />
                </div>
                <div>
                  <p className="text-xs text-[#5C5B77] font-medium uppercase tracking-wider">Name</p>
                  <p className="font-semibold text-[#323352]">{firstName || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#5C5B77]" />
                </div>
                <div>
                  <p className="text-xs text-[#5C5B77] font-medium uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-[#323352]">{email}</p>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-bold text-[#323352] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#C76A32]" />
                What This Means For You
              </h3>
              <div className={`p-4 ${details.bgColor} border ${details.borderColor} rounded-xl`}>
                <ul className="space-y-3">
                  {details.topics.map((topic, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="flex items-start gap-3 text-sm text-[#323352]"
                    >
                      <span className="text-[#C76A32] mt-0.5">✦</span>
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-5 bg-[#F5F2EA] rounded-xl border border-[#C76A32]/10 mb-8">
              <h4 className="font-semibold text-sm text-[#323352] mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#C76A32]" />
                What's Next?
              </h4>
              <p className="text-sm text-[#5C5B77] leading-relaxed">
                We've sent your FitID report to <strong className="text-[#323352]">{email}</strong>. 
                Check your inbox for a detailed breakdown and personalized recommendations.
              </p>
              <p className="text-sm text-[#5C5B77] leading-relaxed mt-2">
                Stay tuned — we're building workwear designed around real bodies like yours!
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/')}
                className="flex-1 bg-[#C76A32] hover:bg-[#B85D2A] text-white rounded-xl py-6"
              >
                Take the FitID Again
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://threadlineworkwear.webflow.io/', '_blank')}
                className="flex-1 border-[#fa6902] text-[#fa6902] hover:bg-[#fa6902] hover:text-white rounded-xl py-6 transition-all duration-300"
                style={{ borderColor: '#fa6902', color: '#fa6902' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fa6902';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fa6902';
                }}
              >
                Return to Threadline
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};