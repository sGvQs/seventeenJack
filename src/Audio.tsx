import './Audio.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function Audio() {

  let [isPlay, playFlag] = useState(false);

  function audioMode() {
    
    const audioButton = document.getElementById("audio") as HTMLMediaElement;

    if(isPlay === false){
      audioButton?.play();
      playFlag(true);
    };

    if(isPlay === true){
      audioButton?.pause();
      playFlag(false);
    }
  }

  return (
    <div>
      <audio className="audio" src="../src/audio/y2mate.com - THE BEST OF BILL EVANS FULL ALBUM.mp3" id='audio'></audio>
      <div onClick={audioMode} className='white'>
        {!isPlay && <FontAwesomeIcon className="playIcon" icon={faPlay} />}
        {isPlay && <FontAwesomeIcon className='playIcon' icon={faPause}/>}
      </div>
    </div>
  )
}

export default Audio

