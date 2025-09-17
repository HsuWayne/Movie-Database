import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className='app-layout'>
      <main>{children}</main>
    </div>
  )
}
