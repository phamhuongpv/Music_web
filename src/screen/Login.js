import "./login.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const userData = [];
    const navigate = useNavigate();

    const loginFunction = () => {
		let isCheck = true;
		var postIt = {
            "email": email,
            "password": password,
        }

		if (email) {
			if ( (email == "") && (email != "admin")) {
				alert("Email không được để trống");
				isCheck = false;
			} else if (!isEmail(email) && (email != "admin")) {
				alert("Email không đúng định dạng");
				isCheck = false;
			}
			if (password == '') {
				alert("Password không được để trống");
				isCheck = false;
			}
			postIt = {
				email: email,
				password: password
			}
		}
		
		if(isCheck == true) {
			axios.get(`http://localhost:3004/users?email=${email}&password=${password}`)
			.then(res => {
				if(userData) {userData.shift();}
				userData.push(res.data);
			})
			setTimeout(isLogin, 1000);
		}
	}

    const isLogin = () => {
		if(userData[0].status == "Error") {alert("Thông tin đăng nhập không chính xác");} else {
			const setJsonData=JSON.stringify(userData[0]);
			localStorage.setItem('user', setJsonData);
			checkLogin();
        }

	}

	function isEmail(email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	}

	const checkLogin = () => {
        const dataLocal = localStorage.getItem('user');
        const userLocal  = JSON.parse(dataLocal);
        if(userLocal[0].role == "user") { navigate("/homeUser", { replace: true }); }
        if(userLocal[0].role == "admin") { navigate("/adminsongs", { replace: true }); }
    }

    return (
        <div className="mainLogin">
            <form action="" method="post" id="form1" className="form">
                <h3 className="heading">Đăng nhập</h3>
                <p className="desc">Hãy đăng nhập tài khoản để nghe nhạc ❤️</p>

                <div className="tabs">
                    <div className="tab">Đăng nhập</div>
                    <a href="/register" className="tab hide">Đăng kí</a>
                </div>

                <div className="spacer"></div>

                <div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" name="email" type="text" className="form-control" placeholder="Nhập email"  onChange={(event) => {setEmail(event.target.value)}} required/>
                        <span className="form-message"></span>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input id="password" name="password" type="password" className="form-control" placeholder="Nhập mật khẩu" onChange={(event) => {setPassword(event.target.value)}} required/>
                    <span className="form-message"></span>
                </div>

                <div className="form-submit" onClick={loginFunction}>Đăng nhập</div>
            </form>
        </div>
    )
}

export default Login;