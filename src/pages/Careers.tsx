import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart, Upload, Send, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

// --- Imported assets ---
import textureBg from '/src/assets/texture.webp';
import careerBg from '/src/assets/career.webp';


const Careers = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const benefits = [
    { icon: TrendingUp, title: 'Career Growth', description: 'Opportunities for professional development and advancement' },
    { icon: Heart, title: 'Work-Life Balance', description: 'Flexible working arrangements and comprehensive benefits' },
    { icon: Users, title: 'Team Environment', description: 'Collaborative culture with diverse, talented professionals' },
    { icon: Briefcase, title: 'Competitive Package', description: 'Attractive salary and benefits package with performance incentives' }
  ];

  const jobOpenings = [
    { title: 'Sales Manager', department: 'Sales & Marketing', location: 'Dubai', type: 'Full-time', experience: '5+ years' },
    { title: 'Warehouse Supervisor', department: 'Operations', location: 'Abu Dhabi', type: 'Full-time', experience: '3+ years' },
    { title: 'Logistics Coordinator', department: 'Logistics', location: 'Sharjah', type: 'Full-time', experience: '2+ years' },
    { title: 'Business Development Executive', department: 'Business Development', location: 'Dubai', type: 'Full-time', experience: '3+ years' },
    { title: 'Accounts Manager', department: 'Finance', location: 'Dubai', type: 'Full-time', experience: '4+ years' },
    { title: 'Customer Service Representative', department: 'Customer Service', location: 'Multiple Locations', type: 'Full-time', experience: '1+ years' }
  ];

  const onSubmit = (data: any) => {
    const formData = { ...data, resume: selectedFile };
    console.log('Application submitted:', formData);
    // Use a custom modal in a real app instead of alert
    alert('Thank you for your application! We will review it and get back to you soon.');
    reset();
    setSelectedFile(null);
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setValue('resume', file, { shouldValidate: true });
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [setValue]);

  return (
    <div 
      className="pt-0"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA',
      }}
    >
      <section id="careers-hero" className="relative h-screen flex items-center justify-center rounded-b-[4rem] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${careerBg})`,
          }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAFAFA]">
          {/* --- UPDATED: Applied the 'font-carsole' class --- */}
          <motion.h1
            className="font-carsole text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Our <span style={{ color: '#C6A664' }}>Success Story</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build your career with Al-Fajar Sadiq and be part of the UAE's leading general trading company.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#openings" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">
              View Openings
            </a>
            <a href="#application-form" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300">
              Submit Application
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#FAFAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Al-Fajar Sadiq?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-[#FAFAFA] p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <benefit.icon className="h-12 w-12 mx-auto mb-4" style={{ color: '#C6A664' }} />
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#234E70' }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#707070' }}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Current Opportunities
          </motion.h2>
          
          <div className="grid gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                className="bg-[#FAFAFA] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4"
                style={{ borderColor: '#C6A664' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#234E70' }}>{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm" style={{ color: '#707070' }}>
                      <span><Briefcase className="inline h-4 w-4 mr-1" /> {job.department}</span>
                      <span><Users className="inline h-4 w-4 mr-1" /> {job.location}</span>
                      <span><Clock className="inline h-4 w-4 mr-1" /> {job.type}</span>
                      <span><TrendingUp className="inline h-4 w-4 mr-1" /> {job.experience}</span>
                    </div>
                  </div>
                  <a href="#application-form" className="inline-flex items-center justify-center px-6 py-2 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] self-start md:self-center">
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="application-form" className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Submit Your Application
          </motion.h2>
          
          <motion.div
            className="bg-[#FAFAFA] p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Full Name *</label>
                  <input type="text" {...register('fullName', { required: 'Full name is required' })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent" placeholder="Enter your full name" />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Email Address *</label>
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent" placeholder="Enter your email" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Phone Number *</label>
                  <input type="tel" {...register('phone', { required: 'Phone number is required' })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent" placeholder="+971 XX XXX XXXX" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Position Applied For *</label>
                  <select {...register('position', { required: 'Please select a position' })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent">
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (<option key={job.title} value={job.title}>{job.title} - {job.location}</option>))}
                  </select>
                  {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message as string}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Cover Letter</label>
                <textarea {...register('coverLetter')} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent" placeholder="Tell us why you'd be a great fit..."/>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Resume/CV *</label>
                <div 
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragEnter}
                  onDrop={onDrop}
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${isDragging ? 'border-[#C6A664] bg-[#C6A664]/10' : 'border-gray-300 hover:border-[#C6A664]'}`}
                >
                  <input type="file" id="resume" className="sr-only" accept=".pdf,.doc,.docx" {...register('resume', { required: 'Resume is required' })} onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                  <label htmlFor="resume" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm" style={{ color: '#707070' }}>
                        <span className="font-medium" style={{ color: '#C6A664' }}>Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      {selectedFile && <p className="text-sm text-green-600 mt-2">Selected: {selectedFile.name}</p>}
                    </div>
                  </label>
                </div>
                {errors.resume && !selectedFile && <p className="text-red-500 text-sm mt-1">{errors.resume.message as string}</p>}
              </div>

              <button type="submit" className="w-full flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] disabled:bg-gray-300">
                <Send className="h-5 w-5 mr-2" />
                Submit Application
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default Careers;