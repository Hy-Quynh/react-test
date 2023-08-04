import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch } from 'store/hooks';
import orderSelector from 'store/order/selectors';
import { closeDeleteOrderItem, deleteOrderItem, getListOrder, setDeleteOrderItem } from 'store/order/actions';
import dateTimeHelper from 'helpers/dateTimeHelper';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';
import ControlForm from '../components/ControlModal';
import { OrderUpdateType } from 'types/orderType';

type DataType = {
  customer_name: string;
  customer_email: string;
  food_ids: string[];
  order_id: string;
  createdAt: string;
};

type ControlModalType = {
  visible: boolean;
  initData: OrderUpdateType;
  type: 'CREATE' | 'UPDATE';
};

const FOOD_COLOR = ['magenta', 'red', 'volcano', 'orange'];

const OrderPage: React.FC = () => {
  const [controlModalData, setControlModalData] = useState<ControlModalType>({
    visible: false,
    initData: {},
    type: 'CREATE',
  });
  const listOrder = orderSelector.getListOrder();
  const disabled = orderSelector.getOrderDisable();
  const orderDelete = orderSelector.getOrderDelete();
  const dispatch = useAppDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Email khách hàng',
      dataIndex: 'customer_email',
      key: 'customer_email',
    },
    {
      title: 'Sản phẩm',
      key: 'food_ids',
      dataIndex: 'food_ids',
      render: (food_ids: string[]) => (
        <span>
          {food_ids?.map((food, foodIndex) => {
            return (
              <Tag color={FOOD_COLOR[foodIndex % FOOD_COLOR.length]} key={`food-${foodIndex}`}>
                {food}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Ngày tạo đơn',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record) => <div>{dateTimeHelper.convert(record)}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='small'>
          <Button
            size='small'
            type='primary'
            ghost
            disabled={disabled}
            onClick={() => {
              setControlModalData({
                visible: true,
                initData: record,
                type: 'UPDATE',
              });
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title='Xác nhận xoá'
            description='Bạn có chắc chắn muốn xoá đơn hàng này?'
            okText='Xác nhận'
            cancelText='Huỷ'
            open={orderDelete.orderId === record?.order_id}
            onCancel={() => dispatch(closeDeleteOrderItem())}
            onConfirm={() => {
              handleDeleteOrder(record?.order_id);
            }}
            okButtonProps={{
              loading: orderDelete?.loading
            }}
          >
            <Button
              danger
              size='small'
              disabled={disabled || orderDelete.orderId === record?.order_id}
              onClick={() => {
                if (orderDelete.orderId !== record?.order_id){
                  dispatch(setDeleteOrderItem(record?.order_id));
                }
              }}
            >
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getListOrder());
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
      dispatch(deleteOrderItem(orderId));
  };
  
  return (
    <div className='order-wrapper'>
      <Space className='add-button-space'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          disabled={disabled}
          onClick={() => {
            setControlModalData({
              visible: true,
              initData: {},
              type: 'CREATE',
            });
          }}
        >
          Thêm mới
        </Button>
      </Space>
      <Table
        scroll={{ x: true }}
        columns={columns}
        pagination={false}
        dataSource={listOrder}
      />
      {controlModalData?.visible ? (
        <ControlForm
          visible={controlModalData?.visible}
          controlType={controlModalData?.type}
          onCancel={() => {
            setControlModalData({
              visible: false,
              initData: {},
              type: 'CREATE',
            });
          }}
          initValue={controlModalData?.initData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderPage;
