import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, Tag, Button, Modal, Form,
    Input, Select, DatePicker, Switch, InputNumber
} from 'antd';
import { addProducts, deleteProducts, getProductById, getProducts, getSuppliers, updateProducts } from '../../redux/action/actProduct';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';

const ListProduct = () => {
    const dispatch = useDispatch();

    const listSuppliersFromStore = useSelector((state) => state.suppliers);
    const listProductFromStore = useSelector((state) => state.products);
    const listProduct = listProductFromStore

    // const productFromStore = useSelector((state) => state.productById);
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getProductById(1))
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: text => <strong>{text}</strong>,
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            // width: '15%'
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'discount',
            key: 'discount',
            // width: '20%'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: tag => {
                if (tag === false) return (<Tag color='red' key={tag}>
                    {(tag + "").toUpperCase()}
                </Tag>)
                else return (<Tag color='green' key={tag}>
                    {(tag + "").toUpperCase()}
                </Tag>)
            }
            // width: '20%'
        }, {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // width: '20%'
        }, {
            title: 'Thuế',
            dataIndex: 'tax',
            key: 'tax',
            // width: '20%'
        }, {
            title: 'Nguyên liệu',
            dataIndex: 'material',
            key: 'material',
            // width: '20%'
        }, {
            title: 'Chi tiết',
            key: 'lastOnline',
            render: obj => {
                return <div> <Button icon={<i className="fas fa-user-circle"></i>} type="primary" onClick={() => showModal(obj)} >&nbsp;&nbsp;Chi tiết</Button>

                </div>
            }
        }



    ]

    const dateFormat = 'YYYY-MM-DD ';
    const [checkSelectModal, setcheckSelectModal] = useState(false)
    const [titleOfModal, settitleOfModal] = useState("title")
    const [selectedProduct, setselectedProduct] = useState({})
    const handleCancel = () => {
        setselectedProduct({})
        setcheckSelectModal(false)
    };
    const showModal = (product) => {
        dispatch(getProductById(product.id))
        console.log(product)
        setselectedProduct(product)

        product.createdAt = moment(product.createdAt)
        settitleOfModal("Chi tiết sản phẩm: " + product.name)
        setcheckSelectModal(true)






    };
    const onFormSubmit = (values) => {
        values.createdAt = values.createdAt.format("YYYY-MM-DDTHH:mm:ss")
        dispatch(updateProducts(values))
            .then(res => {
                console.log(values)

                handleCancel()
                setisNeedRerender(true)

            })
            .catch(res => {
                handleCancel()
            })


    };
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

    //Add Product Modal

    const [isShowAddModal, setisShowAddModal] = useState(false)

    const handleCancelAddModal = () => {

        setisShowAddModal(false)
    };
    const showModalAdd = (supplier) => {
        setisShowAddModal(true)
    };
    const onFormSubmitAddModal = (values) => {
        values.createdAt = values.createdAt.format("YYYY-MM-DDTHH:mm:ss")
        dispatch(addProducts(values))
            .then(res => {
                handleCancelAddModal()
            })
            .catch(res => {
                handleCancelAddModal()
            })
        setisNeedRerender(true)

    };
    const onDelete = (product) => {
        dispatch(deleteProducts(product))
        .then(res =>{
            handleCancel()
            setisNeedRerender(true)
        })
        .catch(res=>{
            // handleCancelAddModal()
        })
        console.log(product)
    }
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
    return (
        <div>
            <div className="text-end" ><Button onClick={() => showModalAdd()} type="primary" icon={<i className="fas fa-plus-circle"></i>}> &nbsp;Thêm sản phẩm </Button></div>

            <Table style={{ marginTop: '15px' }} rowKey="id" columns={columns} dataSource={listProduct} pagination={false} scroll={{ y: 850 }} />
            {checkSelectModal && <Modal closable={false}
                style={{ top: 20 }}
                title={titleOfModal}
                visible={checkSelectModal}
                footer={footerOfDetailModal}
            >
                <div>


                    <Form id="detailForm"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        initialValues={selectedProduct}
                        onFinish={onFormSubmit}
                    >


                        <Form.Item label="Mã sản phẩm :" name="id">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Tên sản phẩm:" name="name"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Giá:" name="price"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>

                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Khuyến mãi:" name="discount"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Thuế:" name="tax"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Nguyên liệu:" name="material"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nguồn gốc:" name="origin"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Thông tin:" name="description"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ngày tạo:" name="createdAt"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                        {/* <Form.Item label="Nhà cung cấp" name="supplierId" style={{ display: 'none' }}
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input type="hidden" />
                        </Form.Item> */}
                        <Form.Item name="active" label="Trạng thái"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Switch defaultChecked={selectedProduct.active} />
                        </Form.Item>

                        <Form.Item label="Nhà cung cấp" name="supplierId" rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]} hasFeedback>
                            <Select name="supplierId" style={{ width: '100%' }} >
                                {


                                    listSuppliersFromStore.map((supplier, id) => {
                                        return <Option key={id} value={supplier.id}>{supplier.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>



                    </Form>
                    <Button onClick={() => onDelete(selectedProduct)} type="primary" icon={<i className="fas fa-ban"></i>} danger style={{ width: "100%" }} > &nbsp; Xoá sản phẩm</Button>
                </div>
            </Modal>}


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



                        <Form.Item label="Tên sản phẩm:" name="name"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Giá:" name="price"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>

                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Khuyến mãi:" name="discount"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Thuế:" name="tax"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="Nguyên liệu:" name="material"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nguồn gốc:" name="origin"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Thông tin:" name="description"
                            rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]}
                            hasFeedback>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ngày tạo:" name="createdAt"
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                       
                        <Form.Item name="active" label="Trạng thái"
                        >
                            <Switch defaultChecked={selectedProduct.active} />
                        </Form.Item>

                        <Form.Item label="Nhà cung cấp" name="supplierId" rules={[{ required: true, message: "Thuộc tính này là bắt buộc!" },]} hasFeedback >
                            <Select name="supplierId" style={{ width: '100%' }}  >
                                {


                                    listSuppliersFromStore.map((supplier, id) => {
                                        return <Option key={id} value={supplier.id}>{supplier.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    


                    </Form>
                </div>
            </Modal>}
        </div>
    )
}

export default ListProduct
