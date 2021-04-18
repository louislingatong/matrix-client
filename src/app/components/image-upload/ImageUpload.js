import React, {useEffect, useRef, useState} from 'react';
import {Button, Figure} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {FaPlus} from 'react-icons/fa';

ImageUpload.propTypes = {
  handleImageUpdate: PropTypes.func.isRequired,
};

function ImageUpload({ handleImageUpdate }) {
  const dragCounter = useRef(0);
  const inputFile = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (image) {
      handleImageUpdate(image);
    }
  }, [image]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImage(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault()
    inputFile.current.click();
  };

  const renderImage = () => {
    return (
        <Figure.Image
          fluid={false}
          style={{maxHeight: '400px', maxWidth: '400px', margin: 0}}
          src={URL.createObjectURL(image)}
        />
    )
  };

  return (
    <div onDrop={e => handleDrop(e)}
         onDragOver={e => handleDrag(e)}
         onDragEnter={e => handleDragIn(e)}
         onDragLeave={e => handleDragOut(e)}
         className="text-center">
      <div className="bg-secondary-light"
           style={{height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {image && renderImage()}
      </div>
      <Button className='mt-2' variant="secondary" onClick={handleUpload}>
        Upload
      </Button>
      <input ref={inputFile} accept="image/*" id="image" name="image" type="file" multiple={false}
             onChange={handleImageChange} style={{display: 'none'}}/>
    </div>
  )
}

export default ImageUpload;