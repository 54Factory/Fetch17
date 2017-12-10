import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius, boxShadow } from '../../config/style-util';
import WithDirection from '../../config/withDirection';

const WDOilCollectionCardWrapper = styled.div`
  width: 100%;
  padding: 0 35px;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  @media only screen and (max-width: 767px) {
    padding: 0 20px;
  }

  @media only screen and (min-width: 767px) and (max-width: 990px) {
    flex-direction: column;
  }

  .CollectionCardHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    flex-shrink: 0;
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '50px')};
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? '50px' : 'inherit')};
    flex-shrink: 0;

    @media only screen and (max-width: 600px) {
      margin-bottom: 20px;
    }

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      margin-bottom: 20px;
    }

    .CollectionMap {
      width: 300px;
      height: 300px;
    }

    .CollectionContainerBox {
      width: 200px;
      height: 200px;
      align-items: center;
    }

    .CollectionName {
      padding-top: 10px;
      font-size: 16px;
      font-weight: 600;
      color: ${palette('text', 0)};
      line-height: 1.5;
      margin: 0;
    }
    .CollectionAddress {
      font-size: 12px;
      font-weight: 400;
      color: ${palette('text', 0)};
      line-height: 1.5;
      margin: 0;
    }
    

  }


  .CollectionInfoWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;

    .CollectionCardInfos {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      align-items: baseline;
      flex-direction: row;
      margin-bottom: 15px;

      @media only screen and (max-width: 430px) {
        flex-direction: column;
        margin-bottom: 20px;
      }

      .CollectionInfoLabel {
        font-size: 14px;
        font-weight: 500;
        color: ${palette('text', 0)};
        line-height: 1.5;
        margin: 0;
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '15px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '15px' : 'inherit')};
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
        min-width: 150px;
        position: relative;

        @media only screen and (max-width: 430px) {
          margin-bottom: 5px;
          margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
          padding-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '10px')};
          padding-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : 'inherit')};
          min-width: 0;
        }

        &::after {
          content: ':';
          position: absolute;
          right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
      }

      .CollectionInfoDetails {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: 1.5;
        margin: 0;
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
      }

      input {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: inherit;
        height: 36px;
        padding: 0 15px;
        margin: 0;
        border: 1px solid ${palette('border', 0)};
        outline: 0 !important;
        overflow: hidden;
        background-color: #ffffff;
        ${boxShadow('none')};
        ${borderRadius('3px')};
        ${transition()};

        &:focus {
          border-color: ${palette('primary', 0)};
          ${boxShadow('0 0 0 2px rgba(68, 130, 255, 0.2)')};
          outline: 0;
        }

        &:hover {
          border-color: ${palette('primary', 0)};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }

      textarea {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: 24px;
        height: 210px;
        padding: 10px 15px;
        margin: 0;
        border: 1px solid ${palette('border', 0)};
        outline: 0 !important;
        background-color: #ffffff;
        ${boxShadow('none')};
        ${borderRadius('3px')};
        ${transition()};

        &:focus {
          border-color: ${palette('primary', 0)};
          ${boxShadow('0 0 0 2px rgba(68, 130, 255, 0.2)')};
          outline: 0;
        }

        &:hover {
          border-color: ${palette('primary', 0)};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }
    }
  }
`;

const CollectionCardWrapper = WithDirection(WDOilCollectionCardWrapper);

export { CollectionCardWrapper };
