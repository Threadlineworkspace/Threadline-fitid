import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Mail, User, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fitId, email, firstName, isNewUser } = location.state || {};

  // If no data, redirect to home
  React.useEffect(() => {
    if (!fitId) {
      navigate('/');
    }
  }, [fitId, navigate]);

  const getFitIdDetails = () => {
    const details = {
      'Lift': {
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: '🦾',
        description: 'You have a waist-to-hip differential that requires more room in the hip and thigh area.',
        topics: [
          'Waist-to-hip differential',
          'Fit conflict between waist and hip/thigh',
          'Hip and thigh volume requirements',
          'Movement restriction in standard fits'
        ]
      },
      'Triangle': {
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: '🔺',
        description: 'You have movement-based fit challenges related to crotch and rise mechanics.',
        topics: [
          'Crotch and rise mechanics',
          'Stability challenges during movement',
          'Movement fit issues',
          'Bending and squatting comfort'
        ]
      },
      'Rectangle': {
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        icon: '▬',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className={`bg-gradient-to-r ${details.color} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">
              Your FitID is Ready!
            </CardTitle>
            <CardDescription className="text-white/90 text-lg mt-2">
              {isNewUser ? 'Welcome to Threadline!' : 'Updated your FitID successfully!'}
            </CardDescription>
          </div>

          <CardHeader className="text-center pt-8">
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-2xl font-bold mx-auto">
              <span className="text-3xl">{details.icon}</span>
              {fitId}
            </div>
            <CardDescription className="text-base mt-4">
              {details.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{firstName || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What This Means For You
              </h3>
              <div className={`p-4 ${details.bgColor} border ${details.borderColor} rounded-lg`}>
                <ul className="space-y-2">
                  {details.topics.map((topic, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">📬 What's Next?</h4>
              <p className="text-sm text-muted-foreground">
                We've sent your FitID report to <strong>{email}</strong>. 
                Check your inbox for a detailed breakdown and personalized recommendations.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Stay tuned — we're building workwear designed around real bodies like yours!
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2"
            >
              Take the FitID Again
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://threadline.work', '_blank')}
              className="w-full"
            >
              Learn More About Threadline
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};