import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, Tag, Button, Modal, Form,
    Input, Select, DatePicker, Switch, InputNumber
} from 'antd';
import { addStudent, getstudentById, getStudents, updateStudents, } from '../../redux/action/actStudent';
import { Option } from 'antd/lib/mentions';
import { getDepartments } from '../../redux/action/actDepartment';
const ListStudent = () => {
    const dispatch = useDispatch();
    const studentFromStore = useSelector((state) => state.studentById);
    const listStudentFromStore = useSelector((state) => state.students);
    const listStudent = listStudentFromStore.data
    const listDepartmentFromStore = useSelector((state) => state.departments);
    const listDepartment = listDepartmentFromStore
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getStudents())
        dispatch(getDepartments())

    }, [isNeedRerender, dispatch])
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: text => <strong>{text}</strong>,
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',

        },

        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: tag => {
                if (tag === 'admin') return (<Tag color='red' key={tag}>
                    {(tag + "").toUpperCase()}
                </Tag>)
                else return (<Tag color='green' key={tag}>
                    {(tag + "").toUpperCase()}
                </Tag>)
            }

        }, {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',

        }, {
            title: 'Chi tiết',
            key: 'lastOnline',
            render: obj => {
                return <div> <Button icon={<i className="fas fa-user-circle"></i>} type="primary"
                    onClick={() => showDetailModal(obj)}
                >&nbsp;&nbsp;Chi tiết</Button>

                </div>
            }
        }



    ]

    //Add Modal
    const [isShowAddModal, setisShowAddModal] = useState(false)

    const handleCancelAddModal = () => {

        setisShowAddModal(false)
    };
    const showModalAdd = (supplier) => {
        setisShowAddModal(true)
    };
    const onFormSubmitAddModal = (values) => {

        console.log(values)
        dispatch(addStudent(values))
        .then(()=>{
            setisShowAddModal(false)
            Modal.success({
                content: 'Thêm thành công',
            });
            setisNeedRerender(true)
            setisNeedRerender(false)
        })
        .catch(err =>{
            setisShowAddModal(false)
            Modal.success({
                content: 'Thêm thất bại',
            });
            setisNeedRerender(true)
            setisNeedRerender(false)
        })
    };
    const footerOfAddModal = [
        <Button key="back" onClick={() => handleCancelAddModal()}>

            Thoát
        </Button>,

        <Button form="AddForm" icon={<i className="fas fa-save"></i>}
            type="primary"
            key="submit" htmlType="submit"
        >
            &nbsp;Thêm sản phẩm
        </Button>]

    //show modal

    const [isShowDetailModal, setisShowDetailModal] = useState(false)



    const handleCancel = () => {
        setisShowDetailModal(false)
    };
    // const excuteShowDetail = (obj) =>{
    //     console.log(studentFromStore)
    //     // setselectedStudent(studentFromStore)
    //     setisShowDetailModal(true)
    // }
    const showDetailModal = (obj) => {
        dispatch(getstudentById(obj.username))
            .then(() => {
                setisShowDetailModal(true)

            })


    }

    const footerOfDetailModal = [
        <Button key="back" onClick={() => handleCancel()}>

            Thoát
        </Button>,

        <Button form="detailForm" icon={<i className="fas fa-save"></i>}
            type="primary"
            key="submit" htmlType="submit"
        >
            &nbsp;Lưu thay đổi
        </Button>]
    const onFormSubmit = (obj) => {
        console.log(obj)
        dispatch(updateStudents(obj))
            .then(() => {
                setisShowDetailModal(false)
                Modal.success({
                    content: 'Cập nhật thành công',
                });
                setisNeedRerender(true)
                setisNeedRerender(false)


            })
            .catch(err =>{
                setisShowDetailModal(false)
                Modal.error({
                    content: 'Cập nhật thất bại',
                });
                setisNeedRerender(true)
                setisNeedRerender(false)

            })
    }
    return (
        <div>
            <div className="text-end" ><Button onClick={() => showModalAdd()} type="primary" icon={<i className="fas fa-plus-circle"></i>}> &nbsp;Thêm sinh viên </Button></div>

            <Table style={{ marginTop: '15px' }} rowKey="id" columns={columns} dataSource={listStudent} pagination={false} scroll={{ y: 850 }} />
            {isShowAddModal && <Modal closable={false}
                style={{ top: 20 }}
                title={<strong>Thêm sản phẩm</strong>}
                visible={isShowAddModal}
                footer={footerOfAddModal}
            >
                <div>


                    <Form id="AddForm"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        onFinish={onFormSubmitAddModal}
                    >





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
                        <Form.Item label="Role" name="role"  >
                            <Select name="role" style={{ width: '100%' }}  >
                                {


                                    ['admin', 'student'].map((department, id) => {
                                        return <Option key={id} value={department}>{department}</Option>
                                    })
                                }
                            </Select>
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






                    </Form>
                </div>
            </Modal>}
            {isShowDetailModal && <Modal closable={false}
                style={{ top: 20 }}
                title={<strong>Thông tin sinh viên</strong>}
                visible={isShowDetailModal}
                footer={footerOfDetailModal}
            >
                <div>


                    <Form id="detailForm"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        initialValues={studentFromStore}
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



                    </Form>
                </div>
            </Modal>}
        </div>
    )
}

export default ListStudent
