import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'; import {
    Table, Tag, Button
} from 'antd';
import { getStudents } from '../../redux/action/actStudent';
const ListStudent = () => {
    const dispatch = useDispatch();

    const listStudentFromStore = useSelector((state) => state.students);
    const listStudent = listStudentFromStore.data
    const [isNeedRerender, setisNeedRerender] = useState(false)
    useEffect(() => {
        dispatch(getStudents())
      
        setisNeedRerender(false)

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
            // width: '15%'
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
            // width: '20%'
        }, {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',
            // width: '20%'
        }, {
            title: 'Chi tiết',
            key: 'lastOnline',
            render: obj => {
                return <div> <Button icon={<i className="fas fa-user-circle"></i>} type="primary"
                // onClick={() => showModal(obj)}
                >&nbsp;&nbsp;Chi tiết</Button>

                </div>
            }
        }



    ]
    return (
        <div>
            <Table style={{ marginTop: '15px' }} rowKey="id" columns={columns} dataSource={listStudent} pagination={false} scroll={{ y: 850 }} />

        </div>
    )
}

export default ListStudent
