import React from 'react';
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';
import 'react-modal-video/scss/modal-video.scss';

function VideoPopupModal({ isOpen, setOpen }) {
  return (
    <div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="uwgfiJ-xEW0"
        onClose={() => setOpen(false)}
      >
        <ReactPlayer controls={false} url="https://youtu.be/uwgfiJ-xEW0" />
      </ModalVideo>
    </div>
  );
}

export default VideoPopupModal;
