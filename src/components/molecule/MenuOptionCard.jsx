import PropTypes from "prop-types";
export const MenuOptionCard = ({
    cardName = "Default"
}) => {
    return (
        <div className="bg-black">
            <div className="text-[1.125rem]">
                <h3>{cardName}</h3>
            </div>
        </div>
    )
}

MenuOptionCard.propTypes = {
    cardName: PropTypes.string
}