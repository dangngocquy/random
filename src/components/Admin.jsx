import { useState } from 'react';

function Admin({
    isAdminModalOpen,
    adminClose,
    inputNumber,
    setInputNumber,
    percentageForNumber,
    setPercentageForNumber
}) {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const [formFields, setFormFields] = useState([{ number: '', percentage: '' }]);

    const addFormSection = () => {
        setFormFields([...formFields, { number: '', percentage: '' }]);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const checkPassword = () => {
        if (password === 'Niso@123') {
            setAuthenticated(true);
        } else {
            setIsWrongPassword(true);
        }
    };

    return (
        <>
            {isAdminModalOpen &&
                <div className="modal-overlay">
                    <div className="modal-content" style={{ padding: '1.5rem', maxWidth: '450px' }}>
                        {authenticated ? (
                            <div className='scroll-niso-modal'>
                                <h3>Cài đặt tỉ lệ quay số</h3>
                                {formFields.map((field, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                        <span>
                                            <p style={{ fontSize: '13px' }}>Nhập số muốn tăng tỉ lệ</p>
                                            <input
                                                type="number"
                                                className='input-admin-niso'
                                                placeholder='Nhập số...'
                                                value={inputNumber}
                                                onChange={(e) => setInputNumber(parseInt(e.target.value))}
                                            />
                                        </span>
                                        <span>
                                            <p style={{ fontSize: '13px' }}>Tỉ lệ quay số, đơn vị (%)</p>
                                            <input
                                                type="number"
                                                placeholder='Nhập tỉ lệ...'
                                                className='input-admin-niso'
                                                value={percentageForNumber}
                                                onChange={(e) => setPercentageForNumber(parseInt(e.target.value))}
                                            />
                                        </span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: '0.5rem', float: 'left' }}>
                                    <button style={{ fontSize: '13px', marginTop: '10px' }} onClick={addFormSection}>
                                        Thêm
                                    </button>
                                </div>
                            </div >
                        ) : (
                            <>
                                <h3>Cài đặt quản trị</h3>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <b style={{ fontSize: '13px', marginBottom: '5px' }}>Nhập mật khẩu để tiếp tục</b>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <input
                                            type="password"
                                            placeholder="Nhập mật khẩu..."
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className='input-admin-niso'
                                        />
                                        <button onClick={checkPassword} style={{ fontSize: '13px' }}>Xác thực</button>
                                    </div>
                                    <p style={{ fontSize: '13px' }}>{isWrongPassword && <span style={{ color: 'red' }}>Sai mật khẩu! Vui lòng thử lại.</span>}</p>
                                </span>
                            </>
                        )}
                        <button onClick={adminClose} style={{ fontSize: '13px' }}>Đóng</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Admin;
