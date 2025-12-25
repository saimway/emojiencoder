import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Base64EncoderDecoderContent } from "./encoder-decoder-content"

export default function EncoderDecoder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Hide a message in an emoji</CardTitle>
        </CardHeader>
        <Suspense fallback={<CardContent>Loading...</CardContent>}>
          <Base64EncoderDecoderContent />
        </Suspense>
        <div className="text-center my-4">
          <span className="text-sm text-white/50 font-medium">Build by saim</span>
        </div>
      </Card>
    </div>
  )
}
