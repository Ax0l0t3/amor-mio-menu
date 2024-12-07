export const TextButton = ({
    buttonLabel = "Default"
}) => {
    return (
        <button type="button" className="flex items-center justify-center w-[9rem] h-12 rounded-full bg-[#828d51ff]">
            {buttonLabel}
        </button>
    )
}