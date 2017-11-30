import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../config/style-util';
import WithDirection from '../../config/withDirection';

const WDCustomersWrapper = styled.div`
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
 

  
  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
    flex-direction: column;
    height: auto;
  }

  @media only screen and (min-width: 767px) and (max-width: 990px) {
    padding: 40px 30px;
  }

  .isoCustomerListBar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: #ffffff;
    border: 1px solid ${palette('border', 0)};
    width: 350px;
    overflow: hidden;
    overflow-y: auto;

    @media only screen and (max-width: 767px) {
      &.ant-layout-sider {
        flex: 0 0 380px !important;
        width: auto !important;
        margin-bottom: 20px;
        max-width: none !important;
        min-width: 0 !important;
      }
    }

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      width: 270px !important;
      flex: 0 0 270px !important;
    }
  }

  .isoCustomerBoxWrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: #ffffff;
    border: 1px solid ${palette('border', 0)};
    border-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    border-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
    position: relative;

    .isoCustomerBox {
      width: 100%;
      height: 100%;
    }

    .isoCustomerControl {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;
      padding: 30px;
      background-color: #ffffff;

      @media only screen and (max-width: 767px) {
        padding: 30px 20px;
      }

      button:not(.isoAddCustomerBtn) {
        font-size: 16px;
        color: ${palette('secondary', 0)};
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        background-color: #ffffff;
        outline: 0;
        padding: 0;
        border: 1px solid ${palette('border', 0)};
        margin-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : '-1px'};
        margin-right: ${props =>
          props['data-rtl'] === 'rtl' ? '-1px' : 'inherit'};
        cursor: pointer;
        ${borderRadius()};
        ${transition()};

        i {
          width: 100%;
        }

        span {
          display: none;
        }

        &:first-child {
          margin-left: ${props =>
            props['data-rtl'] === 'rtl' ? 'inherit' : '0'};
          margin-right: ${props =>
            props['data-rtl'] === 'rtl' ? '0' : 'inherit'};
        }

        &:hover {
          color: ${palette('primary', 0)};
          background-color: ${palette('grayscale', 7)};
        }
      }

      .isoAddCustomerBtn {
        background-color: ${palette('primary', 0)};
        border: 0;
        height: 30px;
        padding: 0 15px;
        margin-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : 'auto'};
        margin-right: ${props =>
          props['data-rtl'] === 'rtl' ? 'auto' : 'inherit'};
        ${borderRadius('3px')};
        ${transition()};

        span {
          font-size: 12px;
          font-weight: 400;
          padding: 0;
          text-transform: uppercase;
          color: #ffffff;
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }
  }
`;

const CustomersWrapper = WithDirection(WDCustomersWrapper);

export { CustomersWrapper };
