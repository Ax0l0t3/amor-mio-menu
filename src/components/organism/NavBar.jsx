import { PreSaveSVG } from '../atom/PreSaveIcon'
import { EditSVG } from '../atom/EditIcon'
import { AddSVG } from '../atom/AddIcon'
import { CustomizeSVG } from '../atom/CustomizeIcon'
import { AboutSVG } from '../atom/AboutIcon'
import "../../styles/organism/_nav-bar.css"

export const NavBar = () => {
  return (
    <div className="side-bar">
      <AddSVG />
      <EditSVG />
      <PreSaveSVG />
      <CustomizeSVG />
      <AboutSVG />
    </div>
  )
}