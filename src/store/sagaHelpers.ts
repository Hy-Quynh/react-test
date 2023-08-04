import { message } from 'antd';
import { ArgsProps } from 'antd/es/message/interface';
import { call } from 'redux-saga/effects';

export function* displayToast({type, content}: ArgsProps) {
  yield call(message.open, {
    type,
    content
  });
}
