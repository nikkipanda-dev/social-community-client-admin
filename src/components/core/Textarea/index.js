import { styled } from "../../../stitches.config";

const TextareaWrapper = styled('textarea', {});

export const Textarea = ({ className, css, }) => {
    return (
        <TextareaWrapper className={ className } css={{ ...css }}></TextareaWrapper>
    )
}

export default Textarea;