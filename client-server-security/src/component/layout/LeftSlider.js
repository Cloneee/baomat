import React from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, NotificationOutlined, CommentOutlined, ControlOutlined } from '@ant-design/icons'

const LeftSlider = ({layoutSelectedIndex,onSelectedLayoutIndexChange}) => {
  const { Sider } = Layout
  const { SubMenu } = Menu
  // const [layoutSelectedKey, setlayoutSelectedKey] = useState(layoutSelectedIndex)
  const listIconOfSubMenu =[ <UserOutlined/>,<CommentOutlined />,<NotificationOutlined />,<ControlOutlined />]
  const subMenu = [{ key: "product", title: 'Sản phẩm', items: [{ key: 1, content: 'Danh sách sản phẩm' }] },
  { key: "supplier", title: 'Nhà cung cấp', items: [{ key: 2, content: 'Danh sách nhà cung cấp' }] },

]
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['product']}
        style={{ height: '100%', borderRight: 0 }}
      >
       
        {
          subMenu.map((sub, index) => {
            return (
              <SubMenu key={sub.key} icon={listIconOfSubMenu[index]} title={sub.title}>
                {
                  sub.items.map((item, id) => {
                    return (
                      <Menu.Item key={item.key} onClick={()=>onSelectedLayoutIndexChange(item.key-1)}>{item.content}</Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    </Sider>
  )
}

export default LeftSlider
