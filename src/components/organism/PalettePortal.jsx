import "../../styles/organism/_palette-portal.css"

export const PalettePortal = () => {
  const returnColours = [
    "#1f1612ff",
    "#454a48ff",
    "#828d51ff",
    "#f7df44ff",
    "#d5b639ff",
    "#999999ff",
    "#e6e6e6ff",
    "#1c0310ff",
  ];

  const gradients = [
    {channel: "red-gradient", value: 0},
    {channel: "green-gradient", value: 239},
    {channel: "blue-gradient", value: 132},
    {channel: "alpha-gradient", value: 255}
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-2 rounded-lg flex flex-col">
        <div className="text-black">
          {gradients.map((obj, id) => (
            <div key={id} className="flex items-center">
              <div className={obj.channel} />
              <p className="p-gradient">{obj.value}</p>
            </div>
          ))}
        </div>
              {/*
                  Hover
              */}
        <div className="flex">
          <div className="bg-[#977f33ff] w-[4.5rem] h-[4.5rem] rounded-l-lg border-[4px] border-transparent hover:border-black"/>
          {returnColours.map((color, id) => (
            <div key={id} style={{ background: color }} className="w-[4.5rem] h-[4.5rem] border-[4px] border-transparent hover:border-black"/>
          ))}
          <div className="bg-[#808080ff] w-[4.5rem] h-[4.5rem] rounded-r-lg border-[4px] border-transparent hover:border-black"/>
        </div> 

      </div>
    </div>
  )
}