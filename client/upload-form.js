import React from 'react'

export default function UploadForm() {
  return (
    <div className="container">
      <div className="card">
        <form>
          <div className="row row-grid">
            <div className="mx-auto">
              <label className="btn btn-outline-primary">
                Select Image <input type="file" name="image" id="image-upload" accept="image/*" hidden/>
              </label>
            </div>
          </div>
          <div className="row row-grid">
            <div className="mx-auto">
              <label className="btn btn-outline-primary">
                Select Audio File <input type="file" name="audio-file" hidden/>
              </label>
            </div>
          </div>
          <div className="row row-grid">
            <div className="col-4 mx-auto">
              <input className="form-control" type="text" placeholder="Title"/>
            </div>
          </div>
          <div className="row row-grid">
            <div className="col-4 mx-auto">
              <input className="form-control" type="text" placeholder="Artist"/>
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
