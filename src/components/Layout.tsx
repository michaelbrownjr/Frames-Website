import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Layers, 
  Zap, 
  Palette, 
  Layout, 
  ShieldCheck, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  Download,
  CheckCircle2,
  Info
} from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[2rem] px-6 py-3 shadow-2xl shadow-blue-900/5">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
              <Smartphone className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900">Frames for Pixel™</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${currentPage === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('privacy')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${currentPage === 'privacy' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Privacy
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <a 
              href="#" 
              className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-900">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="md:hidden mt-4 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-6 shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="space-y-2">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className={`block w-full text-left px-6 py-4 text-lg font-bold rounded-2xl transition-all ${currentPage === 'home' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('privacy'); setIsMenuOpen(false); }}
                className={`block w-full text-left px-6 py-4 text-lg font-bold rounded-2xl transition-all ${currentPage === 'privacy' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Privacy Policy
              </button>
              <div className="pt-4">
                <a 
                  href="#" 
                  className="block w-full text-center bg-gray-900 text-white px-6 py-4 rounded-2xl text-lg font-bold"
                >
                  Get the App
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center mr-3">
                <Smartphone className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900">Frames for Pixel™</span>
            </div>
            <p className="text-gray-500 text-lg max-w-md mb-8 leading-relaxed">
              The ultimate tool for creating high-fidelity device mockups for your Google Pixel screenshots.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'GitHub'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-500 hover:text-blue-600 transition-colors">Features</button></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Showcase</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Release Notes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setCurrentPage('privacy')} className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</button></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center px-6">
          <p className="text-gray-400 text-sm mb-6 md:mb-0">
            © {new Date().getFullYear()} Frames for Pixel™. Google Pixel is a trademark of Google LLC.
          </p>
          <a href="#" className="block hover:scale-105 transition-transform">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Get it on Google Play" 
              className="h-10"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const features = [
    {
      title: "Batch Framing",
      description: "Frame dozens of screenshots at once with a single tap. Save time and maintain consistency.",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "One-tap Export",
      description: "Instantly export your framed images and videos in high resolution for any platform.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Dynamic Smart Styling",
      description: "Frames automatically adapt to your screenshot's colors for a seamless, professional look.",
      icon: <Palette className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Material 3 Expressive",
      description: "Built with the latest Material Design principles for a beautiful and intuitive experience.",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Adaptive Layouts",
      description: "Optimized for Foldables, Tablets, and Laptops. Your screenshots look great on any screen.",
      icon: <Layout className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-700"
    },
    {
      title: "Built for Pixel™",
      description: "High-fidelity frames for the entire Pixel lineup, from Pixel 9 to the latest Foldables.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100">
              <Smartphone className="w-4 h-4 mr-2" />
              Exclusively for Pixel™
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight mb-8">
              Screenshots, <br />
              <span className="text-blue-600 italic">elevated.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-xl font-medium">
              The ultimate tool to wrap your captures in stunning, high-fidelity Google Pixel device frames.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-20 w-auto"
                  referrerPolicy="no-referrer"
                />
              </a>
              <a href="#features" className="text-lg font-bold text-gray-900 flex items-center group">
                See what's new
                <div className="ml-3 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-16">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-200/50 transform -rotate-3 hover:rotate-0 transition-all duration-700 cursor-pointer group">
                  <img 
                    src="input_file_1.png" 
                    alt="Pixel 10 Frame" 
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-200/50 transform rotate-2 hover:rotate-0 transition-all duration-700 cursor-pointer group">
                  <img 
                    src="input_file_0.png" 
                    alt="Pixel Pro Fold Frame" 
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 transform rotate-6 hover:rotate-0 transition-all duration-700 cursor-pointer group">
                  <img 
                    src="input_file_2.png" 
                    alt="Pixel Tablet Frame" 
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/30 transform -rotate-2 flex flex-col justify-center h-64">
                  <p className="text-5xl font-black mb-2">100+</p>
                  <p className="text-blue-100 text-lg font-bold leading-tight">Pixel-perfect device frames</p>
                </div>
              </div>
            </div>
            {/* Expressive background shapes */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-100 rounded-[4rem] blur-3xl opacity-40 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-purple-100 rounded-[4rem] blur-3xl opacity-40 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Material 3 Style */}
      <section id="features" className="bg-gray-50 py-32 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">Built for the <br /><span className="text-blue-600">modern</span> workflow.</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">Everything you need to showcase your app or setup with professional precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-[1.5rem] flex items-center justify-center mb-8`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section - Dark Mode Expressive */}
      <section className="py-32 mt-12 bg-gray-950 text-white rounded-[4rem] mx-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
                Every <br />
                <span className="text-blue-400">Layout</span> <br />
                covered.
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-medium">
                From the compact Pixel 9 to the expansive Pixel Pro Fold and Tablet. Frames for Pixel™ adapts to your vision.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {['Pixel 9 & 10', 'Pro Fold', 'Pixel Tablet', 'ChromeOS'].map((item, i) => (
                  <div key={i} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mr-3" />
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <img 
                  src="input_file_2.png" 
                  alt="Tablet Showcase" 
                  className="rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.3)] border-[12px] border-gray-900"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Expressive Pill */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-blue-600 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-blue-600/40"
          >
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">Frame your <br />next big idea.</h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-16 max-w-2xl mx-auto font-medium">
                Join the community of creators building the future of Android showcases.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <a href="#" className="transition-transform hover:scale-110 active:scale-95">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-24 w-auto"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>
            </div>
            {/* Material 3 Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-[5rem] blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-[8rem] blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const dataBreakdown = [
    {
      title: "Zero Direct Data Collection",
      description: "Frames for Pixel does not directly collect, store, or transmit your personal information (such as name, email, or phone number) to our servers.",
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      bg: "bg-green-50",
      accent: "border-green-100"
    },
    {
      title: "Usage & Analytics",
      description: "We utilize industry-standard third-party services to understand app usage frequency and features accessed to optimize your experience.",
      icon: <Layers className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50",
      accent: "border-blue-100"
    },
    {
      title: "Crash Reporting",
      description: "If the app encounters an error, technical diagnostic data is collected automatically to help us identify and resolve the issue quickly.",
      icon: <Zap className="w-8 h-8 text-amber-600" />,
      bg: "bg-amber-50",
      accent: "border-amber-100"
    }
  ];

  const nodes = [
    { id: 'device', label: 'Your Device', icon: <Smartphone />, details: 'All image processing and framing happens locally on your device. Your screenshots never leave your phone.' },
    { id: 'analytics', label: 'Google Analytics', icon: <Layers />, details: 'Collects anonymized usage data like feature clicks and session duration to help us improve the app.' },
    { id: 'crashlytics', label: 'Firebase Crashlytics', icon: <Zap />, details: 'Captures technical logs and device state only when an error occurs to help us fix bugs.' }
  ];

  return (
    <div className="pt-32 pb-32 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
            Privacy <br />
            <span className="text-blue-600 italic">First.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl leading-relaxed">
            We believe your data belongs to you. Our policy is built on transparency and minimal data collection.
          </p>
        </div>
        
        {/* Summary Section */}
        <section className="mb-24">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Info className="w-8 h-8 mr-3" />
                Executive Summary
              </h2>
              <p className="text-xl text-blue-50 leading-relaxed max-w-3xl font-medium">
                Frames for Pixel is designed with a "privacy-by-default" architecture. We do not collect, store, or transmit any Personally Identifiable Information (PII). Any data processed for analytics or crash reporting is anonymized and handled by trusted industry leaders.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </div>
        </section>

        {/* Data Breakdown */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Data Collection Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataBreakdown.map((item, idx) => (
              <div key={idx} className={`${item.bg} ${item.accent} p-10 rounded-[3rem] border shadow-sm hover:shadow-xl transition-all duration-500`}>
                <div className="mb-8">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Diagram */}
        <section className="mb-32">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Information Flow</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              To deliver a stable and improving experience, Frames for Pixel™ interacts with trusted third-party services. Hover over each component to see how your data flows.
            </p>
          </div>
          
          <div className="relative bg-gray-50 rounded-[4rem] p-12 md:p-20 border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              {nodes.map((node, idx) => (
                <div key={node.id} className="relative flex flex-col items-center group">
                  <motion.div
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all cursor-help
                      ${hoveredNode === node.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                  >
                    <div className="scale-150">{node.icon}</div>
                  </motion.div>
                  <span className="mt-6 font-black text-gray-900 tracking-tight">{node.label}</span>
                  
                  {idx < nodes.length - 1 && (
                    <div className="hidden md:block absolute top-14 -right-20 w-16 h-0.5 bg-gray-200">
                      <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-gray-400"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="mt-16 p-10 bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 relative z-10"
                >
                  <p className="text-gray-700 text-xl leading-relaxed font-medium">
                    {nodes.find(n => n.id === hoveredNode)?.details}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-16 p-10 text-center text-gray-400 italic text-lg font-medium"
                >
                  Hover over a component to see how your data flows.
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-100 rounded-full blur-[100px] opacity-50"></div>
          </div>
        </section>

        {/* Detailed Policy Directory */}
        <section className="space-y-24">
          <h2 className="text-5xl font-black text-gray-900 tracking-tight">Detailed Policy Directory</h2>
          
          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Introduction & Agreement</h3>
              </div>
              <div className="md:col-span-2 prose prose-blue text-gray-600 max-w-none">
                <p className="text-lg leading-relaxed font-medium mb-6">
                  MichaelBTech, LLC ("we," "us," or "our") operates the Frames for Pixel Android application (the "App"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our App and the choices you have associated with that data.
                </p>
                <p className="text-lg leading-relaxed font-medium">
                  By using the App, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">1. Information Collection</h3>
              </div>
              <div className="md:col-span-2 prose prose-blue text-gray-600 max-w-none">
                <p className="text-lg leading-relaxed font-medium mb-6">
                  For a better experience while using our App, we may require you to provide us with certain personally identifiable information.
                </p>
                <p className="text-lg leading-relaxed font-medium mb-6">
                  However, Frames for Pixel does not directly collect, store, or transmit your personal information (such as your name, email address, or phone number) to our servers.
                </p>
                <p className="text-lg leading-relaxed font-medium">
                  The App does use third-party services that may collect information used to identify you, track App usage, and report app crashes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">2. Third-Party Services</h3>
              </div>
              <div className="md:col-span-2 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Google Analytics</h4>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium mb-6">
                    We use Google Analytics (via Firebase) to understand how users interact with our App. This service collects data such as the frequency of app usage, the features accessed, and general user interactions. This helps us optimize the user experience.
                  </p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                    Read Google Privacy Policy <ChevronRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Firebase Crashlytics</h4>
                  <p className="text-gray-600 text-lg leading-relaxed font-medium mb-6">
                    We use Firebase Crashlytics to track and analyze app crashes and errors. If the App crashes, Crashlytics automatically collects technical information about your device and the crash (such as the device model, operating system version, and the state of the App at the time of the crash) to help us diagnose and fix the issue.
                  </p>
                  <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                    Read Firebase Privacy Policy <ChevronRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              <div className="bg-gray-50 p-10 rounded-[3rem]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">3. Log Data</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  We want to inform you that whenever you use our App, in a case of an error in the App, we collect data and information (through third-party products mentioned above) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the App when utilizing our Service, the time and date of your use of the Service, and other statistics.
                </p>
              </div>
              <div className="bg-gray-50 p-10 rounded-[3rem]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">4. Cookies</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This App does not use these "cookies" explicitly. However, the App may use third-party code and libraries that use "cookies" or similar tracking technologies.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">5. Security</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    We value your trust in providing us your information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">6. Links to Other Sites</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    This App may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">7. Children’s Privacy</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-24 border-t border-gray-100">
              <div className="max-w-3xl mb-12">
                <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">8. Changes to This Policy</h3>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-md">
                  <h3 className="text-3xl font-bold mb-6 tracking-tight">9. Contact Us</h3>
                  <p className="text-gray-400 text-lg font-medium mb-8 leading-relaxed">
                    If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Email Address</p>
                      <a href="mailto:michael@michaelbtech.com" className="text-2xl font-black hover:text-blue-400 transition-colors">
                        michael@michaelbtech.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-32 h-32 text-blue-600 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export { Navbar, Footer, Home, PrivacyPolicy };
