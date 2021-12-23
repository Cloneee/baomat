import React from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, NotificationOutlined, CommentOutlined, ControlOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";

const LeftSlider = ({layoutSelectedIndex,onSelectedLayoutIndexChange}) => {
  const { Sider } = Layout
  const { SubMenu } = Menu
  const authentication = useSelector((state) => state.authentication);

  // const [layoutSelectedKey, setlayoutSelectedKey] = useState(layoutSelectedIndex)
  const listIconOfSubMenu =[ <UserOutlined/>,<CommentOutlined />,<NotificationOutlined />,<ControlOutlined />]
  let subMenu = [{ key: "product", title: 'Sinh viên', items: [{ key: 1, content: 'Thông tin cá nhân' },{ key: 2, content: 'Danh sách sinh viên' }] },
  { key: "supplier", title: 'Khoa', items: [{ key: 3, content: 'Danh sách khoa' }] },
]
  // if(authentication.user.role !=='admin') subMenu = [{ key: "product", title: 'Sinh viên', items: [{ key: 1, content: 'Thông tin cá nhân' }] },
  
// ]
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
