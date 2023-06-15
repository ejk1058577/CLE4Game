import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import meeuwImage from '../images/meeuw.png'
import humanImage from  '../images/human.png'
import nestImage from '../images/nest.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Meeuw:new ImageSource(meeuwImage),
    Human:new ImageSource(humanImage),
    Nest: new ImageSource(nestImage)
}
const ResourceLoader = new Loader([Resources.Fish,Resources.Meeuw,Resources.Human, Resources.Nest])

export { Resources, ResourceLoader }