/* eslint-disable react/prop-types */
import '../assets/styles/createPrevCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Uploader from '../components/createUploader'
import biking from '/biking.png';
import running from '/running.png';
import swimming from '/swimming.png';
import cardio from '/cardio.png';
import walking from '/walking.png';


function PrevCard( {inputs, task, image, handleFileChange} ) {

    return (
        <>
            <div className='prevcard'>
                {/* preview Image */}
                <div className='prevImg'>
                    <Uploader image={image} handleFileChange={handleFileChange} />
                </div>

                {/* preview title */}
                <div className='container-text'>
                    <div className='prevTextbox'>
                        <p className='title-text'>{inputs.title}</p>
                    </div>
                    {/* edit and delete icon */}
                    <FontAwesomeIcon icon={faPenToSquare} className='faPenToSquare' />
                    <FontAwesomeIcon icon={faTrashCan} className='faTrashCan' />

                    {/* preview caption */}
                    <div className='prevCaption'>
                        <p className='caption-text'>{inputs.caption}</p>
                    </div>

                    {/* preview date */}
                    <div className='prevDate'>
                        <p className='date-text'>{inputs.date}</p>
                    </div>
                    {/* date icon */}
                    <FontAwesomeIcon icon={faCalendar} className='faCalendar' />

                    {/* preview duration */}
                    <div className='prevDuration'>
                        {inputs.type === 'biking' && <img src={biking} className='icon-img'  />} 
                        {inputs.type === 'running' && <img src={running} className='icon-img'  />}
                        {inputs.type === 'swimming' && <img src={swimming} className='icon-img-swimming'  />}    
                        {inputs.type === 'cardio' && <img src={cardio} className='icon-img'  />}
                        {inputs.type === 'walking' && <img src={walking} className='icon-img'  />}
                        <p className='duration-text'>{inputs.duration}</p>
                    </div>
                </div>

                {/* preview task status */}
                <div className='previewStatus' style={{backgroundColor:task}}></div>
            </div>

            
        </>
    )
}

export default PrevCard