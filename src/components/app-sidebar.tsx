import { LayoutDashboard, Bug, ShieldCheck, Settings, History, FileText, Landmark } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Update item type to include an ID for state management
export type NavItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  url?: string;
}

// Define navigation menus
const topItems: NavItem[] = [
  { id: "dashboard", title: "任务概览", icon: LayoutDashboard },
  { id: "declarations", title: "报关单管理", icon: FileText },
  { id: "customs-tax", title: "海关税费单", icon: Landmark },
  { id: "crawlers", title: "活跃爬虫", icon: Bug },
  { id: "proxies", title: "代理池", icon: ShieldCheck },
];

const bottomItems: NavItem[] = [
    { id: "logs", title: "执行日志", icon: History },
    { id: "settings", title: "系统设置", icon: Settings },
];


interface AppSidebarProps {
  activePage: string;
  setActivePage: (pageId: string) => void;
}

export function AppSidebar({ activePage, setActivePage }: AppSidebarProps) {
  const renderMenuItems = (items: NavItem[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.id} current={activePage === item.id}>
        <SidebarMenuButton onClick={() => setActivePage(item.id)} asChild>
          <button>
            <item.icon />
            <span>{item.title}</span>
          </button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">Crawler Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {renderMenuItems(topItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenuItems(bottomItems)}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
