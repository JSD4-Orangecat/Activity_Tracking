import '../assets/styles/sideContainer.css';
import catBiceps from "/catBiceps.png"

function SideContainer () {


    return (
        <div className='sideContainer'>
            <div className='sideText'>
                <h1 className='greyText'>Be The <br /> <span className='orangeText'>STRONGEST</span> Cat!!!</h1>
            </div>
            <img src={catBiceps} className='sideIMG'></img>
        </div>
    )
}

export default SideContainer;