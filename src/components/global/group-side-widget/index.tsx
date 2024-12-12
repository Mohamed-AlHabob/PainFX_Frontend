"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Image from "next/image"

const GroupSideWidget = () => {

  return (
    <Card
      className={cn(
        "border-themeGray lg:sticky lg:top-0 mt-10 lg:mt-0 rounded-xl overflow-hidden",
      )}
    >
      <img
        src={'https://brave.com/static-assets/images/optimized/blog/photo-scholarship/images/student-ntp-sam-richter.webp'}
        alt="thumbnail"
        className="w-full aspect-video"
      />
      <div className="flex flex-col p-5 gap-y-2">
        <h2 className="font-bold text-lg">Test</h2>
        <p className="text-sm text-themeTextGray">
          group.description && truncateStringgroup.description
        </p>
      </div>
      <Separator orientation="horizontal" className="bg-themeGray" />
        {/* <Button /> */}
    </Card>
  )
}

export default GroupSideWidget
