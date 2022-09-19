
function Register() {
    return (
        <div className="mainLogin">
        <form action="" method="post" id="form1" className="form">
            <h3 className="heading">Đăng kí tài khoản</h3>
            <p className="desc">Hãy đăng kí tài khoản để nghe nhạc ❤️</p>

            <div className="tabs">
                <div className="tab">Đăng kí</div>
                <a href="/login" className="tab hide">Đăng nhập</a>
            </div>

            <div className="spacer"></div>

            <div className="form-group">
                <label for="fullName" className="form-label">Tên đầy đủ</label>
                <input id="fullName" name="fullName" type="text" className="form-control" placeholder="VD: Phạm Văn Hưởng" />
                <span className="form-message"></span>
            </div>

            <div>
                <div className="form-group">
                    <label for="email" className="form-label">Email</label>
                    <input id="email" name="email" type="text" className="form-control" placeholder="VD: email@domain.com" />
                    <span className="form-message"></span>
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label for="phone" className="form-label">Số điện thoại</label>
                    <input id="phone" name="phone" type="text" className="form-control" placeholder="VD: 0398494251" />
                    <span className="form-message"></span>
                </div>
            </div>

            <div className="form-group">
                <label for="password" className="form-label">Mật khẩu</label>
                <input id="password" name="password" type="password" className="form-control" placeholder="Nhập mật khẩu" />
                <span className="form-message"></span>
            </div>
            
            <div className="form-group">
                <label for="password_confirmation" className="form-label">Nhập lại mật khẩu</label>
                <input id="password_confirmation" name="password_confirmation" type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                <span className="form-message"></span>
            </div>
            
            {/* <div className="form-group">
                <label for="province" className="form-label">Nơi sinh sống</label>
                <select id="province" name="province" className="form-control">
                    <option value="">-- Chọn Tỉnh/TP --</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                </select>
                <span className="form-message"></span>
            </div> */}
            
            {/* <div className="form-group">
                <label for="sex" className="form-label">Giới tính</label>
                <div className="radioBox">
                    <div className="radioBox-child">
                        <input id="sex" name="sex" type="radio" value="male" className="form-control" />
                        Nam
                    </div>
                    <div className="radioBox-child">
                        <input id="sex" name="sex" type="radio" value="female" className="form-control" />
                        Nữ
                    </div>
                    <div className="radioBox-child">
                        <input id="sex" name="sex" type="radio" value="other" className="form-control" />
                        Khác
                    </div>
                </div>
                <span className="form-message"></span>
            </div> */}

            <button className="form-submit">Đăng kí</button>
        </form>
    </div>
    )
}

export default Register;