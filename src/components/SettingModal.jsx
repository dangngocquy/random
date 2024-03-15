import React, { useState } from 'react';
import { FaImages } from "react-icons/fa";

const SettingModal = ({
    updateCustomCount,
    closeSettingModal,
    customCounts,
    handlePrizeChange,
    selectedPrize,
    secondPrizeImage,
    thirdPrizeImage,
    encouragementPrizeImage,
    handleImageUpload,
    firstPrizeImage,
    secondPrizeCount,
    setSecondPrizeCount,
    firstPrizeCount,
    setFirstPrizeCount,
    prizeNames,
    setPrizeNames,
}) => {
    const [count, setCount] = useState(customCounts["khuyến khích"] || 0);
    const [thirdPrizeCount, setThirdPrizeCount] = useState(1);

    const handleSave = () => {
        updateCustomCount("khuyến khích", count);
        updateCustomCount("nhất", firstPrizeCount);
        updateCustomCount("nhì", secondPrizeCount);
        updateCustomCount("ba", thirdPrizeCount);
        handleClose();
    };

    const handleClose = () => {
        closeSettingModal();
    };

    const handleProductNameChange = (e, prizeCategory) => {
        const value = e.target.value;
        setPrizeNames((prevNames) => ({
            ...prevNames,
            [prizeCategory]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ padding: '1.5rem', maxWidth: '450px' }}>
                <h3>Tùy chọn quay thưởng</h3>
                <select onChange={handlePrizeChange} value={selectedPrize || ""}>
                    <option value="">Vui lòng chọn giải</option>
                    <option value="nhất">Giải nhất</option>
                    <option value="nhì">Giải nhì</option>
                    <option value="ba">Giải ba</option>
                    <option value="khuyến khích">Giải khuyến khích</option>
                </select>
                <div className="setting-modal">
                    <div className='setting-niso'>
                        <label>Số lần quay cho giải nhất</label>
                        <input
                            type="number"
                            value={firstPrizeCount}
                            onChange={(e) => setFirstPrizeCount(e.target.value)}
                            placeholder='Nhập số lần...'
                        />
                    </div>
                    <div className='setting-niso'>
                        <label>Số lần quay cho giải nhì</label>
                        <input
                            type="number"
                            value={secondPrizeCount}
                            onChange={(e) => setSecondPrizeCount(e.target.value)}
                            placeholder='Nhập số lần...'
                        />
                    </div>
                    <div className='setting-niso'>
                        <label>Số lần quay cho giải ba</label>
                        <input
                            type="number"
                            value={thirdPrizeCount}
                            onChange={(e) => setThirdPrizeCount(e.target.value)}
                            placeholder='Nhập số lần...'
                        />
                    </div>
                    <div className='setting-niso'>
                        <label>Số lần quay cho giải khuyến khích</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder='Nhập số lần...'
                        />
                    </div>
                    {selectedPrize && (
                        <div className='setting-niso'>
                            <label>Nhập tên giải thưởng của {selectedPrize}</label>
                            <input
                                type="text"
                                value={prizeNames[selectedPrize]}
                                onChange={(e) => handleProductNameChange(e, selectedPrize)}
                                placeholder={`Tên giải thưởng cho giải ${selectedPrize}...`}
                            />
                        </div>
                    )}
                    <div>
                        {selectedPrize === "nhất" && (
                            <div className='flex-niso-ranking'>
                                <label className="upload-number-niso hover-menu-niso">
                                    <input type="file" onChange={(e) => handleImageUpload(e, "nhất")} />
                                    <FaImages size={21} />
                                    <span>Hình ảnh giải thưởng cho giải nhất</span>
                                </label>
                            </div>
                        )}
                        {selectedPrize === "nhì" && (
                            <div className='flex-niso-ranking'>
                                <label className="upload-number-niso hover-menu-niso">
                                    <input type="file" onChange={(e) => handleImageUpload(e, "nhì")} />
                                    <FaImages size={21} />
                                    <span>Hình ảnh giải thưởng cho giải nhì</span>
                                </label>
                            </div>
                        )}
                        {selectedPrize === "ba" && (
                            <div className='flex-niso-ranking'>
                                <label className="upload-number-niso hover-menu-niso">
                                    <input type="file" onChange={(e) => handleImageUpload(e, "ba")} />
                                    <FaImages size={21} />
                                    <span>Hình ảnh giải thưởng cho giải ba</span>
                                </label>
                            </div>
                        )}
                        {selectedPrize === "khuyến khích" && (
                            <div className='flex-niso-ranking'>
                                <label className="upload-number-niso hover-menu-niso">
                                    <input type="file" onChange={(e) => handleImageUpload(e, "khuyến khích")} />
                                    <FaImages size={21} />
                                    <span>Hình ảnh giải thưởng cho giải khuyến khích</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div>
                        {selectedPrize === "nhất" && firstPrizeImage && (
                            <img src={firstPrizeImage} alt="Giải nhất" className='rankings-niso' />
                        )}
                        {selectedPrize === "nhì" && secondPrizeImage && (
                            <img src={secondPrizeImage} alt="Giải nhì" className='rankings-niso' />
                        )}
                        {selectedPrize === "ba" && thirdPrizeImage && (
                            <img src={thirdPrizeImage} alt="Giải ba" className='rankings-niso' />
                        )}
                        {selectedPrize === "khuyến khích" && encouragementPrizeImage && (
                            <img src={encouragementPrizeImage} alt="Giải khuyến khích" className='rankings-niso' />
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: '0.5rem', float: 'left' }}>
                    <button onClick={handleSave} className='button' style={{ fontSize: '13px' }}>Lưu</button>
                    <button onClick={handleClose} className='button' style={{ fontSize: '13px' }}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
