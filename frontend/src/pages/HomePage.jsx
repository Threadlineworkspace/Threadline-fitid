// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   ArrowRight, 
//   Ruler, 
//   Shield, 
//   Users, 
//   Award,
//   TrendingUp,
//   ArrowUpRight,
//   Quote,
//   ChevronRight,
//   Star,
//   CheckCircle,
//   ClipboardList,
//   UserCheck,
//   Target,
//   Zap,
//   LayoutGrid,
//   Move,
//   BarChart3,
//   Gem,
//   PenTool,
//   Layers,
//   Sparkles
// } from 'lucide-react';
// import { Button } from '../components/ui/button';

// // Parallax section component
// const ParallaxSection = ({ children, offset = 50 }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });
//   const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

//   return (
//     <motion.div ref={ref} style={{ y }}>
//       {children}
//     </motion.div>
//   );
// };

// export const HomePage = () => {
//   const [hoveredCard, setHoveredCard] = React.useState(null);

//   return (
//     <div className="pt-20 overflow-hidden">
//       {/* Hero Section - Premium */}
//       <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#F5F2EA] via-white to-[#F5F2EA]">
//         {/* Abstract Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C76A32]/5 rounded-full blur-3xl" />
//           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#323352]/5 rounded-full blur-3xl" />
//           <motion.div
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#C76A32]/10 rounded-full"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//           />
//         </div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-[#323352]/10 text-[#323352] rounded-full text-sm font-medium tracking-wide mb-8"
//               >
//                 <Gem className="w-4 h-4" />
//                 <span>Fit Intelligence Platform</span>
//               </motion.div>

//               <motion.h1 
//                 className="font-heading text-5xl md:text-7xl font-bold text-[#323352] leading-[1.1] mb-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.8 }}
//               >
//                 Workwear That
//                 <span className="relative block mt-2 text-[#C76A32] italic">
//                   Actually Works
//                   <motion.span 
//                     className="absolute -bottom-2 left-0 w-full h-1 bg-[#C76A32]/30 rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: '100%' }}
//                     transition={{ delay: 1, duration: 0.8 }}
//                   />
//                 </span>
//               </motion.h1>

//               <motion.p 
//                 className="text-lg text-[#5C5B77] max-w-lg leading-relaxed mb-10"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//               >
//                 Most workwear sizing is based on outdated, male-first systems. 
//                 Threadline is building a better system — designed around real bodies 
//                 and real movement.
//               </motion.p>

//               <motion.div 
//                 className="flex flex-col sm:flex-row gap-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7, duration: 0.6 }}
//               >
//                 <Button 
//                   asChild 
//                   size="lg" 
//                   className="bg-[#C76A32] hover:bg-[#B85D2A] text-white px-8 py-7 text-base rounded-xl group transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   <Link to="/fitid">
//                     Get Your Fit ID
//                     <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </Button>
//                 <Button 
//                   asChild 
//                   size="lg" 
//                   variant="outline"
//                   className="border-[#323352] text-[#323352] hover:bg-[#323352] hover:text-white px-8 py-7 text-base rounded-xl transition-all duration-300"
//                 >
//                   <Link to="/about">
//                     Learn More
//                     <ChevronRight className="w-4 h-4 ml-2" />
//                   </Link>
//                 </Button>
//               </motion.div>

//               {/* Trust indicators */}
//               <motion.div 
//                 className="flex items-center gap-8 mt-10"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.9, duration: 0.6 }}
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="flex -space-x-2">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C76A32] to-[#323352] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
//                         {String.fromCharCode(64 + i)}
//                       </div>
//                     ))}
//                   </div>
//                   <span className="text-sm text-[#5C5B77] font-medium">
//                     <span className="font-bold text-[#323352]">2.4k+</span> women already
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 fill-[#C76A32] text-[#C76A32]" />
//                   ))}
//                   <span className="text-sm text-[#5C5B77] ml-2">4.9/5</span>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right Content - Premium Card */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
//               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
//               className="relative"
//             >
//               <div className="relative bg-gradient-to-br from-[#323352] to-[#1a1a3e] rounded-3xl p-10 text-white shadow-2xl overflow-hidden">
//                 {/* Card background pattern */}
//                 <div className="absolute inset-0 opacity-10">
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#C76A32] rounded-full blur-3xl" />
//                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
//                 </div>
                
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-8">
//                     <div>
//                       <p className="text-sm opacity-60 font-medium tracking-wide">YOUR FIT ID</p>
//                       <p className="text-3xl font-heading font-bold text-white mt-1">Lift</p>
//                     </div>
//                     <div className="w-12 h-12 bg-[#C76A32]/20 rounded-full flex items-center justify-center border border-[#C76A32]/30">
//                       <Target className="w-6 h-6 text-[#C76A32]" />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
//                       <div className="w-10 h-10 bg-[#C76A32]/20 rounded-lg flex items-center justify-center">
//                         <Ruler className="w-5 h-5 text-[#C76A32]" />
//                       </div>
//                       <div>
//                         <p className="text-sm opacity-60">Profile</p>
//                         <p className="font-semibold">Projection · Seat Focus</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
//                       <div className="w-10 h-10 bg-[#C76A32]/20 rounded-lg flex items-center justify-center">
//                         <Move className="w-5 h-5 text-[#C76A32]" />
//                       </div>
//                       <div>
//                         <p className="text-sm opacity-60">Movement</p>
//                         <p className="font-semibold">Dynamic · High Mobility</p>
//                       </div>
//                     </div>
//                   </div>

//                   <Button 
//                     asChild 
//                     className="w-full mt-8 bg-white text-[#323352] hover:bg-white/90 rounded-xl py-6 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
//                   >
//                     <Link to="/fitid">
//                       Discover Your Fit
//                       <ArrowUpRight className="w-4 h-4 ml-2" />
//                     </Link>
//                   </Button>
//                 </div>
//               </div>

//               {/* Floating badge */}
//               <motion.div 
//                 className="absolute -top-4 -right-4 bg-[#C76A32] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
//               >
//                 ✦ Free
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div 
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <span className="text-xs text-[#5C5B77] tracking-widest uppercase">Scroll</span>
//           <div className="w-6 h-10 border-2 border-[#5C5B77]/30 rounded-full flex justify-center">
//             <motion.div 
//               className="w-1.5 h-3 bg-[#C76A32] rounded-full mt-2"
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* Features Section - Premium */}
//       <section className="py-24 bg-white relative">
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C76A32]/20 to-transparent" />
        
//         <div className="container mx-auto px-4">
//           <motion.div 
//             className="text-center max-w-3xl mx-auto mb-20"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase mb-4 block">Why Threadline</span>
//             <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#323352] mb-4">
//               Fit Intelligence,<br />Reimagined
//             </h2>
//             <p className="text-[#5C5B77] text-lg max-w-2xl mx-auto">
//               We're building the future of workwear fit — starting with women in the trades.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Ruler,
//                 title: 'Precision Fit',
//                 description: 'Engineered around real body proportions and movement patterns — not simplified sizing charts.',
//                 color: '#C76A32',
//                 delay: 0
//               },
//               {
//                 icon: Shield,
//                 title: 'Designed for Movement',
//                 description: 'Patterns developed specifically for how women move, squat, climb, and work in real environments.',
//                 color: '#323352',
//                 delay: 0.1
//               },
//               {
//                 icon: Users,
//                 title: 'Community Powered',
//                 description: 'Built with data from thousands of women in trades, construction, manufacturing, and beyond.',
//                 color: '#C76A32',
//                 delay: 0.2
//               }
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: feature.delay, duration: 0.6 }}
//                 className="group relative p-8 bg-[#F5F2EA] rounded-2xl border border-transparent hover:border-[#C76A32]/20 transition-all duration-500 hover:shadow-xl cursor-pointer"
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-[#C76A32]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
//                 <div className="relative">
//                   <motion.div 
//                     className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
//                     style={{ backgroundColor: `${feature.color}15` }}
//                     animate={hoveredCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
//                   </motion.div>
                  
//                   <h3 className="text-xl font-bold text-[#323352] mb-3">{feature.title}</h3>
//                   <p className="text-[#5C5B77] leading-relaxed">{feature.description}</p>
                  
//                   <motion.div 
//                     className="mt-6 flex items-center gap-2 text-[#C76A32] font-medium"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={hoveredCard === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <span>Learn more</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works - Premium */}
//       <section className="py-24 bg-[#F5F2EA] relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#C76A32]/5 rounded-full" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#C76A32]/10 rounded-full" />
//         </div>

//         <div className="container mx-auto px-4 relative">
//           <motion.div 
//             className="text-center max-w-3xl mx-auto mb-20"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase mb-4 block">How It Works</span>
//             <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#323352] mb-4">
//               Three Steps to Your Fit ID
//             </h2>
//             <p className="text-[#5C5B77] text-lg">Find your personalized fit profile in minutes.</p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {[
//               {
//                 step: '01',
//                 title: 'Answer a Few Questions',
//                 description: 'Share your fit preferences, movement patterns, and body distribution.',
//                 icon: ClipboardList,
//                 color: '#C76A32'
//               },
//               {
//                 step: '02',
//                 title: 'Get Your Fit ID',
//                 description: 'Receive your personalized Fit ID — Lift, Triangle, or Rectangle.',
//                 icon: UserCheck,
//                 color: '#323352'
//               },
//               {
//                 step: '03',
//                 title: 'Join the Community',
//                 description: 'Be part of building better workwear for women everywhere.',
//                 icon: Users,
//                 color: '#C76A32'
//               }
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.15, duration: 0.6 }}
//                 className="text-center group"
//               >
//                 <div className="relative inline-block mb-8">
//                   <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                     <item.icon className="w-10 h-10" style={{ color: item.color }} />
//                   </div>
//                   {index < 2 && (
//                     <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-px bg-[#C76A32]/30">
//                       <motion.div 
//                         className="h-px bg-[#C76A32]"
//                         initial={{ width: 0 }}
//                         whileInView={{ width: '100%' }}
//                         viewport={{ once: true }}
//                         transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="text-sm text-[#C76A32] font-semibold tracking-widest mb-3">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-bold text-[#323352] mb-3">{item.title}</h3>
//                 <p className="text-[#5C5B77]">{item.description}</p>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div 
//             className="text-center mt-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             <Button asChild size="lg" className="bg-[#C76A32] hover:bg-[#B85D2A] text-white px-10 py-7 text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
//               <Link to="/fitid">
//                 Start Your Fit ID
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section - Premium */}
//       <section className="py-24 bg-[#323352] text-white relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-[#C76A32]/20 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C76A32]/10 rounded-full blur-3xl" />
//         </div>

//         <div className="container mx-auto px-4 relative">
//           <motion.div 
//             className="text-center max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
//               className="w-16 h-16 bg-[#C76A32]/20 rounded-full flex items-center justify-center mx-auto mb-6"
//             >
//               <Target className="w-8 h-8 text-[#C76A32]" />
//             </motion.div>
            
//             <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
//               Ready to Find Your Fit?
//             </h2>
//             <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
//               Join thousands of women discovering better workwear fit.
//             </p>
//             <Button asChild size="lg" className="bg-white text-[#323352] hover:bg-white/90 px-10 py-7 text-base rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl">
//               <Link to="/fitid">
//                 Get Your Fit ID Now
//                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Ruler, 
  Shield, 
  Users, 
  Award,
  ArrowUpRight,
  Quote,
  ChevronRight,
  Star,
  Target,
  Move,
  Gem,
  ClipboardList,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Parallax section component
const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentFitId, setCurrentFitId] = useState(0);
  const fitIds = ['Lift', 'Triangle', 'Rectangle'];

  const fitIdDetails = {
    'Lift': {
      icon: Target,
      profile: 'Projection · Seat Focus',
      movement: 'Dynamic · High Mobility',
      color: '#EA580C',
      bgColor: 'bg-orange-500/20',
    },
    'Triangle': {
      icon: Move,
      profile: 'Waist-to-Hip Variance',
      movement: 'Stability Focus',
      color: '#3B82F6',
      bgColor: 'bg-blue-500/20',
    },
    'Rectangle': {
      icon: Ruler,
      profile: 'Balanced Proportions',
      movement: 'Standard Fit',
      color: '#059669',
      bgColor: 'bg-emerald-500/20',
    }
  };

  // Cycle through FitIDs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFitId((prev) => (prev + 1) % fitIds.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentId = fitIds[currentFitId];
  const details = fitIdDetails[currentId];
  const IconComponent = details.icon;

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section - Premium */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#F5F2EA] via-white to-[#F5F2EA]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C76A32]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#323352]/5 rounded-full blur-3xl" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#C76A32]/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#323352]/10 text-[#323352] rounded-full text-sm font-medium tracking-wide mb-8"
              >
                <Gem className="w-4 h-4" />
                <span>Fit Intelligence Platform</span>
              </motion.div>

              <motion.h1 
                className="font-heading text-5xl md:text-7xl font-bold text-[#323352] leading-[1.1] mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Workwear That
                <span className="relative block mt-2 text-[#C76A32] italic">
                  Actually Works
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-[#C76A32]/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg text-[#5C5B77] max-w-lg leading-relaxed mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Most workwear sizing is based on outdated, male-first systems. 
                Threadline is building a better system — designed around real bodies 
                and real movement.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-[#C76A32] hover:bg-[#B85D2A] text-white px-8 py-7 text-base rounded-xl group transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link to="/fitid">
                    Get Your Fit ID
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-[#323352] text-[#323352] hover:bg-[#323352] hover:text-white px-8 py-7 text-base rounded-xl transition-all duration-300"
                >
                  <Link to="/about">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                className="flex items-center gap-8 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C76A32] to-[#323352] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-[#5C5B77] font-medium">
                    <span className="font-bold text-[#323352]">2.4k+</span> women already
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C76A32] text-[#C76A32]" />
                  ))}
                  <span className="text-sm text-[#5C5B77] ml-2">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Premium Animated Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#323352] to-[#1a1a3e] rounded-3xl p-10 text-white shadow-2xl overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C76A32] rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-sm opacity-60 font-medium tracking-wide">YOUR FIT ID</p>
                      <motion.p 
                        key={currentId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl font-heading font-bold text-white mt-1"
                      >
                        {currentId}
                      </motion.p>
                    </div>
                    <motion.div 
                      key={`icon-${currentId}`}
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 bg-[#C76A32]/20 rounded-full flex items-center justify-center border border-[#C76A32]/30"
                    >
                      <IconComponent className="w-6 h-6 text-[#C76A32]" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <motion.div 
                      key={`profile-${currentId}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-10 h-10 bg-[#C76A32]/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#C76A32]" />
                      </div>
                      <div>
                        <p className="text-sm opacity-60">Profile</p>
                        <p className="font-semibold">{details.profile}</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      key={`movement-${currentId}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-10 h-10 bg-[#C76A32]/20 rounded-lg flex items-center justify-center">
                        <Move className="w-5 h-5 text-[#C76A32]" />
                      </div>
                      <div>
                        <p className="text-sm opacity-60">Movement</p>
                        <p className="font-semibold">{details.movement}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {fitIds.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFitId(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentFitId === index ? 'w-6 bg-[#C76A32]' : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Show ${fitIds[index]} FitID`}
                      />
                    ))}
                  </div>

                  <Button 
                    asChild 
                    className="w-full mt-6 bg-white text-[#323352] hover:bg-white/90 rounded-xl py-6 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Link to="/fitid">
                      Discover Your Fit
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-[#C76A32] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              >
                <span>✦</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-[#5C5B77] tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#5C5B77]/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-3 bg-[#C76A32] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Premium */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C76A32]/20 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase mb-4 block">Why Threadline</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#323352] mb-4">
              Fit Intelligence,<br />Reimagined
            </h2>
            <p className="text-[#5C5B77] text-lg max-w-2xl mx-auto">
              We're building the future of workwear fit — starting with women in the trades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Ruler,
                title: 'Precision Fit',
                description: 'Engineered around real body proportions and movement patterns — not simplified sizing charts.',
                color: '#C76A32',
                delay: 0
              },
              {
                icon: Shield,
                title: 'Designed for Movement',
                description: 'Patterns developed specifically for how women move, squat, climb, and work in real environments.',
                color: '#323352',
                delay: 0.1
              },
              {
                icon: Users,
                title: 'Community Powered',
                description: 'Built with data from thousands of women in trades, construction, manufacturing, and beyond.',
                color: '#C76A32',
                delay: 0.2
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                className="group relative p-8 bg-[#F5F2EA] rounded-2xl border border-transparent hover:border-[#C76A32]/20 transition-all duration-500 hover:shadow-xl cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C76A32]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <motion.div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}15` }}
                    animate={hoveredCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-[#323352] mb-3">{feature.title}</h3>
                  <p className="text-[#5C5B77] leading-relaxed">{feature.description}</p>
                  
                  <motion.div 
                    className="mt-6 flex items-center gap-2 text-[#C76A32] font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={hoveredCard === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Premium */}
      <section className="py-24 bg-[#F5F2EA] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#C76A32]/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#C76A32]/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase mb-4 block">How It Works</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#323352] mb-4">
              Three Steps to Your Fit ID
            </h2>
            <p className="text-[#5C5B77] text-lg">Find your personalized fit profile in minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Answer a Few Questions',
                description: 'Share your fit preferences, movement patterns, and body distribution.',
                icon: ClipboardList,
                color: '#C76A32'
              },
              {
                step: '02',
                title: 'Get Your Fit ID',
                description: 'Receive your personalized Fit ID — Lift, Triangle, or Rectangle.',
                icon: UserCheck,
                color: '#323352'
              },
              {
                step: '03',
                title: 'Join the Community',
                description: 'Be part of building better workwear for women everywhere.',
                icon: Users,
                color: '#C76A32'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10" style={{ color: item.color }} />
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-px bg-[#C76A32]/30">
                      <motion.div 
                        className="h-px bg-[#C76A32]"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
                      />
                    </div>
                  )}
                </div>
                <div className="text-sm text-[#C76A32] font-semibold tracking-widest mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#323352] mb-3">{item.title}</h3>
                <p className="text-[#5C5B77]">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button asChild size="lg" className="bg-[#C76A32] hover:bg-[#B85D2A] text-white px-10 py-7 text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <Link to="/fitid">
                Start Your Fit ID
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 bg-[#323352] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C76A32]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C76A32]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-[#C76A32]/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Target className="w-8 h-8 text-[#C76A32]" />
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Ready to Find Your Fit?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of women discovering better workwear fit.
            </p>
            <Button asChild size="lg" className="bg-white text-[#323352] hover:bg-white/90 px-10 py-7 text-base rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl">
              <Link to="/fitid">
                Get Your Fit ID Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};