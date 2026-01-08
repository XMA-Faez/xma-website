'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { PlayCircle, Image as ImageIcon } from 'phosphor-react'
import { ScanningButton } from '@/components/ui/ScanningButton'
import PortfolioGallery from './_components/PortfolioGallery'
import PortfolioModal from './_components/PortfolioModal'
import type { CloudinaryVideo, CloudinaryGraphic } from '@/sanity/lib/types'
import { usePortfolioItems } from './_hooks/usePortfolio'

type PortfolioItem = CloudinaryVideo | CloudinaryGraphic
type TabType = 'videos' | 'graphics';
type FilterType = 'all' | 'web-design' | 'branding' | 'social-media' | 'motion' | 'ui-ux';

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('videos');
  // const [activeFilter, setActiveFilter] = useState<FilterType>('all'); // COMMENTED OUT
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Use React Query hooks for data fetching
  const { items: allPortfolioItems, isLoading, error } = usePortfolioItems();

  // Filter items based on active tab only (no "all" option)
  const filteredItems = useMemo(() => {
    let items = allPortfolioItems;
    
    // Filter by tab - always filter since there's no "all" option
    if (activeTab === 'videos') {
      items = items.filter(item => item.type === 'video');
    } else if (activeTab === 'graphics') {
      items = items.filter(item => item.type === 'graphic');
    }
    
    // Filter by category - COMMENTED OUT
    // if (activeFilter !== 'all') {
    //   items = items.filter(item => item.category === activeFilter);
    // }
    
    return items;
  }, [allPortfolioItems, activeTab]);

  // Tab options - Only Videos and Graphics
  const tabs: { value: TabType; label: string; icon: React.ReactNode }[] = [
    { value: 'videos', label: 'Videos', icon: <PlayCircle weight="duotone" /> },
    { value: 'graphics', label: 'Graphics', icon: <ImageIcon weight="duotone" /> }
  ];

  // Filter options - COMMENTED OUT
  /*
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'branding', label: 'Branding' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'motion', label: 'Motion Graphics' },
    { value: 'ui-ux', label: 'UI/UX Design' }
  ];
  */

  // Handle item selection
  const handleItemSelect = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  // Handle modal navigation
  const handleModalNavigate = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  // Close modal
  const handleModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-black">
      {/* Background gradients */}
      <div 
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%), rgb(248, 250, 252)"
        }}
      />
      <div 
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.25), transparent 70%), #000000"
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto mb-8">
              Explore our collection of innovative designs, compelling videos, and creative solutions that drive results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs and Filters */}
      <section className="relative px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 dark:bg-zinc-900 rounded-full p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                    ${activeTab === tab.value 
                      ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-lg' 
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters - COMMENTED OUT */}
          {/* 
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`
                  px-4 py-2 rounded-full transition-all duration-300
                  ${activeFilter === filter.value
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-blue-500/50'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
          */}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-16">
              <div className="text-slate-400 dark:text-zinc-600 mb-4">
                <ImageIcon size={64} weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-zinc-400 mb-2">
                Unable to load portfolio
              </h3>
              <p className="text-slate-500 dark:text-zinc-500 mb-6">
                {error?.message || 'Failed to load portfolio data. Please try again later.'}
              </p>
              <ScanningButton 
                onClick={() => window.location.reload()} 
                variant="secondary"
              >
                Try Again
              </ScanningButton>
            </div>
          ) : (
            <PortfolioGallery
              items={filteredItems}
              onItemSelect={handleItemSelect}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>

      {/* Modal */}
      <PortfolioModal
        item={selectedItem}
        items={filteredItems}
        onClose={handleModalClose}
        onNavigate={handleModalNavigate}
      />

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-primary rounded-2xl p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-slate-600 dark:text-zinc-300 mb-8">
              Let's collaborate on your next project and bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScanningButton size="lg">
                Start Your Project
              </ScanningButton>
              <ScanningButton size="lg" variant="secondary">
                Schedule Consultation
              </ScanningButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
