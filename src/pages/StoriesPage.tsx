import React from 'react';
import { FamilyStories } from '../components/FamilyStories';
import { ArrowLeft, Users } from 'lucide-react';

interface StoriesPageProps {
  onBackToHome: () => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onBackToHome }) => {
  return (
    <div className="pb-16 space-y-6">
      {/* Page Header Ribbon */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DA] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-[#0F3A5D] hover:underline flex items-center gap-1.5 self-start cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <Users className="w-3.5 h-3.5 text-[#0F3A5D]" />
              <span>Verified field chronicles from Sindh, Balochistan & Punjab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Family Stories Component */}
      <FamilyStories />
    </div>
  );
};
