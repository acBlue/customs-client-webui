import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DeclarationsPage } from "@/components/declarations-page"
import { CustomsTaxPage } from "@/components/customs-tax-page"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"

// A simple component to render based on page ID
function PageContent({ page }: { page: string }) {
  switch (page) {
    case "declarations":
      return <DeclarationsPage />
    case "customs-tax":
      return <CustomsTaxPage />
    default:
      return <div className="p-8 text-center">Select a page from the sidebar.</div>
  }
}

export default function App() {
  const [activePage, setActivePage] = useState("declarations");

  return (
    <SidebarProvider>
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs font-medium text-muted-foreground">Crawler v1.0.4</span>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="搜索..."
              className="w-full bg-muted/50 border-none rounded-md py-1 pl-8 text-xs focus:ring-1 focus:ring-ring outline-none"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-transparent">
          <PageContent page={activePage} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
