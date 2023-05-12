/* eslint-disable react/prop-types */
import '../../assets/styles/readCardCSS/readCardCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
// import biking from '../../assets/images/CreateCard/biking.png';
// import running from '../../assets/images/CreateCard/running.png';
// import swimming from '../../assets/images/CreateCard/swimming.png';
// import cardio from '../../assets/images/CreateCard/cardio.png';
// import walking from '../../assets/images/CreateCard/walking.png';


function Card( {data} ) {

    return (
        <>
            <div className='r-prevcard'>
                {/* preview Image */}
                <div className='r-prevImg'>
                    <img src={data.image} className='r-img' />
                </div>
                

                {/* preview title */}
                <div className='r-container-text'>
                    <div className='r-prevTextbox'>
                        <p className='r-title-text'>{data.title}</p>
                    </div>
                    {/* edit and delete icon */}
                    <FontAwesomeIcon icon={faPenToSquare} className='r-faPenToSquare' />
                    <FontAwesomeIcon icon={faTrashCan} className='r-faTrashCan' />

                    {/* preview caption */}
                    <div className='r-prevCaption'>
                        <p className='r-caption-text'>{data.caption}</p>
                    </div>

                    {/* preview date */}
                    <div className='r-prevDate'>
                        <p className='r-date-text'>{data.date}</p>
                    </div>
                    {/* date icon */}
                    <FontAwesomeIcon icon={faCalendar} className='r-faCalendar' />

                    {/* preview duration */}
                    <div className='r-prevDuration'>
                        {/* {data.activity === 'biking' && <img src={biking} className='r-icon-img'  />} 
                        {data.activity === 'running' && <img src={running} className='r-icon-img'  />}
                        {data.activity === 'swimming' && <img src={swimming} className='r-icon-img-swimming'  />}    
                        {data.activity === 'cardio' && <img src={cardio} className='r-icon-img'  />}
                        {data.activity === 'walking' && <img src={walking} className='r-icon-img'  />} */}
                        <img src={data.activity} className='r-activity' />
                        <p className='r-duration-text'>{data.duration}</p>
                    </div>
                </div>

                {/* preview task status */}
                <div className='r-previewStatus' style={{backgroundColor:data.task}}></div>
            </div>

            
        </>
    )
}

export default Card