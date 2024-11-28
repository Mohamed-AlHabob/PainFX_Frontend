"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { Upload } from "lucide-react"
import BlockTextEditor from "../rich-text-editor"

type PostContentProps = {
  channelid: string
}

export const PostContent = ({ channelid }: PostContentProps) => {


  return (
    <form className="flex flex-col gap-y-5 w-full" >
      <Input
        placeholder="Title"
        className="bg-transparent outline-none border-none text-2xl p-0"
        // {...register("title")}
      />
      {/* <BlockTextEditor
        errors={errors}
        name="jsoncontent"
        min={0}
        max={10000}
        inline
        onEdit
        textContent={onDescription}
        content={onJsonDescription}
        setContent={setJsonDescription}
        setTextContent={setOnDescription}
        htmlContent={onHtmlDescription}
        setHtmlContent={setOnHtmlDescription}
      /> */}
      <Button className="self-end rounded-2xl bg-themeTextGray flex gap-x-2">
        <Upload />
        Create
      </Button>
    </form>
  )
}
