import type { ReactNode } from 'react'
import { Layout } from 'antd'
import { Sider } from './Sider'

interface Props {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  const { Content } = Layout
  return (
    <Layout className='app-layout'>
      <Sider />
      <Content className='main-layout'>{children}</Content>
    </Layout>
  )
}
