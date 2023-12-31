import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import meeuwImage from '../images/meeuw.png'
import humanImage from  '../images/human.png'
import nestImage from '../images/nest.png'
import groundImage from '../images/groundTile.png'
import treeImage from '../images/tree.png'
import stickImage from '../images/stick.png'
import empty from '../images/empty.png'
import arrow from '../images/arrow.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Meeuw:new ImageSource(meeuwImage),
    Human:new ImageSource(humanImage),
    Nest: new ImageSource(nestImage),
    Ground: new ImageSource(groundImage),
    Tree:new ImageSource(treeImage),
    Stick:new ImageSource(stickImage),
    empty:new ImageSource(empty),
    arrow: new ImageSource(arrow)
}
const ResourceLoader = new Loader([Resources.Fish,Resources.Meeuw,Resources.Human, Resources.Nest,Resources.Ground,Resources.Tree,Resources.Stick,Resources.empty,Resources.arrow])

export { Resources, ResourceLoader }