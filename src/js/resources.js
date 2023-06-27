import { ImageSource, Sound, Resource, Loader } from 'excalibur'

import meeuw from '../images/meeuw.png'
import human1Image from  '../images/human1.png'
import human2Image from  '../images/human2.png'
import human3Image from  '../images/human3.png'
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
import marktStripes from '../images/marktStripes.png'
import titleImage from '../images/loadingscreen.png'

import ambient from '../audio/ambient.mp3'
import button from '../audio/button.mp3'
import gameover from '../audio/gameover.mp3'
import impact from '../audio/impact.ogg'
import point from '../audio/point.mp3'
import wingflap from '../audio/wingflap.mp3'

const Resources = {
    Meeuw:new ImageSource(meeuw),
    Human1:new ImageSource(human1Image),
    Human2:new ImageSource(human2Image),
    Human3:new ImageSource(human3Image),
    Nest: new ImageSource(nestImage),
    Ground: new ImageSource(groundImage),
    GroundGrass: new ImageSource(groundGrassImage),
    GroundCracked: new ImageSource(groundCrackedImage),
    Tree:new ImageSource(treeImage),
    Stick:new ImageSource(stickImage),
    empty:new ImageSource(empty),
    arrow: new ImageSource(arrow),
    Food: new ImageSource(food),
    Markt:new ImageSource(markt),
    MarktStripes:new ImageSource(marktStripes),
    Title: new ImageSource(titleImage),
    Ambient: new Sound(ambient),
    Button: new Sound(button),
    Gameover: new Sound(gameover),
    Impact: new Sound(impact),
    Point: new Sound(point),
    Wingflap: new Sound(wingflap)
}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)
ResourceLoader.logo = titleImage

export { Resources, ResourceLoader }