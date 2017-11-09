import React from 'react'

export default function UploadForm({ image, updateArt, handleSubmit }) {
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={ handleSubmit }>
          <div className="row row-grid">
            <div className="mx-auto">
              <img src={ image } id="upload-art" className="img-thumbnail .img-fluid"/>
            </div>
          </div>
          <div className="row row-grid">
            <div className="mx-auto">
              <label className="btn btn-outline-primary">
                Select Image <UploadImage updateArt={ updateArt }/>
              </label>
            </div>
          </div>
          <div className="row row-grid">
            <div className="mx-auto">
              <label className="btn btn-outline-primary">
                Select Audio File <input type="file" name="audio-file" accept="audio/*" hidden/>
              </label>
            </div>
          </div>
          <div className="row row-grid">
            <div className="col-4 mx-auto">
              <input className="form-control" type="text" name="title" placeholder="Title"/>
            </div>
          </div>
          <div className="row row-grid">
            <div className="col-4 mx-auto">
              <input className="form-control" type="text" name="artist" placeholder="Artist"/>
            </div>
          </div>
          <div className="row row-grid">
            <div className="mx-auto">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function UploadImage({ updateArt }) {
  return (
    <input onChange={ updateArt } type="file" name="image-file" id="image-upload" accept="image/*" hidden/>
  )
}
