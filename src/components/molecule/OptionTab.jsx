import PropTypes from "prop-types";

export const OptionMainTab = ({
    cardTitle = "Default"
}) => {
    return (
        <div className="bg-[#1f1612ff] w-[10rem] h-16 flex items-center justify-center text-center text-[1.25rem]">
            <h3>{cardTitle}</h3>
        </div>
    )
}

OptionMainTab.propTypes = {
    cardTitle: PropTypes.string
}