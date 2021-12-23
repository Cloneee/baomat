import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';import {
    Table, Tag, Button, Modal, Form,
    Input, Select, DatePicker, Switch, InputNumber
} from 'antd';
import { getStudents } from '../../redux/action/actStudent';
const ListStudent = () => {
    const dispatch = useDispatch();

    const listStudentFromStore = useSelector((state) => state.students);
    const listStudent = listStudentFromStore
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getStudents())
        // dispatch(getProductById(1))
        // dispatch(getSuppliers())
        setisNeedRerender(false)

    }, [isNeedRerender])
    return (
        <div>
            
        </div>
    )
}

export default ListStudent
