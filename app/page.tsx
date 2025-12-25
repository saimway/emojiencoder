import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Base64EncoderDecoderContent } from "./encoder-decoder-content"

export default function EncoderDecoder() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      <Card className="w-full max-w-md bg-black border-2 border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] rounded-none">
        <CardHeader className="border-b border-green-500/50">
          <CardTitle className="text-xl font-bold text-center tracking-widest uppercase">
            &gt; TextEncoder <span className="animate-pulse">_</span>
          </CardTitle>
        </CardHeader>
        <Suspense fallback={<CardContent>Initializing...</CardContent>}>
          <Base64EncoderDecoderContent />
        </Suspense>
        <div className="text-center my-4 border-t border-green-500/50 pt-2">
          <span className="text-xs text-green-700 font-bold uppercase">Build by saim</span>
        </div>
      </Card>
    </div>
  )
}
