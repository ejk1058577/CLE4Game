import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import meeuwImage from '../images/meeuw.png'
import humanImage from  '../images/human.png'
import nestImage from '../images/nest.png'
import groundImage from '../images/groundTile.png'
import groundGrassImage from '../images/groundgrassyTile.png'
import groundCrackedImage from '../images/groundCrackedTile.png'
import treeImage from '../images/tree.png'
import stickImage from '../images/stick.png'
import empty from '../images/empty.png'
import arrow from '../images/arrow.png'
import food from '../images/Food.png'
import titleImage from '../images/loadingscreen.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Meeuw:new ImageSource(meeuwImage),
    Human:new ImageSource(humanImage),
    Nest: new ImageSource(nestImage),
    Ground: new ImageSource(groundImage),
    GroundGrass: new ImageSource(groundGrassImage),
    GroundCracked: new ImageSource(groundCrackedImage),
    Tree:new ImageSource(treeImage),
    Stick:new ImageSource(stickImage),
    empty:new ImageSource(empty),
    arrow: new ImageSource(arrow),
    Food: new ImageSource(food),
    Title: new ImageSource(titleImage)
}

const ResourceLoader = new Loader([Resources.Fish,Resources.Meeuw,Resources.Human, Resources.Nest,Resources.Ground,Resources.GroundGrass,Resources.GroundCracked,Resources.Tree,Resources.Stick,Resources.empty,Resources.arrow,Resources.Food,Resources.Title])
ResourceLoader.logo = titleImage
ResourceLoader.logoPosition
// ResourceLoader.logoWidth = 659
// ResourceLoader.logoHeight = 203
export { Resources, ResourceLoader }