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
import markt from '../images/markt.png'

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
    Markt:new ImageSource(markt)
}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }