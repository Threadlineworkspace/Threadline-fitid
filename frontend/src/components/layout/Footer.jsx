// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
// import { Shield } from 'lucide-react';

// export const Footer = () => {
//   // Function to scroll to top when admin link is clicked
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="bg-[#323352] text-white">
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           {/* Brand */}
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center gap-2 group">
//               <img 
//                 src="/threadlinelogo.jpeg" 
//                 alt="Threadline" 
//                 className="h-10 w-auto transition-transform group-hover:scale-105"
//               />
//             </Link>
//             <p className="text-white/70 text-sm leading-relaxed">
//               Building fit intelligence for women in workwear. 
//               Better fit, better performance, better safety.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm text-white/70">
//               <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
//               <li><Link to="/fitid" className="hover:text-white transition-colors">Find Your Fit</Link></li>
//               <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h4 className="font-semibold mb-4">Resources</h4>
//             <ul className="space-y-2 text-sm text-white/70">
//               <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
//             </ul>
//           </div>

//           {/* Social & Admin */}
//           <div>
//             <h4 className="font-semibold mb-4">Connect</h4>
//             <div className="flex gap-4 mb-4">
//               <a 
//                 href="#" 
//                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
//                 aria-label="Instagram"
//               >
//                 <FaInstagram className="w-5 h-5" />
//               </a>
//               <a 
//                 href="#" 
//                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
//                 aria-label="Twitter"
//               >
//                 <FaTwitter className="w-5 h-5" />
//               </a>
//               <a 
//                 href="#" 
//                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
//                 aria-label="LinkedIn"
//               >
//                 <FaLinkedinIn className="w-5 h-5" />
//               </a>
//               <a 
//                 href="#" 
//                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
//                 aria-label="YouTube"
//               >
//                 <FaYoutube className="w-5 h-5" />
//               </a>
//               <a 
//                 href="#" 
//                 className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
//                 aria-label="Email"
//               >
//                 <MdEmail className="w-5 h-5" />
//               </a>
//             </div>
            
//             {/* Admin Login Link - Scrolls to top */}
//             <div className="pt-4 border-t border-white/10">
//               <Link 
//                 to="/admin/login" 
//                 onClick={scrollToTop}
//                 className="text-white/30 hover:text-white/70 text-xs flex items-center gap-1 transition-colors"
//               >
//                 <Shield className="w-3 h-3" />
//                 Admin Login
//               </Link>
//             </div>
            
//             <p className="text-white/50 text-xs mt-4">
//               © {new Date().getFullYear()} Threadline. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Shield } from 'lucide-react';

export const Footer = () => {
  // Function to scroll to top when admin link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#323352] border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="/threadlinelogo.svg" 
                alt="Threadline" 
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-[#5C5B77] text-sm leading-relaxed">
              Building fit intelligence for women in workwear. 
              Better fit, better performance, better safety.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#323352]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#5C5B77]">
              <li><Link to="/" className="hover:text-[#fa6902] transition-colors">Home</Link></li>
              <li><Link to="/fitid/questionnaire" className="hover:text-[#fa6902] transition-colors">Find Your Fit</Link></li>
              <li><Link to="/about" className="hover:text-[#fa6902] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Social & Admin */}
          <div>
            <h4 className="font-semibold mb-4 text-[#323352]">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://www.instagram.com/threadline_workwear?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#F5F2EA] rounded-lg flex items-center justify-center hover:bg-[#E8E4DB] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-[#323352]" />
              </a>
              <a 
                href="mailto:emma@threadline.work" 
                className="w-10 h-10 bg-[#F5F2EA] rounded-lg flex items-center justify-center hover:bg-[#E8E4DB] transition-colors"
                aria-label="Email"
              >
                <MdEmail className="w-5 h-5 text-[#323352]" />
              </a>
            </div>
            
            {/* Admin Login Link - Scrolls to top */}
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/admin/login" 
                onClick={scrollToTop}
                className="text-[#5C5B77] hover:text-[#fa6902] text-xs flex items-center gap-1 transition-colors"
              >
                <Shield className="w-3 h-3" />
                Admin Login
              </Link>
            </div>
            
            <p className="text-[#5C5B77]/50 text-xs mt-4">
              © {new Date().getFullYear()} Threadline. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
