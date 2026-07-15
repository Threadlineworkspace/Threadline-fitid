
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
        color: 'from-[#fa6902] to-[#B85D2A]',
        bgColor: 'bg-[#fa6902]/10',
        borderColor: 'border-[#fa6902]/30',
        icon: Target,
        textColor: 'text-[#fa6902]',
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 pt-32 xs:pt-28 sm:pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-white/10">
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

            <p className="text-white/60 text-center text-lg mb-8 leading-relaxed">
              {details.description}
            </p>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#1a1a1a] border border-white/10 rounded-xl mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#111111] border border-white/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Name</p>
                  <p className="font-semibold text-white">{firstName || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#111111] border border-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-white">{email}</p>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#fa6902]" />
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
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <span className="text-[#fa6902] mt-0.5">✦</span>
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-5 bg-[#1a1a1a] border border-[#fa6902]/20 rounded-xl mb-8">
              <h4 className="font-semibold text-sm text-white mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#fa6902]" />
                What's Next?
              </h4>
              <p className="text-sm text-white/50 leading-relaxed">
                We've sent your FitID report to <strong className="text-white/80">{email}</strong>. 
                Check your inbox for a detailed breakdown and personalized recommendations.
              </p>
              <p className="text-sm text-white/50 leading-relaxed mt-2">
                Stay tuned — we're building workwear designed around real bodies like yours!
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/')}
                className="flex-1 bg-[#fa6902] hover:bg-[#e05e00] text-white rounded-xl py-6"
              >
                Take the FitID Again
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://threadlineworkwear.webflow.io/', '_blank')}
                className="flex-1 border-[#fa6902] text-[#fa6902] hover:bg-[#fa6902] hover:text-white rounded-xl py-6 transition-all duration-300 font-semibold cursor-pointer bg-transparent"
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
