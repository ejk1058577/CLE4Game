import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import meeuwImage from '../images/meeuw.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Meeuw:new ImageSource(meeuwImage)
}
const ResourceLoader = new Loader([Resources.Fish,Resources.Meeuw])

export { Resources, ResourceLoader }