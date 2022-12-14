import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function HomeUser() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const navigate = useNavigate();
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
    const [albums, setAlbums] = useState("");
    const [singers, setSingers] = useState("");
    const [top100, setTop100] = useState("");

    const [searchKey, setSearchKey] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isplaying, setIsplaying] = useState(false);

    function handelSearch() {
        const setJsonData=JSON.stringify(searchKey);
		localStorage.setItem('search', setJsonData);
        navigate("/search", { replace: true });
    }

    useEffect(() => {
        fetch("http://localhost:3004/songs")
        .then(res => res.json())
        .then(data =>{
            setSongs(data);
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:3004/albums")
        .then(res => res.json())
        .then(data =>{
            setAlbums(data);
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:3004/singers")
        .then(res => res.json())
        .then(data =>{
            setSingers(data);
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:3004/top100")
        .then(res => res.json())
        .then(data =>{
            setTop100(data);
        })
    },[])

    // X??? l?? khi b???m play
    function playSong() {
        if(isplaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    // X??? l?? next b??i
    function nextSong() {
        setCurrentIndex(currentIndex + 1)
    }

    // X??? l?? prev b??i
    function prevSong() {
        setCurrentIndex(currentIndex - 1)
    }
    
    // X??? l?? khi ??ang play
    function audioPlay() {
        setIsplaying(true);
        currentSong.classList.add('playing');
    }

    // X??? l?? khi ti???n ????? b??i h??t thay ?????i
    function onTimeUpdate() {
        if(audio.duration) {
           const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
           progress.value = progressPercent;
        }
    }

    // X??? l?? khi tua
    function onChangeCurentTime(e) {
        const seekTime = Math.floor(e.target.value * audio.duration / 100);
        audio.currentTime = seekTime;
    }

    // X??? l?? khi ??ang pause
    function audioPause() {
        setIsplaying(false);
        currentSong.classList.remove('playing');
    }

    // Ch???n b??i h??t
    function choeseSong(index) {
        setCurrentIndex(index)
    }

    // X??? l?? ch???n album
    function handelAlbum(index) {
        const setJsonData=JSON.stringify(index + 1);
		localStorage.setItem('albumChoose', setJsonData);

        navigate("/albuminfo", { replace: true });
    }

    //X??? l?? ch???n ca s??
    function handelSinger(index) {
        const setJsonData=JSON.stringify(index + 1);
		localStorage.setItem('singerChoose', setJsonData);

        navigate("/singerinfo", { replace: true });
    }

    if(songs.length != 0 && albums.length != 0 && singers.length != 0 && top100.length != 0) return (
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
                            <i onClick={() => handelSearch()}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                            <div className="search-content">
                                <input className="search-input" type="text" placeholder="Nh???p t??n b??i h??t c???n t??m ki???m..."
                                    onChange={(e) => setSearchKey(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Login Register */}
                    <div className="header-user_name">
                        {userLocal[0].name}
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
                                <a href="/homeUser" className="title">
                                    <i><FontAwesomeIcon icon={faCompass}></FontAwesomeIcon></i>
                                    <span>kh??m ph??</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/songs" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>B??i h??t</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/singer" className="title">
                                    <i><FontAwesomeIcon icon={faClipboardUser}></FontAwesomeIcon></i>
                                    <span>Ca s??</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/albums" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>Album</span>
                                </a>
                            </li>
                            {/* <li className="nav-bar-item">
                                <a href="/top100" className="title">
                                    <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                    <span>Top 100</span>
                                </a>
                            </li> */}
                        </div>
                    </div>

                    {/* Div line */}
                    <div className="side-line-wrapper">
                        <div className="side-line"></div>
                    </div>

                    {/* User nav bar */}
                    <div className="side-bar-user">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <a href="/userInfo" className="title">
                                    <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
                                    <span>C?? nh??n</span>
                                </a>
                            </li>
                        </div>
                    </div>

                    {/* Register vip*/}
                    <div className="side-bar__vip">
                        <div className="vip-container">
                            {userLocal[0].level == 'vip'? 'Th??nh vi??n':'Nghe kho nh???c'}
                            <br/>
                            vip
                            <div 
                                className={`vip-register-btn ${userLocal[0].level == 'vip'? 'none':''}`}
                                onClick={() => navigate("/registerVip", { replace: true })}
                            >????ng k??</div>
                        </div>
                    </div>

                    {/* Log out */}
                    <div className="log-out">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <Link to="/" className="title">
                                    <i><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></i>
                                    <span>????ng xu???t</span>
                                </Link>
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
                        <div className="current-song-info w-3">
                            <div className="cd">
                                <div className="cd-thumb" style={{backgroundImage: `url(${songs[currentIndex].image})`}}>
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
                        <div className="current-song-control w-3">
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
                                src={songs[currentIndex].path}></audio>
                        </div>

                        {/* Song setting */}
                        <div className="current-song-setting w-3">
                            <div className="current-song-volume">
                                <div className="volume-icon low">
                                    <i className="volume-mute"><FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon></i>
                                    <i className="volume-low"><FontAwesomeIcon icon={faVolumeLow}></FontAwesomeIcon></i>
                                    <i className="volume-hight"><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></i>
                                </div>
                                <input id="progress-volume" className="progress" type="range" defaultValue="50" step="1" min="0" max="100"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End current song */}

                {/* Main */}
                <div className="main">
                    <div className="home-main">
                        {/* List album */}
                        <div className="home-album">
                            <div className="title-wrap">
                                <div className="title">
                                    G???i ?? h??m nay
                                </div>
                            </div>

                            <div className="list-album">
                                {albums.slice(0, 5).map((album, index) => {
                                    return (
                                        <div className="album-container w-5">
                                            <a href="#" className="home-album-image"
                                                style={{backgroundImage: `url(${album.image})`}}
                                                onClick={() => handelAlbum(index)}
                                            >
                                            </a>
                                            <div className="home-album-name">
                                                {album.name}
                                            </div>
                                            <div className="home-album-introduce">
                                                {album.introduce}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* List song */}
                        <div className="home-song">
                            <div className="title-wrap">
                                <div className="title">
                                    B??i h??t n???i b???t
                                </div>
                                <a href="/songs">
                                    Xem t???t c???
                                    <i><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></i>
                                </a>
                            </div>
                            
                            <div className="list-song">
                                {songs.slice(0, 9).map((song, index) => {
                                    return (
                                        <div className={`song-info-container ${currentIndex == index ? 'active': ''} w-3`} key={index} data-index = {index}>
                                            <div className="current-song-info">
                                                <div className="cd" onClick={() => {
                                                        if(userLocal[0].level != 'vip' && song.vip == 'Vip') {
                                                            alert('B??i n??y c???n m???t ph?? ????? nghe b???m oke ????? chuy???n sang trang ????ng k?? th??nh vi??n vip')
                                                            navigate("/registerVip", { replace: true });
                                                        }
                                                        else {
                                                            choeseSong(index)
                                                        }
                                                    }}>
                                                    <div className="cd-thumb"
                                                        style={{backgroundImage: `url(${song.image})`}}>
                                                    </div>
                                                </div>
                                                <div className="song-info">
                                                    <div className="song-name">
                                                        {song.name}
                                                        <span className={`card ${song.vip == "Vip"?'vip-member':'normal-member'}`}>
                                                            {`${song.vip == "Vip"? 'Vip': ''}`}
                                                        </span>
                                                    </div>
                                                    <div className="singger-name">
                                                        {singers[song.singgerId - 1].name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* List singer */}
                        <div className="home-singer">
                            <div className="title-wrap">
                                <div className="title">
                                    Ca s??
                                </div>
                                <a href="singer">
                                    Xem t???t c???
                                    <i><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></i>
                                </a>
                            </div>
                            <div className="list-singer">
                                {singers.slice(0, 5).map((singer, index) => {
                                    return (
                                        <div className="singer-container w-5">
                                            <a href="#" className="home-singer-image"
                                                style={{backgroundImage: `url(${singer.image})`}}
                                                onClick={() => handelSinger(index)}
                                            >
                                            </a>
                                            <div className="home-singer-name">
                                                {singer.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* List top100 */}
                        {/* <div className="home-top100">
                            <div className="title-wrap">
                                <div className="title">
                                    Top 100
                                </div>
                                <a href="/top100">
                                    Xem t???t c???
                                    <i><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></i>
                                </a>
                            </div>

                            <div className="list-top100">
                                {top100.slice(0, 5).map((top, index) => {
                                    return (
                                        <div className="top100-container w-5">
                                            <a href="#" className="home-top100-image"
                                                style={{backgroundImage: `url(${top.image})`}}>
                                            </a>
                                            <div className="home-top100-name">
                                                {top.name}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> */}
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

export default HomeUser;