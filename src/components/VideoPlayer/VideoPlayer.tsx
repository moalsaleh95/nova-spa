import React, { useState, useRef, useEffect } from 'react';
import play from '../../assets/icons/play.svg';
import pause from '../../assets/icons/pause.png';
import vid_poster from '../../assets/images/vid_poster_cropped.png';
// import video from '../../assets/videos/video.mp4';


const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState('');

    const togglePlay = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
        } else {
            videoRef?.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    function secondsToMinutes(seconds: number) {
        let minutes = Math.floor(seconds / 60);
        let remaining_seconds = (seconds % 60).toFixed();

        return (
            seconds === 60 ?
                minutes + ":00"
                :
                (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" : "") + remaining_seconds
        )
    }


    const handleProgress = () => {
        const length = videoRef?.current?.duration;
        const currentTime = videoRef?.current?.currentTime;
        // let progress_unformatted: number = 0
        let progress_unformatted;

        if (length) {
            progress_unformatted = length - (currentTime ? currentTime : 0);
            setProgress(secondsToMinutes(progress_unformatted))
        }
    }


    useEffect(() => {
        handleProgress()
    },)

    return (
        <div className='relative'>
            <video
                onTimeUpdate={handleProgress}
                ref={videoRef}
                width="690px"
                height="690px"
                // controls
                poster={vid_poster}
            >
                <source src="https://www.pexels.com/download/video/6628412/" type="video/mp4" />
            </video>

            <div className='absolute flex left-[30px] bottom-[30px]' >
                <button className='' onClick={togglePlay}>
                    {isPlaying ?
                        <img src={pause} alt='' className='md:w-[50px] w-[30px] md:h-[50px] h-[30px]' />
                        :
                        <img src={play} alt='' className='md:w-[50px] w-[30px] md:h-[50px] h-[30px]' />
                    }
                </button>

                <div className='ml-[30px]'>
                    <p className='font-medium md:text-[16px] text-[14px] text-white font-poppins'>{progress ? progress : '0:39'}</p>
                    <h1 className='text-white md:text-[25px] text-[16px] font-gotu'>History, Purpose <br/> and Usage</h1>
                </div>
            </div>

        </div>
    )
}

export default VideoPlayer;