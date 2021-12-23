import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, Tag, Button, Modal, Form,
    Input, Select, DatePicker, Switch, InputNumber
} from 'antd';
import { addProducts, deleteProducts, getProductById, getProducts, getSuppliers, updateProducts } from '../../redux/action/actProduct';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';
import { getstudentById } from '../../redux/action/actStudent';
const Profile = () => {
    const dispatch = useDispatch();

    const profileFromStore = useSelector(state => state.authentication)
    const student = profileFromStore.user
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getstudentById())
      
        setisNeedRerender(false)

    }, [isNeedRerender, dispatch])
   
    return (
        <div className='row'>
            <div className='col-10' style={{marginTop:"50px"}}>

                <h4 className='text-center'><strong > THÔNG TIN CÁ NHÂN: </strong></h4>
                <Form id="detailForm"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    initialValues={student}
                    // onFinish={onFormSubmit}
                >


                    <Form.Item label="ID :" name="_id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Họ và tên:" name="name"
                        rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                        hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tài khoản" name="username"
                        rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                        hasFeedback>

                        <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role"
                        rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                        hasFeedback>

                        <Input disabled />
                    </Form.Item>
                    {/* <Form.Item label="Nhà cung cấp" name="supplierId" rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]} hasFeedback >
                            <Select name="supplierId" style={{ width: '100%' }}  >
                                {


                                    listSuppliersFromStore.map((supplier, id) => {
                                        return <Option key={id} value={supplier.id}>{supplier.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item> */}

                  



                </Form>
            </div>
        </div>
    )
}

export default Profile
