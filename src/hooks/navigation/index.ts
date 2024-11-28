import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useNavigation = () => {
  const pathName = usePathname()
  const [section, setSection] = useState<string>(pathName)
  const onSetSection = (page: string) => setSection(page)
  return {
    section,
    onSetSection,
  }
}

export const useSideBar = (groupid: string) => {

  const { isPending, mutate, isError, variables } = useMutation({
    mutationFn: (data: {
      id: string
      name: string
      icon: string
      createdAt: Date
      groupId: string | null
    }) =>
      onCreateNewChannel(groupid, {
        id: data.id,
        name: data.name.toLowerCase(),
        icon: data.icon,
      }),
    onSettled: async () => {},})

  if (isPending)
    toast("Success", {
      description: "created",
    })

  if (isError)
    toast("Error", {
      description: "Oops! something went wrong",
    })

  return {  mutate, variables, isPending }
}
function onCreateNewChannel(groupid: string, arg1: { id: string; name: string; icon: string }): Promise<unknown> {
  throw new Error("Function not implemented.")
}

