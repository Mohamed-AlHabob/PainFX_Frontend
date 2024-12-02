import {
  AffiliateDuoToneBlack,
  Buisness,
  Chat,
  Courses,
  CreditCard,
  Document,
  Explore,
  GlobeDuoToneBlack,
  Home,
  IDuotoneBlack,
  PersonalDevelopment,
  ZapDouToneBlack,
} from "@/components/icons"
import { Monitor, Moon, Sun } from "lucide-react"

export type MenuProps = {
  id: string
  label: string
  icon: JSX.Element
  path: string
  section?: boolean
  integration?: boolean
}

export type GroupMenuProps = {
  id: number
  label: string
  icon: JSX.Element
  path: string
}

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: "1",
    label: "Posts",
    icon: <Home />,
    path: "/X",
    section: true,
  },
  {
    id: "2",
    label: "Doctors",
    icon: <CreditCard />,
    path: "/X/doctors",
    section: true,
  },
  {
    id: "3",
    label: "Health centers",
    icon: <Explore />,
    path: "/X/health-centers",
  },
  {
    id: "4",
    label: "Reels",
    icon: <Explore />,
    path: "/X/reel/1",
  },
]


export const SIDEBAR_SETTINGS_MENU: MenuProps[] = [
  {
    id: "0",
    label: "General",
    icon: <IDuotoneBlack />,
    path: "",
  },
  {
    id: "1",
    label: "Storage",
    icon: <CreditCard />,
    path: "storage",
  },
  {
    id: "2",
    label: "Subscriptions",
    icon: <CreditCard />,
    path: "subscriptions",
  },
  {
    id: "3",
    label: "appointment",
    icon: <AffiliateDuoToneBlack />,
    path: "appointment",
  },
  {
    id: "4",
    label: "API",
    icon: <GlobeDuoToneBlack />,
    path: "apikey",
  },
  {
    id: "5",
    label: "Usage",
    icon: <ZapDouToneBlack />,
    path: "usage",
  },
]


export const MODE_TOGGLE_MENU: MenuProps[] = [
  {
    id: "0",
    label: "Light",
    icon: <Sun />,
    path: "",
  },
  {
    id: "1",
    label: "Dark",
    icon: <Moon/>,
    path: "storage",
  },
  {
    id: "2",
    label: "System",
    icon: <Monitor/>,
    path: "",
  },
]
type IntegrationsListItemProps = {
  id: string
  name: "stripe"
  logo: string
  description: string
  title: string
  modalDescription: string
}

export const REQUESTS_TABLE_HEADER = [
  'client',
  'date',
  'status',
  'action',
]

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: "1",
    name: "stripe",
    description:
      "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
    logo: "914be637-39bf-47e6-bb81-37b553163945",
    title: "Connect Stripe Account",
    modalDescription:
      "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
  },
]
