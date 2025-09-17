import type { ReactNode } from 'react'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className='app-layout'>
      <Header />
      <main>{children}</main>
    </div>
  )
}
