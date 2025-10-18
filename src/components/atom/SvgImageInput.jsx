import PropTypes from "prop-types";
import "../../styles/atom/_svg-image-input.css";

export const SvgImageInput = ({
    accept = "",
    onChange = Function.prototype,
    svgNode,
    type = "button",
}) => {
    const handleChange = (e) => {
        onChange(e);
    };
    return (
        <label className="svg-image-input">
            {svgNode}
            <input type={type} accept={accept} onChange={ (e) => handleChange(e)}/>
        </label>
    )
};

SvgImageInput.propTypes = {
    accept: PropTypes.string,
    onChange: PropTypes.func,
    svgNode: PropTypes.node,
    type: PropTypes.string
}