import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, Tag, Button, Modal, Form,
    Input, Select, DatePicker, Switch, InputNumber
} from 'antd';
import { Option } from 'antd/lib/mentions';
import { getstudentById, updateStudents } from '../../redux/action/actStudent';
const Profile = () => {
    const dispatch = useDispatch();
    const listDepartmentFromStore = useSelector((state) => state.departments);
    const listDepartment = listDepartmentFromStore
    
    const profile = useSelector(state => state.profile)
    const student = profile
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {


    }, [isNeedRerender, dispatch])
    const onFormSubmit = (obj) =>{
        dispatch(updateStudents(obj))
        .then(() =>{
            
            Modal.success({
                content: 'Cập nhật thành công',
              });
            setisNeedRerender(true)
            setisNeedRerender(false)

        })
    }
    return (
        <div className='row'>
            <div className='col-10' style={{ marginTop: "50px" }}>

                <h4 className='text-center'><strong > THÔNG TIN CÁ NHÂN: </strong></h4>
                <Form id="detailForm"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    initialValues={student}
                onFinish={onFormSubmit}
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

                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Role" name="role"
                        rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                        hasFeedback>

                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="MSSV" name="mssv"
                    >

                        <Input />
                    </Form.Item>
                    <Form.Item label="Lớp" name="class"
                    >

                        <Input />
                    </Form.Item>
                    <Form.Item label="Khoa" name="department"  >
                        <Select name="department" style={{ width: '100%' }}  >
                            {


                                listDepartment.map((department, id) => {
                                    return <Option key={id} value={department._id}>{department.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description"
                    >

                        <Input.TextArea />

                    </Form.Item>

                    
                    <div className='text-center'>
                        <Button type='primary' htmlType="submit">Lưu</Button>
                    </div>


                </Form>
            </div>
        </div>
    )
}

export default Profile
