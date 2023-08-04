import React from 'react';
import styled from 'styled-components';
import uiSelector from '../selectors';
import { useAppDispatch } from 'store/hooks';
import actions from '../actions';
import { Spin } from 'antd';

export const useSetLoadingPage = () => {
  const dispatch = useAppDispatch();
  return (result: boolean) => dispatch(actions.setLoadingPage(result));
};

const LoadingPage: React.FC = () => {
  const loading = uiSelector.getLoadingPage();
  if (!loading) return null;

  return (
    <LoadingPageStyled>
      <div className="box">
        <Spin />
      </div>
    </LoadingPageStyled>
  );
};

export default LoadingPage;

const LoadingPageStyled = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content:center;
  z-index: 9999;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 95px 132px;
    gap: 16px;
    background: #FFFFFF;
    border-radius: 6px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #363565;
    }
  }
`;
