import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

export function Sider() {
  const location = useLocation()
  const { Sider } = Layout

  const menuItems = [
    { key: '/', label: '首頁' },
    { key: '/WatchList', label: '待看清單' }
  ]

  const items = menuItems.map((item) => ({
    key: item.key,
    label: (
      <Link to={item.key} className='menu-items'>
        {item.label}
      </Link>
    )
  }))

  return (
    <Sider className='sider' breakpoint='md' collapsedWidth='0'>
      <div className='title'>Movie DB</div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  )
}
