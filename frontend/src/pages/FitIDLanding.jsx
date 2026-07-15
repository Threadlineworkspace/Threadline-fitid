import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  ArrowRight, 
  Ruler, 
  Move, 
  Briefcase, 
  AlertCircle, 
  BarChart3, 
  Sparkles,
  Tag,
  Shield,
  HelpCircle,
  Activity,
  UserCheck,
  Gift,
  Heart,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

const PocketIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
    <polyline points="8 10 12 14 16 10" />
  </svg>
);

export const FitIDLanding = () => {
  // Custom circular badge component
  const CircularBadge = ({ text, size = 'md', className = '' }) => {
    const isLarge = size === 'lg';
    const pathId = text.replace(/\s+/g, '-').toLowerCase();
    
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${isLarge ? 'w-32 h-32' : 'w-28 h-28'} ${className}`}>
        {/* SVG Circle Path for Text */}
        <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-[spin_25s_linear_infinite]">
          <defs>
            <path 
              id={pathId} 
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
              fill="none" 
            />
          </defs>
          <text fill="#EAD8C3" fontSize="8" fontWeight="600" letterSpacing="1.2">
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
        
        {/* Center Logo/Icon */}
        <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EAD8C3]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 8 0v2" />
            <path d="M18 13h4M20 11v4" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#000000] text-white pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EAD8C3]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                Finally understand why your workwear never seems to fit.
              </h1>
              
              <div className="space-y-4 text-[#FAF8F5]/80 text-base md:text-lg leading-relaxed max-w-xl">
                <p>
                  If your trousers constantly slide down, pinch, gape, restrict movement or never seem to fit properly, you're not alone.
                </p>
                <p className="font-semibold text-white">
                  The problem probably isn't your body.
                </p>
                <p>
                  Most women's workwear is still based on designs that were never created around women's bodies or the way women actually work.
                </p>
                <p>
                  FitID helps explain why—and gives you a personalised FitID.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <Button 
                  asChild
                  className="bg-[#fa6902] hover:bg-[#e05e00] text-white font-bold text-base px-8 py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#fa6902]/50 cursor-pointer"
                >
                  <Link to="/fitid/questionnaire">
                    Get My FitID
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-2 text-[#EAD8C3] text-sm">
                  <Clock className="w-5 h-5" />
                  <span>Takes around 5 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Right Graphic/Image */}
            <motion.div 
              className="lg:col-span-5 relative flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Image Frame */}
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-emerald-950">
                <img 
                  src="/hero-woman.png" 
                  alt="Woman in professional workwear" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Designed for Women Stamp */}
                <div className="absolute bottom-6 right-6 z-20">
                  <CircularBadge text="DESIGNED FOR WOMEN • DESIGNED FOR WOMEN •" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. SOUND FAMILIAR? SECTION */}
      <section className="py-20 md:py-28 bg-white text-[#323352]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#323352]">
              Does any of this sound familiar?
            </h2>
            <p className="text-[#5C5B77] text-lg max-w-xl mx-auto font-medium">
              How many of these have you experienced?
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Ruler,
                title: 'My trousers gape at the waist.'
              },
              {
                icon: Move,
                title: "They're too tight over my hips or thighs."
              },
              {
                icon: Activity,
                title: 'I have to keep pulling them up.'
              },
              {
                icon: Activity,
                title: "I can't squat or kneel comfortably."
              },
              {
                icon: PocketIcon,
                title: 'My pockets are too small for the tools I need.'
              },
              {
                icon: Tag,
                title: 'I never know which size to buy.'
              },
              {
                icon: Shield,
                title: "My PPE doesn't seem to fit properly."
              },
              {
                icon: HelpCircle,
                title: 'I just assumed this was normal.'
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-[#E8E4DB] hover:border-[#C76A32]/40 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col items-center justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="w-12 h-12 bg-[#F5F2EA] rounded-full flex items-center justify-center text-[#C76A32] group-hover:bg-[#C76A32]/10 group-hover:text-[#C76A32] transition-colors duration-300">
                  <card.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#323352] leading-relaxed">
                  {card.title}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#5C5B77] font-medium text-base">
              If you've found yourself saying any of these things, you're exactly who we built FitID for.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHY THIS HAPPENS (It's not just about size.) */}
      <section className="py-20 md:py-28 bg-[#F5F2EA] text-[#323352]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#323352]">
                It's not just about size.
              </h2>
              <div className="space-y-4 text-[#5C5B77] leading-relaxed text-base md:text-lg">
                <p>
                  Most women's workwear is still based on men's garment patterns, with "women's" versions often created by simply making them smaller.
                </p>
                <p>
                  Changing size doesn't solve differences in body shape, movement or the way women work.
                </p>
                <p className="font-semibold text-[#323352]">
                  That's why so many women experience the same frustrations—even when they're wearing the "correct" size.
                </p>
              </div>
            </div>

            {/* Right side comparative images */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Left Image: Men's pattern */}
              <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-lg border border-[#E8E4DB]">
                <img 
                  src="/trousers-men.png" 
                  alt="Trousers designed for men on women" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#000000] text-white text-xs font-semibold text-center py-2 px-3 rounded-lg shadow-md">
                  Designed for men
                </div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#E8E4DB] shadow-sm rotate-90 sm:rotate-0">
                <ArrowRight className="w-6 h-6 text-[#C76A32]" />
              </div>

              {/* Right Image: Women's pattern */}
              <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-lg border border-[#C76A32]/30">
                <img 
                  src="/trousers-women.png" 
                  alt="Trousers designed for women fit" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#C76A32] text-white text-xs font-semibold text-center py-2 px-3 rounded-lg shadow-md">
                  Designed for women
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHAT IS FITID? (Health Check Equation) */}
      <section className="py-20 md:py-28 bg-[#000000] text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Think of FitID as a health check for your workwear.
            </h2>
            <p className="text-[#FAF8F5]/70 text-lg">
              FitID looks at three things to identify the hidden reasons your workwear isn't working:
            </p>
          </div>

          {/* Equation Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center w-full max-w-[200px] flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5">
                <Ruler className="w-6 h-6 text-[#EAD8C3]" />
              </div>
              <p className="text-sm font-semibold leading-snug">
                How your body is shaped
              </p>
            </div>

            {/* Plus */}
            <div className="text-[#EAD8C3] font-light text-3xl font-heading shrink-0">+</div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center w-full max-w-[200px] flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5">
                <Move className="w-6 h-6 text-[#EAD8C3]" />
              </div>
              <p className="text-sm font-semibold leading-snug">
                How you move at work
              </p>
            </div>

            {/* Plus */}
            <div className="text-[#EAD8C3] font-light text-3xl font-heading shrink-0">+</div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center w-full max-w-[200px] flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5">
                <Briefcase className="w-6 h-6 text-[#EAD8C3]" />
              </div>
              <p className="text-sm font-semibold leading-snug">
                The type of work you do
              </p>
            </div>

            {/* Plus */}
            <div className="text-[#EAD8C3] font-light text-3xl font-heading shrink-0">+</div>

            {/* Step 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center w-full max-w-[200px] flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5">
                <AlertCircle className="w-6 h-6 text-[#EAD8C3]" />
              </div>
              <p className="text-sm font-semibold leading-snug">
                The problems you experience
              </p>
            </div>

            {/* Equal */}
            <div className="text-[#EAD8C3] font-light text-3xl font-heading shrink-0">=</div>

            {/* Result Circle */}
            <div className="flex flex-col items-center space-y-2 shrink-0">
              <div className="w-24 h-24 rounded-full bg-[#FAF8F5] text-[#000000] flex items-center justify-center font-heading font-black text-2xl shadow-xl border border-white/10">
                FitID
              </div>
              <p className="text-[#EAD8C3] text-xs font-semibold tracking-wider uppercase text-center max-w-[120px]">
                Your personalised FitID
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHAT YOU'LL RECEIVE (Your Personalised Fit Report) */}
      <section className="py-20 md:py-28 bg-white text-[#323352]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#323352]">
              Your personalised Fit Report
            </h2>
            <p className="text-[#5C5B77] text-lg max-w-xl mx-auto">
              After completing FitID you'll receive a detailed personalised report explaining:
            </p>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: AlertCircle,
                title: 'The most likely reasons behind the fit issues you experience.'
              },
              {
                icon: Activity,
                title: 'The movement and comfort challenges that affect you.'
              },
              {
                icon: Sparkles,
                title: 'Which garment features are likely to improve comfort and performance.'
              },
              {
                icon: UserCheck,
                title: 'Your unique FitID profile.'
              },
              {
                icon: Gift,
                title: 'Early access to Threadline products designed using these insights.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-[#FAF8F5] border border-[#E8E4DB] rounded-2xl p-6 text-center flex flex-col items-center space-y-4 hover:shadow-md hover:border-[#C76A32]/25 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white border border-[#E8E4DB] rounded-full flex items-center justify-center text-[#C76A32] shadow-sm">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-[#323352] leading-relaxed">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY WE BUILT FITID (Better workwear starts with better data) */}
      <section className="py-20 md:py-28 bg-[#F5F2EA] text-[#323352]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#323352]">
                Better workwear starts with better data.
              </h2>
              <div className="space-y-4 text-[#5C5B77] leading-relaxed text-base md:text-lg">
                <p>
                  For decades, women's workwear has been designed using surprisingly little information about how women actually work or how their clothing performs every day.
                </p>
                <p>
                  Every anonymous FitID completed helps us build a better understanding of where current workwear succeeds—and where it fails.
                </p>
                <p>
                  Those insights don't just help us design better products for Threadline.
                </p>
                <p className="font-semibold text-[#323352]">
                  They help challenge the assumption that women should simply adapt to workwear that wasn’t designed around them in the first place.
                </p>
              </div>
            </div>

            {/* Right side image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-white/40">
                <img 
                  src="/outdoor-woman.png" 
                  alt="Woman resting in mountain environment wearing workwear" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. READY? SECTION */}
      <section className="py-20 md:py-28 bg-[#000000] text-white overflow-hidden relative">
        {/* Background graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-8">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Let's find out why your workwear isn't working.
          </h2>
          
          <p className="text-[#FAF8F5]/85 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Completing FitID takes around <strong className="text-[#EAD8C3]">5 minutes</strong>. You'll receive your personalised Fit Report while helping shape the future of women's workwear.
          </p>

          <div className="flex flex-col items-center space-y-6 pt-4">
            <Button 
              asChild
              className="bg-[#fa6902] hover:bg-[#e05e00] text-white font-bold text-base px-10 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-[#fa6902]/50 cursor-pointer"
            >
              <Link to="/fitid/questionnaire">
                Start My FitID
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Floating Badge Centered/Bottom */}
          <div className="flex justify-center pt-8">
            <div className="relative flex items-center justify-center shrink-0 w-32 h-32">
              <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-[spin_25s_linear_infinite] opacity-60">
                <defs>
                  <path 
                    id="built-by-women" 
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                    fill="none" 
                  />
                </defs>
                <text fill="#EAD8C3" fontSize="8" fontWeight="600" letterSpacing="1.2">
                  <textPath href="#built-by-women" startOffset="0%">
                    BUILT BY WOMEN • FOR WOMEN •
                  </textPath>
                </text>
              </svg>
              
              <div className="w-12 h-12 rounded-full border border-[#EAD8C3]/30 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <Heart className="w-5 h-5 text-[#EAD8C3] fill-[#EAD8C3]/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
