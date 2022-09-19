import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faMagnifyingGlass, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

function Home() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const playlist = $('.list-song');
    const cdThumb = $('.current-song .cd-thumb')
    const songName = $('.current-song .song-name')
    const btnNext = $('.current-song .btn-next')
    const btnPrev = $('.current-song .btn-prev')
    const btnRepeat = $('.current-song .btn-repeat')
    const btnRandom = $('.current-song .btn-random')
    const singgerName = $('.current-song .singger-name')
    const progress = $('.current-song .progress')
    const playBtn = $('.btn-toggle-play')
    const currentSong = $('.current-song')
    const volume = $('.current-song-volume .volume-icon')
    const audio = $('#audio')
    const progressVolume = $('#progress-volume')

    let isRandom = false;
    let isRepeat = false;

    const [songs, setSongs] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isplaying, setIsplaying] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3004/songs")
        .then(res => res.json())
        .then(data =>{
            setSongs(data);
        })
    },[])

    // Xử lí khi bấm play
    function playSong() {
        if(isplaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    // Xử lí next bài
    function nextSong() {
        setCurrentIndex(currentIndex + 1)
    }

    // Xử lí prev bài
    function prevSong() {
        setCurrentIndex(currentIndex - 1)
    }
    
    // Xử lí khi đang play
    function audioPlay() {
        setIsplaying(true);
        currentSong.classList.add('playing');
    }

    // Xử lí khi tiến độ bài hát thay đổi
    function onTimeUpdate() {
        if(audio.duration) {
           const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
           progress.value = progressPercent;
        }
    }

    // Xử lí khi tua
    function onChangeCurentTime(e) {
        const seekTime = Math.floor(e.target.value * audio.duration / 100);
        audio.currentTime = seekTime;
    }

    // Xử lí khi đang pause
    function audioPause() {
        setIsplaying(false);
        currentSong.classList.remove('playing');
    }

    // Chọn bài hát
    function choeseSong(index) {
        setCurrentIndex(index)
    }

    if(songs.length != 0) return (
        <div className="root">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="flex-left">
                        {/* Back and next button */}
                        <div className="header-control">
                            <div className="btn btn-back">
                                <i><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></i>
                            </div>
                            <div className="btn btn-next">
                                <i><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></i>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="search">
                            <i><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                            <div className="search-content">
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..."/>
                            </div>
                        </div>
                    </div>

                    {/* Login Register */}
                    <div className="login-register">
                        <a href="/login"><button className="btn btn-login">Đăng nhập |</button></a>
                        <a href="/register"><button className="btn btn-register">| Đăng kí</button></a>
                    </div>
                </div>
                {/* End header */}
                {/* Side bar */}
                <div className="side-bar">
                <div className="side-bar-wrapper">
                    {/* Logo */}
                    <div className="logo-wrapper">
                        <div className="logo">
                            <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                        </div>
                        MP3
                    </div>

                    {/* Guest nav bar */}
                    <div className="side-bar-main">
                        {/* Nav bar main */}
                        <div className="nav-bar nar-bar-main">
                            <li className="nav-bar-item active">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>Bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>Ablum</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faMicrophoneLines}></FontAwesomeIcon></i>
                                    <span>Nghệ sĩ</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon></i>
                                    <span>Thể loại</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </div>
                </div>
                {/* End side bar */}

                {/* Current song */}
                <div className="current-song">
                    <div className="current-song-flex">
                        {/* Song info */}
                        <div className="current-song-info">
                            <div className="cd">
                                <div className="cd-thumb" style={{backgroundImage: `url(${require(`${songs[currentIndex].image}`)})`}}>
                                </div>
                            </div>
                            <div className="song-info">
                                <div className="song-name">
                                    {songs[currentIndex].name}
                                </div>
                                <div className="singger-name">
                                    {songs[currentIndex].singger}
                                </div>
                            </div>
                        </div>

                        {/* Song control */}
                        <div className="current-song-control">
                            <div className="control">
                                <div className="btn btn-repeat">
                                    <i><FontAwesomeIcon icon={faRedo}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-prev" onClick={() => prevSong()}>
                                    <i><FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-toggle-play" onClick={() => playSong()}>
                                    <i className="icon-pause"><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></i>
                                    <i className="icon-play"><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-next" onClick={() => nextSong()}>
                                    <i><FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-random">
                                    <i><FontAwesomeIcon icon={faRandom}></FontAwesomeIcon></i>
                                </div>
                            </div>
                            
                            {/* Song progress */}
                            <input id="progress" 
                                className="progress" type="range" defaultValue="0" step="1" min="0" max="100"
                                onChange={(e) => onChangeCurentTime(e)}
                            />
                        
                            <audio id="audio" 
                                onPlay={(e) => audioPlay()}
                                onPause={(e) => audioPause()}
                                onTimeUpdateCapture={() => onTimeUpdate()}
                                src={require(`${songs[currentIndex].path}`)}></audio>
                        </div>

                        {/* Song setting */}
                        <div className="current-song-setting">
                            <div className="current-song-volume">
                                <div className="volume-icon low">
                                    <i className="volume-mute"><FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon></i>
                                    <i className="volume-low"><FontAwesomeIcon icon={faVolumeLow}></FontAwesomeIcon></i>
                                    <i className="volume-hight"><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></i>
                                </div>
                                <input id="progress-volume" className="progress" type="range" defaultValue="0" step="1" min="0" max="100"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End current song */}

                {/* Main */}
                <div className="main">
                    <div className="song-main">
                        <div className="title">
                            Danh sách bài hát
                            <i><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></i>
                        </div>
                        
                        {/* List song */}
                        <div className="list-song">
                            {songs.map((song, index) => {
                                return (
                                    <div className={`song-info-container ${currentIndex == index ? 'active': ''}`} key={index} data-index = {index}>
                                        <div className="current-song-info">
                                            <div className="cd" onClick={() => choeseSong(index)}>
                                                <div className="cd-thumb"
                                                    style={{backgroundImage: `url(${require(`${song.image}`)})`}}>
                                                </div>
                                            </div>
                                            <div className="song-info">
                                                <div className="song-name">
                                                    {song.name}
                                                </div>
                                                <div className="singger-name">
                                                    {song.singger}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="time">
                                            03:04
                                        </div>
                                        <div className="vip">
                                            <div className="card vip-member">
                                                Vip
                                            </div>
                                        </div>
                                        <div className="play-icon">
                                            <i><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* End content */}

                {/* Footer */}
                <div className="footer">

                </div>
            </div>
        </div> 
    )
}

export default Home;