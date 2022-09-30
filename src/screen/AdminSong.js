import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Songs() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const modalOverlay = $('.modal__overlay')

    const [songs, setSongs] = useState("");
    const [singers, setSingers] = useState("");

    const [songName, setSongName] = useState("");
    const [singgerId, setSinggerId] = useState("");
    const [image, setImage] = useState("");
    const [path, setPath] = useState("");
    const [vip, setVip] = useState("Normal");

    useEffect(() => {
        fetch("http://localhost:3004/songs")
        .then(res => res.json())
        .then(data =>{
            setSongs(data);
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:3004/singers")
        .then(res => res.json())
        .then(data =>{
            setSingers(data);
        })
    },[])

    const dataUrl = [];
    const dataUrl2 = [];

    function uploadFile() {
        const formData = new FormData();
        formData.append("file", path);
        formData.append("upload_preset", "project2");
        // Tải ảnh lên cloudinary
        // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
        axios
            .post("https://api.cloudinary.com/v1_1/huong-pham-van/video/upload", formData)
            .then((response) => {
                dataUrl.push(response.data.url)
                console.log(dataUrl)
                addSong()
            })
            .catch((err) => console.error(err));
        
        const formData2 = new FormData();
        formData2.append("file", image);
        formData2.append("upload_preset", "project2");
        // Tải ảnh lên cloudinary
        // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
        axios
            .post("https://api.cloudinary.com/v1_1/huong-pham-van/image/upload", formData2)
            .then((response) => {
                dataUrl2.push(response.data.url)
                console.log(dataUrl2)
            })
            .catch((err) => console.error(err));
    }

    function addSong() {
        var postSong = {
            "name": songName,
            "singgerId": singgerId,
            "path": dataUrl[0],
            "image": dataUrl2[0],
            "vip": vip
        }

        axios.post('http://localhost:3004/songs', postSong)
            .then(res => console.log(res))
            .then(() =>  window.location.reload())
    }

    function deleteSong(index) {
        axios.delete(`http://localhost:3004/songs/${index}`)
            .then(res => console.log(res))

        window.location.reload();
    }

    if(songs.length != 0 && singers.length != 0) return (
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
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..." />
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
                                <a href="/adminsongs" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>QL bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/adminsinger" className="title">
                                    <i><FontAwesomeIcon icon={faClipboardUser}></FontAwesomeIcon></i>
                                    <span>QL ca sĩ</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/adminalbum" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>QL album</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/adminuser" className="title">
                                    <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
                                    <span>QL User</span>
                                </a>
                            </li>
                        </div>
                    </div>

                    {/* Log out */}
                    <div className="log-out">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <Link to="/" className="title">
                                    <i><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></i>
                                    <span>Đăng xuất</span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
                </div>
                {/* End side bar */}

                {/* Main */}
                <div className="main">
                    <div className="home-main">
                        {/* List song */}
                        <div className="home-song">
                            <div className="title-wrap">
                                <div className="title">
                                    {`${songs.length} Bài hát`}
                                </div>
                                <div className="song-main__add-song" onClick={() => {
                                    const modal = $('.modal');
                                    modal.classList.add('active')
                                }}>Thêm bài hát mới</div>
                            </div>
                            
                            <div className="list-song">
                                {songs.map((song, index) => {
                                    return (
                                        <div className={`song-info-container w-1`} key={index} data-index = {index}>
                                            <div className="current-song-info w-3">
                                                <div className="cd">
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

                                            <div className="song-title w-3">
                                                {song.name}
                                            </div>

                                            <div className="song-admin__control-group">
                                                {/* <div className="song-admin__fix">Sửa</div> */}
                                                <div className="song-admin__delete" onClick={() => deleteSong(index + 1)}>Xóa</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* End content */}

                {/* Footer */}
                <div className="footer">

                </div>
            </div>

            {/* Modal add song */}
            <div className="modal">
                <div className="modal__overlay" onClick={() => {
                    const modal = $('.modal');
                    modal.classList.remove('active')
                }}></div>
                <div className="modal__body">
                    <h3 className="add-song-heading">Tạo bài hát ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="songName" className="form-label">Tên bài hát</label>
                        <input id="songName" name="songName" type="text" className="form-control" placeholder="Nhập tên bài hát"
                            onChange={(event) => {setSongName(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Ca sĩ</label>
                        <select id="category" name="category" className="form-control"
                            onChange={(event) => {setSinggerId(event.target.value)}} required
                        >
                            <option value="">-- Ca sĩ --</option>
                            {singers.map((singer, index) => {
                                return (
                                    <option value={singer.id}>{singer.name}</option>
                                )
                            })}
                        </select>
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="path" className="form-label">File bài hát</label>
                        <input id="path" name="path" type="file" accept="video/mp3" className="custom-file-input"
                            onChange={(event) => setPath(event.target.files[0])}
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="img" className="form-label">Hình ảnh</label>
                        <input id="img" name="img" type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input"
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                        <span className="form-message"></span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="vip" className="form-label">Vip</label>
                        <div className="radioBox">
                            <div className="radioBox-child">
                                <input id="vip" name="vip" type="checkbox" value="Vip" className="form-control"
                                    onChange={(event) => {setVip(event.target.value)}} required
                                />
                                Vip
                            </div>
                        </div>
                        <span className="form-message"></span>
                    </div>

                    <div className="form-submit" onClick={() => {
                        const modal = $('.modal');
                        modal.classList.remove('active');
                        uploadFile()
                    }}>Add song</div>
                </div>
            </div>
        </div> 
    )
}

export default Songs;