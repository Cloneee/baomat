import React from 'react'
import { Layout} from 'antd';
import ListProduct from '../../pages/product/ListProduct';
import ListSupplier from '../../pages/supplier/ListSupplier';
import ListStudent from '../../pages/student/ListStudent';


const MainLayout = ({layoutSelectedIndex}) => {

    const { Content } = Layout
    const layoutList = [<ListStudent/>,<ListSupplier/>]
    return (
        <Layout style={{ padding: '0px 10px 10px' }}>
            <Content
              className="site-layout-background"
             
            >
              <div style={{minHeight: '600px',backgroundColor:'white'}} className="">
                  {layoutList[layoutSelectedIndex]}
              </div>
            </Content>
          </Layout>
    )
}

export default MainLayout
