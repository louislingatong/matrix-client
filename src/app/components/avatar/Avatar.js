import React, {useEffect, useRef, useState} from 'react';
import {Button, Image} from 'react-bootstrap';
import {FaUserCircle, FaCamera} from 'react-icons/fa';
import PropTypes from 'prop-types';

Avatar.propTypes = {
  avatarPath: PropTypes.string,
  handleAvatarUpdate: PropTypes.func.isRequired,
};

function Avatar(props) {
  const { avatarPath, handleAvatarUpdate } = props;

  const dragCounter = useRef(0);
  const inputFile = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (avatar) {
      handleAvatarUpdate(avatar);
    }
  }, [avatar]);

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
      setAvatar(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault()
    inputFile.current.click();
  };

  const renderAvatar = () => {
    if (avatar) {
      return <Image height={180} width={180}
                    src={URL.createObjectURL(avatar)} roundedCircle />
    } else if (avatarPath) {
      return <Image height={180} width={180}
             src={process.env.REACT_APP_API_URL + avatarPath} roundedCircle />
    }

    return <FaUserCircle size={180}/>
  }

  return (
    <div onDrop={e => handleDrop(e)}
         onDragOver={e => handleDrag(e)}
         onDragEnter={e => handleDragIn(e)}
         onDragLeave={e => handleDragOut(e)}>
      {renderAvatar()}
      <Button className="mt-3" variant="secondary" onClick={handleUpload}>
        Change Profile Photo
      </Button>
      <input ref={inputFile} accept="image/*" id="image" name="image" type="file" multiple={false}
             onChange={handleImageChange} style={{display: 'none'}}/>
    </div>
  )
};

export default Avatar;