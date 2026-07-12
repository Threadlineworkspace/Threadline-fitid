// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import { 
//   Target, 
//   Heart, 
//   Users, 
//   Lightbulb, 
//   Award,
//   TrendingUp,
//   Shield,
//   ArrowRight,
//   Quote,
//   Gem,
//   BarChart3,
//   Zap
// } from 'lucide-react';

// export const AboutPage = () => {
//   return (
//     <div className="pt-20 overflow-hidden">
//       {/* Hero */}
//       <section className="relative py-24 bg-gradient-to-b from-[#F5F2EA] to-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
//               className="w-20 h-20 bg-[#C76A32]/10 rounded-2xl flex items-center justify-center mx-auto mb-8"
//             >
//               <Gem className="w-10 h-10 text-[#C76A32]" />
//             </motion.div>
            
//             <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#323352] mb-6">
//               Building the Future of
//               <span className="block text-[#C76A32] italic">Fit Intelligence</span>
//             </h1>
//             <p className="text-lg text-[#5C5B77] max-w-2xl mx-auto leading-relaxed">
//               Threadline exists to solve one fundamental problem: women are consistently being supplied 
//               with workwear and PPE that does not fit properly.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Mission */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase">Our Mission</span>
//               <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#323352] mt-4 mb-6">
//                 Fit That Works for Everyone
//               </h2>
//               <p className="text-[#5C5B77] leading-relaxed mb-4">
//                 Poor fit causes discomfort, reduced mobility, lower confidence, safety concerns, 
//                 and reduced productivity.
//               </p>
//               <p className="text-[#5C5B77] leading-relaxed">
//                 We're building the infrastructure that understands how garments interact with real bodies.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="grid grid-cols-2 gap-4"
//             >
//               {[
//                 { label: 'Women Served', value: '2.4k+' },
//                 { label: 'Fit Profiles', value: '3' },
//                 { label: 'Countries', value: '12+' },
//                 { label: 'Accuracy', value: '98%' }
//               ].map((stat, index) => (
//                 <div key={index} className="p-6 bg-[#F5F2EA] rounded-xl text-center">
//                   <div className="text-2xl font-bold text-[#C76A32]">{stat.value}</div>
//                   <div className="text-sm text-[#5C5B77]">{stat.label}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="py-20 bg-[#F5F2EA]">
//         <div className="container mx-auto px-4">
//           <motion.div 
//             className="text-center max-w-3xl mx-auto mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-[#C76A32] text-sm font-semibold tracking-widest uppercase">Our Values</span>
//             <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#323352] mt-4">
//               What Drives Us Forward
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
//             {[
//               {
//                 icon: Target,
//                 title: 'Precision',
//                 description: 'Data-driven fit, not guesswork'
//               },
//               {
//                 icon: Heart,
//                 title: 'Community',
//                 description: 'Built with and for women in trades'
//               },
//               {
//                 icon: Users,
//                 title: 'Inclusivity',
//                 description: 'Every body shape deserves proper fit'
//               },
//               {
//                 icon: Lightbulb,
//                 title: 'Innovation',
//                 description: 'Building the future of fit intelligence'
//               }
//             ].map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 className="group p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#C76A32]/20"
//               >
//                 <div className="w-12 h-12 bg-[#C76A32]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <value.icon className="w-6 h-6 text-[#C76A32]" />
//                 </div>
//                 <h3 className="font-bold text-[#323352] mb-2">{value.title}</h3>
//                 <p className="text-sm text-[#5C5B77]">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vision */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto"
//           >
//             <div className="relative p-12 bg-gradient-to-br from-[#323352] to-[#1a1a3e] rounded-3xl text-white overflow-hidden">
//               <div className="absolute inset-0 opacity-10">
//                 <div className="absolute top-0 right-0 w-96 h-96 bg-[#C76A32] rounded-full blur-3xl" />
//               </div>
//               <div className="relative">
//                 <Quote className="w-12 h-12 text-[#C76A32] mb-6" />
//                 <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6">
//                   The Long-Term Vision
//                 </h3>
//                 <p className="text-white/70 leading-relaxed mb-6">
//                   Threadline intends to become the infrastructure that understands how garments 
//                   interact with real bodies.
//                 </p>
//                 <div className="space-y-3 text-white/70">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-[#C76A32] rounded-full" />
//                     <span>Women's Workwear → Community → Structured Fit Data</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-[#C76A32] rounded-full" />
//                     <span>Fit Intelligence → Employer Tools → Manufacturer Insights</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-[#C76A32] rounded-full" />
//                     <span>Industry Platform → Better Workwear for Everyone</span>
//                   </div>
//                 </div>
//                 <Button asChild className="mt-8 bg-[#C76A32] hover:bg-[#B85D2A] text-white">
//                   <Link to="/fitid">
//                     Join the Movement
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Target, 
  Heart, 
  Users, 
  Lightbulb, 
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
  Quote,
  Gem,
  BarChart3,
  Zap
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-[#F5F2EA] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-[#fa6902]/10 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <Gem className="w-10 h-10 text-[#fa6902]" />
            </motion.div>
            
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#323352] mb-6">
              Building the Future of
              <span className="block text-[#fa6902] italic">Fit Intelligence</span>
            </h1>
            <p className="text-lg text-[#5C5B77] max-w-2xl mx-auto leading-relaxed">
              Threadline exists to solve one fundamental problem: women are consistently being supplied 
              with workwear and PPE that does not fit properly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#fa6902] text-sm font-semibold tracking-widest uppercase">Our Mission</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#323352] mt-4 mb-6">
                Fit That Works for Everyone
              </h2>
              <p className="text-[#5C5B77] leading-relaxed mb-4">
                Poor fit causes discomfort, reduced mobility, lower confidence, safety concerns, 
                and reduced productivity.
              </p>
              <p className="text-[#5C5B77] leading-relaxed">
                We're building the infrastructure that understands how garments interact with real bodies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Women Served', value: '2.4k+' },
                { label: 'Fit Profiles', value: '3' },
                { label: 'Countries', value: '12+' },
                { label: 'Accuracy', value: '98%' }
              ].map((stat, index) => (
                <div key={index} className="p-6 bg-[#F5F2EA] rounded-xl text-center">
                  <div className="text-2xl font-bold text-[#fa6902]">{stat.value}</div>
                  <div className="text-sm text-[#5C5B77]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F5F2EA]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#fa6902] text-sm font-semibold tracking-widest uppercase">Our Values</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#323352] mt-4">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Precision',
                description: 'Data-driven fit, not guesswork'
              },
              {
                icon: Heart,
                title: 'Community',
                description: 'Built with and for women in trades'
              },
              {
                icon: Users,
                title: 'Inclusivity',
                description: 'Every body shape deserves proper fit'
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Building the future of fit intelligence'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-6 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#fa6902]/20"
              >
                <div className="w-12 h-12 bg-[#fa6902]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-[#fa6902]" />
                </div>
                <h3 className="font-bold text-[#323352] mb-2">{value.title}</h3>
                <p className="text-sm text-[#5C5B77]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative p-12 bg-gradient-to-br from-[#323352] to-[#1a1a3e] rounded-3xl text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#fa6902] rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <Quote className="w-12 h-12 text-[#fa6902] mb-6" />
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  The Long-Term Vision
                </h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Threadline intends to become the infrastructure that understands how garments 
                  interact with real bodies.
                </p>
                <div className="space-y-3 text-white/70">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#fa6902] rounded-full" />
                    <span>Women's Workwear → Community → Structured Fit Data</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#fa6902] rounded-full" />
                    <span>Fit Intelligence → Employer Tools → Manufacturer Insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#fa6902] rounded-full" />
                    <span>Industry Platform → Better Workwear for Everyone</span>
                  </div>
                </div>
                <Button asChild className="mt-8 bg-[#fa6902] hover:bg-[#e05e00] text-white">
                  <Link to="/fitid">
                    Join the Movement
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};