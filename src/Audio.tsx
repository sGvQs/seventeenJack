import './Audio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Audio() {
  let [isPlay, playFlag] = useState(false);

  async function audioMode() {
    const music = document.getElementById('audio') as HTMLMediaElement;

    if (isPlay === false) {
      playFlag(true);
      try {
        await music?.play();
      } catch (e) {
        console.log(e);
      }
    }

    if (isPlay === true) {
      music?.pause();
      playFlag(false);
    }
  }

  return (
    <div>
      <audio
        id="audio"
        src="src/assets/► FNV Old World Blues DLC_ Mysterious Broadcast Instrumentals (Jazz) - from YouTube.mp3"
      ></audio>
      <div onClick={audioMode} className="white">
        {!isPlay && <FontAwesomeIcon className="playIcon" icon={faPlay} />}
        {isPlay && <FontAwesomeIcon className="playIcon" icon={faPause} />}
      </div>
    </div>
  );
}

export default Audio;
