import { Modal as ModalWrapper, } from 'antd';
import { styled } from '../../../stitches.config';

import Text from '../../core/Text';

const ModalHeaderWrapper = styled('div', {});

const ModalBodyWrapper = styled('div', {});

export const Modal = ({ 
    children,
    closable,
    maskClosable,
    title,
    isVisible,
    onCancel,
    bodyStyle,
    wrapClassName,
}) => {
    return (
        <ModalWrapper
        closable={closable}
        footer={null}
        maskClosable={maskClosable}
        visible={isVisible}
        onCancel={onCancel}
        {...bodyStyle && { bodyStyle: { ...bodyStyle } }}
        {...wrapClassName && { wrapClassName: { ...wrapClassName } }}
        zIndex={99999999}>
            <ModalHeaderWrapper>
                <Text type="span" size="medium">{title}</Text>
            </ModalHeaderWrapper>
            <ModalBodyWrapper className={'' + ((title) && ' mt-4')}>
                {children}
            </ModalBodyWrapper>
        </ModalWrapper>
    )
}

export default Modal;