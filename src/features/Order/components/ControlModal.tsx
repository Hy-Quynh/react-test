import { Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import foodService from 'services/food';
import { useAppDispatch } from 'store/hooks';
import { createOrderItem, updateOrderItem } from 'store/order/actions';
import orderSelector from 'store/order/selectors';
import { FoodItemType } from 'types/foodType';
import { OrderUpdateType } from 'types/orderType';

type ControlFormType = {
  controlType: 'CREATE' | 'UPDATE';
  initValue?: OrderUpdateType;
  visible: boolean;
  onCancel: () => void;
};

const { Option } = Select;

const ControlForm = ({
  controlType,
  initValue,
  visible,
  onCancel,
}: ControlFormType) => {
  const [foodList, setFoodList] = useState([]);
  const [form] = Form.useForm();
  const loadingForm = orderSelector.getFormLoading();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (controlType === 'UPDATE' && initValue) {
      form.setFieldsValue({
        customer_name: initValue.customer_name,
        customer_email: initValue.customer_email,
        food_ids: initValue?.food_ids,
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const foodRes = await foodService.getListFood();
        if (foodRes?.data) setFoodList(foodRes?.data);
      } catch (error) {
        console.log('get food list error >> ', error);
      }
    })();
  }, []);

  return (
    <Modal
      open={visible}
      title={`${controlType === 'CREATE' ? 'Thêm mới' : 'Cập nhật'} đơn hàng`}
      okText={`${controlType === 'CREATE' ? 'Thêm mới' : 'Cập nhật'}`}
      cancelText='Huỷ'
      onCancel={onCancel}
      maskClosable={false}
      okButtonProps={{ loading: loadingForm }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (controlType === 'CREATE') {
              dispatch(createOrderItem(values));
            } else {
              dispatch(
                updateOrderItem({
                  orderId: initValue?.order_id || '',
                  updatedData: values,
                })
              );
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal'>
        <Form.Item
          name='customer_name'
          label='Tên khách hàng'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập vào tên khách hàng',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='customer_email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập vào email khách hàng',
            },
            {
              type: 'email',
              message: 'Email sai định dạng',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='food_ids'
          label='Món ăn'
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn món ăn',
            },
          ]}
        >
          <Select
            mode='multiple'
            placeholder='Vui lòng chọn món ăn'
            onChange={(value) => {
              console.log('value >> ', value);
            }}
          >
            {foodList?.map((item: FoodItemType) => {
              return (
                <Option key={item?.id}>
                  {item?.name + ' - ' + item?.price + 'đ'}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ControlForm;
