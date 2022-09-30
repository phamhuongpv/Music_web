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

    const [singerName, setSingerName] = useState("");
    const [image, setImage] = useState("");
    const [introduce, setIntroduce] = useState("");

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

    const dataUrl2 = [];

    function uploadFile() {
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
                addSinger()
            })
            .catch((err) => console.error(err));
    }

    function addSinger() {
        var postSinger = {
            "name": singerName,
            "image": dataUrl2[0],
        }

        axios.post('http://localhost:3004/singers', postSinger)
            .then(res => console.log(res))
            .then(() =>  window.location.reload())
    }

    function deleteSinger(index) {
        axios.delete(`http://localhost:3004/singers/${index}`)
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
                            <li className="nav-bar-item">
                                <a href="/adminsongs" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>QL bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item active">
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
                                    {`${singers.length} Ca sĩ`}
                                </div>
                                <div className="song-main__add-song" onClick={() => {
                                    const modal = $('.modal');
                                    modal.classList.add('active')
                                }}>Thêm ca sĩ mới</div>
                            </div>
                            
                            <div className="list-song">
                                {singers.map((song, index) => {
                                    return (
                                        <div className={`song-info-container w-1`} key={index} data-index = {index}>
                                            <div className="current-song-info w-4">
                                                <div className="cd">
                                                    <div className="cd-thumb cd-thumb-admin"
                                                        style={{backgroundImage: `url(${song.image})`}}>
                                                    </div>
                                                </div>
                                                <div className="song-info">
                                                    <div className="song-name">
                                                        {song.name}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="song-title w-2">
                                                {song.introduce}
                                            </div>

                                            <div className="song-admin__control-group w-4">
                                                {/* <div className="song-admin__fix">Sửa</div> */}
                                                <div className="song-admin__delete" onClick={() => deleteSinger(index + 1)}>Xóa</div>
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
                    <h3 className="add-song-heading">Thêm ca sĩ ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="singername" className="form-label">Tên ca sĩ</label>
                        <input id="singername" name="singername" type="text" className="form-control" placeholder="Nhập tên ca sĩ"
                            onChange={(event) => {setSingerName(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="introduce" className="form-label">Thông tin giới thiệu</label>
                        <input id="introduce" name="introduce" type="text" className="form-control" placeholder="Nhập thông tin giới thiệu"
                            onChange={(event) => {setIntroduce(event.target.value)}} required
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

                    <div className="form-submit" onClick={() => {
                        const modal = $('.modal');
                        modal.classList.remove('active');
                        uploadFile()
                    }}>Add singer</div>
                </div>
            </div>
        </div> 
    )
}

export default Songs;