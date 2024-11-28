import GlassSheet from "@/components/global/glass-sheet";
import Search from "@/components/global/search";
import SideBar from "@/components/global/sidebar";
import { UserWidget } from "@/components/global/user-widget";
import { Button } from "@/components/ui/button";
import { CheckBadge } from "@/components/icons";
import { Menu } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  groupid: string;
  userid: string;
};

export const Navbar = async ({ groupid, userid }: NavbarProps) => {
  let user;

  try {
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return (
      <div>Error loading user information</div> // Fallback UI on error
    );
  }

  return (
    <div className="py-2 bg-[#cefcc8] dark:bg-[#1A1A1D] px-3 md:px-7 md:py-5 flex gap-5 justify-between md:justify-end items-center">
      <GlassSheet trigger={<Menu className="md:hidden cursor-pointer" aria-label="Open Menu" />}>
        <SideBar mobile />
      </GlassSheet>
      <Search
        searchType="POSTS"
        className="rounded-full !opacity-100 px-3 bg-[#ffffff] dark:bg-themeBlack"
        placeholder="Search..."
      />
      <Link href={`/group/create`} className="hidden md:inline">
        <Button
          variant="outline"
          className="rounded-2xl flex gap-2"
        >
          <CheckBadge />
          Create Group
        </Button>
      </Link>
      <UserWidget />
    </div>
  );
};
