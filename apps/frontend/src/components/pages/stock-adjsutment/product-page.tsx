'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import ProductList from './product-list';

export default function ProductAdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar selectedItemMenu="Stock Adjustment" />
      <main>
        <SidebarTrigger />
        <ProductList />
      </main>
    </SidebarProvider>
  )
}