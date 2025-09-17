import { Link, useLocation } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer, Button } from 'antd'
import { useState } from 'react'

export function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const menuItems = [
    { key: '/', label: '首頁' },
    { key: '/WatchList', label: '待看清單' }
  ]

  return (
    <header className='header'>
      <Link to='/' className='title'>
        Movie Database
      </Link>
      {/* Desktop Menu */}
      <nav className='nav'>
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.key}
            className={`nav-item ${
              location.pathname === item.key ? 'active' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        type='text'
        icon={<MenuOutlined />}
        className='mobile-menu-btn'
        onClick={() => setOpen(true)}
      />
      <Drawer
        title='選單'
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
      >
        <nav className='drawer-nav'>
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={`drawer-nav-item ${
                location.pathname === item.key ? 'active' : ''
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
  )
}
