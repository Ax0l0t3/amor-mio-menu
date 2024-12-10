import PropTypes from "prop-types";
import "../../styles/molecule/_menu-option-card.css"

export const MenuOptionCard = ({
    cardName = "Default"
}) => {
    return (
        <div className="bg-black flex justify-center items-center w-[11.5rem] h-[6rem] p-2 rounded-[0.5rem] mt-2 mr-2">
            <div className="hexagon-div">
                <div className="top-hexagon-div" />
                <div className="mid-hexagon-div" />
                <div className="bottom-hexagon-div" />
            </div>
            <div className="text-[1.125rem] input-div">
                <h3 className="text-center">{cardName}</h3>
            </div>
        </div>
    )
}

MenuOptionCard.propTypes = {
    cardName: PropTypes.string
}