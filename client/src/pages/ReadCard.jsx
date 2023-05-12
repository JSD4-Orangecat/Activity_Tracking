import '../assets/styles/readCardCSS/readCard.css';
import { useState } from 'react'
import Layout from "../components/Layout";
import CoverImage from "../components/readCardComponents/readCardCoverImage";
import CallOut from "../components/readCardComponents/readCardCallOut";
import SocialMedia from '../components/readCardComponents/readCardSocialmedia';
import Card from "../components/readCardComponents/readCardCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight } from '@fortawesome/free-regular-svg-icons'


// import biking from '/biking.png';
// import running from '/running.png';
// import swimming from '/swimming.png';
// import cardio from '/cardio.png';


const cardDatas = [{
        id: 1,
        title: 'This is title',
        caption: 'I wish I was a cat, no school, no work, no exercise, just meow meow meow meow meow',
        duration: '1 h 30 m',
        date: '2023-03-18',
        task: '',
        image: 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        activity: '/biking.png'
    },
    {
        id: 2,
        title: 'keep pushing yourself',
        caption: ' meow meow meow meow meow',
        duration: '2 h 10 m',
        date: '2023-04-17',
        task: '',
        image: 'https://images.unsplash.com/photo-1621244246296-c6be56267cc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1222&q=80',
        activity: '/running.png'
    },
    {
        id: 3,
        title: 'No time to sleep',
        caption: 'I eat, sleep, and run',
        duration: ' 30 m',
        date: '2023-03-16',
        task: '',
        image: 'https://plus.unsplash.com/premium_photo-1680981143179-8a6cd94d2901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
        activity: "/swimming.png"
    },
    {
        id: 4,
        title: 'no title to display',
        caption: 'last test',
        duration: '1 h 48 m',
        date: '2023-03-07',
        task: '',
        image: 'https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        activity: '/cardio.png'
    }
]


function ReadCard () {

    const [cover, setCover] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [filename, setFilename] = useState('no selected file');
    const [ pickerVisible, setPickerVisible ] = useState(false);
    const [ currentEmoji, setCurrentEmoji ] = useState(null);
    const [rcInputs, setRcInputs] = useState({
        quote : '',
        emoji : '',
        cover : ''
    })
    
    const showPicker = () => {
        setPickerVisible(!pickerVisible);
    }

    const pickEmoji = (e) => {
        setCurrentEmoji(e.native);
        setPickerVisible(!pickerVisible);
        setRcInputs((prevRcInputs) => ({ ...prevRcInputs, emoji: e.native }));
    }
    
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        //console.log(e.target.value)
        setRcInputs((prevRcInputs) => ({...prevRcInputs,[name]: value}));
        //console.log({...callOut})
    }
    console.log(rcInputs)

    function handleFileChange (e) {
        const { files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setFilename(file.name);
            setCover(URL.createObjectURL(file));
            handleChangeInput({target: {name: 'cover', value: file}});
            }
        }
    

    return (
        <Layout>
            <main className='bg-readcard'>
                <div className='r-coverimage'>
                    <CoverImage cover={cover} handleFileChange={handleFileChange} />
                </div>
                <div className='r-callout'>
                    <CallOut handleChangeInput={handleChangeInput} showPicker={showPicker} pickEmoji={pickEmoji} pickerVisible={pickerVisible} currentEmoji={currentEmoji}/>
                </div>
                <div className='r-socialmedia'>
                    <SocialMedia />
                </div>

                {cardDatas.map((ele) => 
                    <Card key={ele.id}  data={ele} />
                )}

                {/* submit button */}
                <input type="submit" value="Create new card" className="r-btn-create"></input>

                {/* page */}
                <div className='r-page'>
                    <FontAwesomeIcon icon={faCircleLeft} className='faCircle' />
                    <span>2</span>
                    <FontAwesomeIcon icon={faCircleRight} className='faCircle' />
                </div>
            </main>
            
        </Layout>
    )

}

export default ReadCard;