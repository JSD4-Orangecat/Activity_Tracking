// import "../../assets/styles/cardCSS/cretaeUploader.css";
import uploadIcon from "/generic/uploadIcon.png";

function EditUploader({ image, handleFileChange, inputs }) {
  // console.log({image})
  return (

    <main className="upload-container">
      <form
        className="ImgForm"
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          name="img"
          onChange={handleFileChange}
          required
        ></input>

        <img src={image || inputs.img} className="img-upload" name="img" />
        <label forhtml="file" className="label-upload">
          <img src={uploadIcon} className="icon-upload" />
        </label>
        <p>choose Image</p>
      </form>
    </main>

  )
}

export default EditUploader;