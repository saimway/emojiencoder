"use client"

import { Button } from "@/components/ui/button"

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void
  disabled: boolean
  selectedEmoji: string
  emojiList: string[]
}

export function EmojiSelector({ onEmojiSelect, disabled, selectedEmoji, emojiList }: EmojiSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {emojiList.map((emoji) => (
        <Button
          key={emoji}
          variant="outline"
          className={`h-8 px-2 py-0 text-xs rounded-none border border-green-800 bg-black text-green-500 hover:bg-green-900 hover:text-green-300 transition-colors duration-0
            ${emoji === selectedEmoji ? "bg-green-700 text-black border-green-500 font-bold" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => onEmojiSelect(emoji)}
          disabled={disabled}
        >
          {emoji}
        </Button>
      ))}
    </div>
  )
}
