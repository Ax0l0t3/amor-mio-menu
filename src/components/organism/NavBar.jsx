import { PreSaveSVG } from '../atom/PreSaveIcon'
import { EditSVG } from '../atom/EditIcon'
import { AddSVG } from '../atom/AddIcon'
import { CustomizeSVG } from '../atom/CustomizeIcon'
import { AboutSVG } from '../atom/AboutIcon'

export const NavBar = () => {
  return (
    <div>
      <PreSaveSVG />
      <EditSVG />
      <AddSVG />
      <CustomizeSVG />
      <AboutSVG />
    </div>
  )
}