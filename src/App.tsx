import './App.css';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Forward30Icon from '@mui/icons-material/Forward30';
import Replay10Icon from '@mui/icons-material/Replay10';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PauseRounded from '@mui/icons-material/PauseRounded';
import AddIcon from '@mui/icons-material/Add';
import { styled, useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRef, useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import './App.css'
const palyBackStyle = {
  borderRadius: "6px",
  border: "2px solid #b7b7b7",
  margin: "0 5px",
  display: "grid",
  cursor: "pointer",
}
const playlist = [
  // {
  //   src: 'https://content.blubrry.com/takeituneasy/lex_ai_balaji_srinivasan.mp3',
  // },
  { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' },
  { src: 'https://youtu.be/Ov0YGGSY6gY' },
];
const App = () => {
  const audioPlayer: any = useRef();
  const theme = useTheme();

  const [palyback, setPlayback] = useState<number>(1);
  const [play, setPlay] = useState<Boolean>(false)
  const [currentTrack, setTrackIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState<number>(0);


  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };
  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };
  const playBackRateInc = () => {
    setPlayback(audioPlayer.current.audio.current.playbackRate += 0.25);
   
  };

  const playBackRateDec = () => {
    audioPlayer.current.audio.current.playbackRate > 0.25 &&
      setPlayback((audioPlayer.current.audio.current.playbackRate -= 0.25));

  };
  const handleListen = (e: any) => {
    setElapsed(Math.floor(e.target.currentTime));
    setDuration(Math.floor(e.target.duration));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        boxShadow: "0 0 3px 0 rgb(0 0 0 / 20%)",
        background: "#0a1929",
        padding:"10px",
      }}>
      <Box sx={{ width: "100px" }}></Box>
      <Box sx={{ width: "100%" }}>
        {/* <Player /> */}

        <AudioPlayer
          // autoPlay
          onListen={handleListen}
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.CURRENT_TIME,
            <Box className='rhap_time timer-divider'>/</Box>,
            RHAP_UI.DURATION
          ]}
          customVolumeControls={[RHAP_UI.VOLUME]} //, <div key={2}>&nbsp;&nbsp;{volumeText}</div>
          customAdditionalControls={[
            <Typography sx={{ marginRight: "5px",color: "#b7b7b7" }}>{palyback}x</Typography>,
            <Box sx={palyBackStyle} onClick={playBackRateDec}><RemoveIcon sx={{color: "#797B7D"}}/></Box>,
            <Box sx={palyBackStyle} onClick={playBackRateInc}><AddIcon sx={{color: "#797B7D"}}/></Box>,
          ]}
          customIcons={{
            play: <PlayCircleIcon />,
            pause: <PauseCircleIcon />,
            rewind: <Replay10Icon />,
            forward: <Forward30Icon />,
            volume: <VolumeUpIcon />,
            volumeMute: <VolumeOffIcon />,
          }}
          volume={0.2}

          progressJumpSteps={{
            forward: 30000,
            backward: 10000,
          }}
          src={playlist[currentTrack].src}
          // showSkipControls
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          ref={audioPlayer}
        />
      </Box>
    </Box>
  );
};

export default App;
