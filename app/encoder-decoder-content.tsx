"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { decode, encode } from "./encoding"
import { EmojiSelector } from "@/components/emoji-selector"
import { SLANG_LIST, EMOJI_LIST } from "./emoji"

export function Base64EncoderDecoderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read mode from URL parameters, other state stored locally
  const mode = searchParams.get("mode") || "encode"
  const [inputText, setInputText] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [outputText, setOutputText] = useState("")
  const [errorText, setErrorText] = useState("")

  // Update URL when mode changes
  const updateMode = (newMode: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("mode", newMode)
    router.replace(`?${params.toString()}`)
  }

  // Convert input whenever it changes
  useEffect(() => {
    try {
      const isEncoding = mode === "encode"
      const output = isEncoding ? encode(selectedEmoji, inputText) : decode(inputText)
      setOutputText(output)
      setErrorText("")
    } catch (e) {
      setOutputText("")
      setErrorText(`Error ${mode === "encode" ? "encoding" : "decoding"}: Invalid input`)
    }
  }, [mode, selectedEmoji, inputText])

  const handleModeToggle = (checked: boolean) => {
    updateMode(checked ? "encode" : "decode")
    setInputText("") // Clear input text when mode changes
  }

  // Handle initial URL state
  useEffect(() => {
    if (!searchParams.has("mode")) {
      updateMode("encode")
    }
  }, [searchParams, updateMode])

  const isEncoding = mode === "encode"

  return (
    <CardContent className="space-y-6 pt-6 font-mono text-sm">
      <p className="text-green-600 border-l-2 border-green-800 pl-2">
        // SYSTEM_MSG: Encode hidden message into unicode variation selectors.
        <br/>
        // Copy/paste output to decode.
      </p>

      <div className="flex items-center justify-center space-x-4 border border-green-900 p-2 bg-black">
        <Label htmlFor="mode-toggle" className={`uppercase ${!isEncoding ? "text-green-400 font-bold" : "text-green-800"}`}>
          Decode
        </Label>
        <Switch
          id="mode-toggle"
          checked={isEncoding}
          onCheckedChange={handleModeToggle}
          className="data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-green-900 border border-green-500 rounded-none"
        />
        <Label htmlFor="mode-toggle" className={`uppercase ${isEncoding ? "text-green-400 font-bold" : "text-green-800"}`}>
          Encode
        </Label>
      </div>

      <div className="space-y-1">
        <Label className="text-xs uppercase tracking-widest text-green-700">Input_Stream:</Label>
        <Textarea
          placeholder={isEncoding ? "> Enter text to encode..." : "> Paste carrier text to decode..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[100px] bg-black border-2 border-green-800 text-green-400 placeholder:text-green-900 focus-visible:ring-0 focus-visible:border-green-400 rounded-none resize-none font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-green-700">Select_Carrier_Emoji:</div>
        <EmojiSelector
          onEmojiSelect={setSelectedEmoji}
          selectedEmoji={selectedEmoji}
          emojiList={EMOJI_LIST}
          disabled={!isEncoding}
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-green-700">Or_Select_Slang_Term:</div>
        <EmojiSelector
          onEmojiSelect={setSelectedEmoji}
          selectedEmoji={selectedEmoji}
          emojiList={SLANG_LIST}
          disabled={!isEncoding}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs uppercase tracking-widest text-green-700">Output_Stream:</Label>
        <Textarea
          placeholder={isEncoding ? "> Waiting for input..." : "> Waiting for input..."}
          value={outputText}
          readOnly
          className="min-h-[100px] bg-black border-2 border-green-800 text-green-400 placeholder:text-green-900 focus-visible:ring-0 focus-visible:border-green-400 rounded-none resize-none font-mono"
        />
      </div>

      {errorText && <div className="text-red-500 bg-red-950/20 border border-red-900 p-2 text-center uppercase animate-pulse">{errorText}</div>}
    </CardContent>
  )
}
