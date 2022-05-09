import { Modal as ModalWrapper, } from 'antd';

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
        {...title && { title: title }}
        visible={isVisible}
        onCancel={onCancel}
        {...bodyStyle && { bodyStyle: { ...bodyStyle } }}
        {...wrapClassName && { wrapClassName: { ...wrapClassName } }}
        zIndex={99999999}>
            {children}
        </ModalWrapper>
    )
}

export default Modal;