import PropTypes from "prop-types";

export const SelectedOptionMainTab = ({
    cardTitle = "Default"
}) => {
    return (
        <div className="bg-[#977f33ff] w-[10rem] h-16 flex items-center justify-center text-center text-[1.25rem]">
            <h3>{cardTitle}</h3>
        </div>
    )
}

SelectedOptionMainTab.propTypes = {
    cardTitle: PropTypes.string
}