"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    id?: string;
    items?: {
      title: string;
      url: string;
      id?: string;
    }[];
  }[];
}) {
  const location = useLocation();

  const { pathname } = location;
  console.log("pathname ==> ", pathname);
  const mainMenu = pathname?.split("/")[1];
  const subMenu = pathname?.split("/")[2];

  return (
    <SidebarGroup>
      <SidebarMenu className="p-[8px]">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "h-[30px]",
                    item?.id === mainMenu ? "bg-sidebar-accent" : "bg-white"
                  )}
                >
                  {/* {item.icon && <item.icon />} */}
                  {item.icon && (
                    <img
                      src={item.icon}
                      className="w-[20px] h-[20px]"
                      alt="icon"
                    />
                  )}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className="mt-[8px]"
                    >
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          "group/item px-[12px]",
                          subItem?.id === subMenu
                            ? "bg-primary text-white"
                            : "bg-white text-[#374257]"
                        )}
                      >
                        <a
                          href={subItem.url}
                          className="flex items-center gap-[14px]"
                        >
                          <div
                            className={cn(
                              "w-[8px] h-[8px] rounded-full group-hover/item:bg-white",
                              subItem?.id === subMenu
                                ? "bg-white"
                                : "bg-[#6B7280]"
                            )}
                          ></div>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
