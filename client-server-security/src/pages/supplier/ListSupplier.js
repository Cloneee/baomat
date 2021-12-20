import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table,  Button, Modal, Form,
    Input
} from 'antd';
import { addSuppliers, deleteSupplierById, getSuppliers, updateSuppliers } from '../../redux/action/actProduct';

const ListSupplier = () => {
    const dispatch = useDispatch();
    const listSuppliersFromStore = useSelector((state) => state.suppliers);
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getSuppliers())
        setisNeedRerender(false)
    }, [isNeedRerender])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name',
            render: text => <strong>{text}</strong>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // width: '15%'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            // width: '20%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',

            // width: '20%'
        },
        {
            title: 'Chi tiết',
            key: 'lastOnline',
            render: obj => {
                return <div> <Button icon={<i className="fas fa-user-circle"></i>} type="primary" onClick={() => showModal(obj)} >&nbsp;&nbsp;Chi tiết</Button>

                </div>
            }
        }




    ]
    const [selectedSupplier, setselectedSupplier] = useState({})
    const [checkSelectModal, setcheckSelectModal] = useState(false)
    const [titleOfModal, settitleOfModal] = useState("title")

    const handleCancel = () => {
        setselectedSupplier({})
        setcheckSelectModal(false)
    };
    const showModal = (supplier) => {
        setselectedSupplier(supplier)
        settitleOfModal("Chi tiết nhà cung cấp: " + supplier.name)
        setcheckSelectModal(true)

    };
    const onFormSubmit = (values) => {
        dispatch(updateSuppliers(values))
        .then(res =>{
            
            handleCancel()
            setisNeedRerender(true)
        })
        console.log(values)

    };
    const onDelete = (supplierId) =>{
        dispatch(deleteSupplierById(supplierId))
        .then(res =>{
            handleCancel()
            setisNeedRerender(true)
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

    //Add Supplier Modal

    const [isShowAddModal, setisShowAddModal] = useState(false)

    const handleCancelAddModal = () => {
        setisShowAddModal(false)
    };
    const showModalAdd = (supplier) => {
        setisShowAddModal(true)
    };
    const onFormSubmitAddModal = (values) => {
        dispatch(addSuppliers(values))
        .then(res =>{
            handleCancelAddModal()
            setisNeedRerender(true)
        })
        .catch(res =>{

        })
        console.log(values)

    };
    const footerOfAddModal = [
        <Button key="back" onClick={() => handleCancelAddModal()}>

            Thoát
        </Button>,

        <Button form="AddForm" icon={<i className="fas fa-save"></i>}
            type="primary"
            key="submit" htmlType="submit"
        >
            &nbsp;Thêm nhà cung cấp
        </Button>]


    return (
        <div >
            <div className="text-end" ><Button onClick={() => showModalAdd()} type="primary" icon={<i className="fas fa-plus-circle"></i>}> &nbsp;Thêm nhà cung cấp</Button></div>
            <Table style={{ marginTop: '15px' }} rowKey="id" columns={columns} dataSource={listSuppliersFromStore} pagination={false} scroll={{ y: 850 }} />
            {checkSelectModal && <Modal closable={false}
                style={{ top: 20 }}
                title={titleOfModal}
                visible={checkSelectModal}
                footer={footerOfDetailModal}
            >
                <div>


                    <Form id="detailForm"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        initialValues={selectedSupplier}
                        onFinish={onFormSubmit}
                    >



                        <Form.Item label="Mã nhà cung cấp :" name="id"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Tên :" name="name"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email:" name="email"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ: " name="address"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại:" name="phone"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>




                    </Form>
                    <Button onClick={()=> onDelete(selectedSupplier.id)} type="primary" icon={<i className="fas fa-ban"></i>} danger style={{ width: "100%" }} > &nbsp; Xoá nhà cung cấp</Button>
                </div>
            </Modal>}


            {isShowAddModal && <Modal closable={false}
                style={{ top: 20 }}
                title={<strong>Thêm nhà cung cấp</strong>}
                visible={isShowAddModal}
                footer={footerOfAddModal}
            >
                <div>


                    <Form id="AddForm"
                        labelCol={{ span: 7  }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        onFinish={onFormSubmitAddModal}
                    >



                       
                        <Form.Item label="Tên :" name="name"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email:" name="email"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ: " name="address"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại:" name="phone"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>



                    </Form>
                </div>
            </Modal>}
        </div>
    )
}

export default ListSupplier
