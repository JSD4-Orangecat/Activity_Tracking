/* eslint-disable react/prop-types */
import '../../assets/styles/cardCSS/readCardCoverImage.css';

function CoverImage(props) {

    const { cover, handleFileChange } = props;

    return (
        <main className="cover-container">
            <input type="file" accept="image/*" id="imgs" className="cover-input-field" name='coverimage'
                onChange={handleFileChange} ></input>
            <img src={cover} className="cover-img-upload" name='coverImg' />
            <div className='btn-changecover'>
                <label className='click-here' htmlFor='imgs'>Change cover</label>
            </div>

        </main>
    )
}

export default CoverImage;