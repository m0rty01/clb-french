'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Facebook Messenger link
const MESSENGER_LINK = 'https://m.me/ravijha01'

export function FloatingSupportButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 max-w-xs animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm">Need Help?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Chat with us on Messenger for quick support!
              </p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Floating Button */}
      <Button
        onClick={() => window.open(MESSENGER_LINK, '_blank')}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="h-14 w-14 rounded-full shadow-lg bg-[#0084FF] hover:bg-[#0073E6] text-white p-0"
        aria-label="Contact Support on Messenger"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
