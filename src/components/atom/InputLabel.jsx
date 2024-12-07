export const InputLabel = ({
    inputName = "Default"
}) => {
    return (
        <div className="bg-[#454a48ff] w-[11rem] h-[1.6rem] flex items-center">
            <p>{inputName}</p>
        </div>
    )
}