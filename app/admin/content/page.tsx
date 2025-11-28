'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileEdit, HelpCircle, BookOpen, Plus } from 'lucide-react'

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Content Management</h1>
        <p className="text-[#6B7280] mt-1">Manage articles, FAQs, and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Articles */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#E0E7FF] rounded-lg">
                <FileEdit className="w-6 h-6 text-[#1B6FA0]" />
              </div>
              <h2 className="text-xl font-semibold text-[#1F2937]">Articles</h2>
            </div>
          </div>
          <p className="text-[#6B7280] mb-4">Manage blog posts and articles</p>
          <div className="flex gap-2">
            <Link
              href="/admin/content/articles"
              className="flex-1 px-4 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors text-center"
            >
              View All
            </Link>
            <Link
              href="/admin/content/articles/new"
              className="px-4 py-2 border border-[#D1D5DB] rounded-lg hover:bg-[#F5F7FA] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FEF3C7] rounded-lg">
                <HelpCircle className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h2 className="text-xl font-semibold text-[#1F2937]">FAQs</h2>
            </div>
          </div>
          <p className="text-[#6B7280] mb-4">Manage frequently asked questions</p>
          <div className="flex gap-2">
            <Link
              href="/admin/content/faqs"
              className="flex-1 px-4 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors text-center"
            >
              View All
            </Link>
            <Link
              href="/admin/content/faqs/new"
              className="px-4 py-2 border border-[#D1D5DB] rounded-lg hover:bg-[#F5F7FA] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#DCFCE7] rounded-lg">
                <BookOpen className="w-6 h-6 text-[#00A86B]" />
              </div>
              <h2 className="text-xl font-semibold text-[#1F2937]">Resources</h2>
            </div>
          </div>
          <p className="text-[#6B7280] mb-4">Manage eye health resources</p>
          <div className="flex gap-2">
            <Link
              href="/admin/content/resources"
              className="flex-1 px-4 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors text-center"
            >
              View All
            </Link>
            <Link
              href="/admin/content/resources/new"
              className="px-4 py-2 border border-[#D1D5DB] rounded-lg hover:bg-[#F5F7FA] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

