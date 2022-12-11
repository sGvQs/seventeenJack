import { useState } from 'react';
import { StyledAudioContainer, StyledPause, StyledPlay } from './styled';

export const Audio = () => {
  const [isPlay, setIsPlay] = useState(false);

  const audioMode = async () => {
    const music = document.getElementById('audio') as HTMLMediaElement;

    if (isPlay === false) {
      setIsPlay(true);
      try {
        await music?.play();
      } catch (e) {
        console.log(e);
      }
    }

    if (isPlay === true) {
      music?.pause();
      setIsPlay(false);
    }
  };

  return (
    <div>
      <audio id="audio" src="Jazz.mp3"></audio>
      <StyledAudioContainer onClick={audioMode}>
        {!isPlay && <StyledPlay />}
        {isPlay && <StyledPause />}
      </StyledAudioContainer>
    </div>
  );
};
