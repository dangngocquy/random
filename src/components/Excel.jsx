import React, { useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { FaUpload } from 'react-icons/fa';
import EventHandling from './EventHandling';
import { IoIosSettings } from "react-icons/io";
import { GrSettingsOption } from "react-icons/gr";
import { TbMenuOrder } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import baolixi from '../assets/baolixi.png';
import phaohoa from '../assets/phaohoa.webp';
import Notification from './Notification';
import History from './History';
import SettingModal from './SettingModal';
import Admin from './Admin';

const ExcelUploader = () => {

    const {
        isModalOpen,
        closeModal,
        handleRandomize,
        setFile,
        setData,
        selectedRowData,
        isSpinning,
        randomNumber,
        notification,
        setNotification,
        closeNotification,
        columnARandomHistory,
        toggleMenu,
        isMenuVisible,
        columnBRandomHistory,
        columnCRandomHistory,
        handlePrizeChange,
        updateCustomCount,
        selectedPrize,
        isSettingModalOpen,
        openSettingModal,
        customCounts,
        closeSettingModal,
        show,
        handingShowMenu,
        secondPrizeImage,
        thirdPrizeImage,
        encouragementPrizeImage,
        handleImageUpload,
        firstPrizeImage,
        secondPrizeCount,
        setSecondPrizeCount,
        firstPrizeCount,
        setFirstPrizeCount,
        handleProductNameChange,
        productName,
        prizeNames,
        setPrizeNames,
        historyranking,
        adminSettingModal,
        isAdminModalOpen,
        adminClose,
        percentageForNumber,
        setPercentageForNumber,
        inputNumber,
        setInputNumber,
    } = EventHandling();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || (!selectedFile.name.endsWith('.xls') && !selectedFile.name.endsWith('.xlsx'))) {
            setNotification(<Notification content="Chỉ được tải lên dữ liệu bằng file excel !" onClose={closeNotification} />)
            return;
        }
        setFile(selectedFile);
        setNotification(<Notification content="Tải lên thành công !" onClose={closeNotification} />)
        handingShowMenu();
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setData(sheetData);
        };
        reader.readAsBinaryString(selectedFile);
    };

    const handleKeyPress = useCallback((event) => {
        if (!isModalOpen && !isSpinning && (event.key === 'Enter' || event.type === 'click')) {
            handleRandomize();
        } else {
            closeModal();
        }
    }, [isModalOpen, handleRandomize, closeModal, isSpinning]);
    
    const handleMouseClick = useCallback(() => {
        if (isModalOpen) {
            closeModal();
        }
    }, [isModalOpen, closeModal,]);
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('click', handleMouseClick);
    
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('click', handleMouseClick);
        };
    }, [handleKeyPress, handleMouseClick]);
    return (
        <>
            <History columnARandomHistory={columnARandomHistory}
                toggleMenu={toggleMenu}
                isMenuVisible={isMenuVisible}
                columnBRandomHistory={columnBRandomHistory}
                columnCRandomHistory={columnCRandomHistory}
                selectedPrize={selectedPrize}
                historyranking={historyranking}
            />
            {
                show ?
                    <>
                        <IoClose onClick={handingShowMenu} className="file-niso" style={{ background: 'none', boxShadow: 'none', color: '#d70018' }} />
                    </> :
                    <>
                        <TbMenuOrder onClick={handingShowMenu} className="file-niso" />
                    </>
            }
            <div className="flex-all-niso">
                <div className="random-box-niso">{randomNumber}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10rem' }}>
                    {(firstPrizeImage || secondPrizeImage || thirdPrizeImage || encouragementPrizeImage) &&
                        <div style={{ display: 'flex', position: 'absolute', right: '-29.4rem', top: '-278px' }}>
                            <div className='gift-container-niso'>
                                <div className='gift-niso'>
                                    {selectedPrize === "nhất" && firstPrizeImage && (
                                        <img src={firstPrizeImage} alt="Giải nhất" className='image-rank-niso' />
                                    )}
                                    {selectedPrize === "nhì" && secondPrizeImage && (
                                        <img src={secondPrizeImage} alt="Giải nhì" className='image-rank-niso' />
                                    )}
                                    {selectedPrize === "ba" && thirdPrizeImage && (
                                        <img src={thirdPrizeImage} alt="Giải ba" className='image-rank-niso' />
                                    )}
                                    {selectedPrize === "khuyến khích" && encouragementPrizeImage && (
                                        <img src={encouragementPrizeImage} alt="Giải khuyến khích" className='image-rank-niso' />
                                    )}
                                    <h1 style={{ textTransform: 'uppercase' }} className='niso-text-gift'>{prizeNames[selectedPrize]}</h1>
                                </div>
                            </div>
                        </div>
                    }
                    {isSpinning ?
                        <button
                            className="background-btn-niso"
                            disabled={isSpinning}
                        >
                            Waiting...
                        </button>
                        :
                        <button
                            onClick={handleKeyPress}
                            className="background-btn-niso"
                        >
                            Quay
                        </button>
                    }
                </div>
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <img src={baolixi} alt="Lì xì" className='tet-niso' />
                            <img src={baolixi} alt="Lì xì" className='tet-niso2' />
                            <img src={phaohoa} alt="Pháo hoa" className='flower-niso' />
                            <img src={phaohoa} alt="Pháo hoa" className='flower-niso2' />
                            {selectedRowData && (
                                <h1>
                                    <p>
                                        Chúc mừng quý khách có tên{' '}
                                        <span style={{ color: '#d70018', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            {selectedRowData.columnB}
                                        </span>
                                        {' '} tại phòng ban{' '}
                                        <span style={{ color: '#d70018', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            {selectedRowData.columnC}
                                        </span>,
                                        <br />
                                        {' '} có mã số{' '}
                                        <span style={{ color: '#d70018', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            {selectedRowData.columnA}
                                        </span>
                                        {' '} đã trúng thưởng{' '}
                                        <span style={{ color: '#d70018', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            giải {selectedPrize}
                                        </span>
                                    </p>
                                </h1>
                            )}
                            <button onClick={handleMouseClick}>Xác nhận</button>
                        </div>
                    </div>
                )}
                {show && (
                    <div className='niso-overlay-menu' >
                        <div className='box-menu-show-setting-upload-niso'>

                            <label className='upload-number-niso hover-menu-niso'>
                                <input type="file" onChange={handleFileChange} />
                                <FaUpload size={18} />
                                <span>Tải lên dữ liệu quay thưởng</span>
                            </label>
                            <span onClick={openSettingModal} className='hover-menu-niso' >
                                <GrSettingsOption size={26} />
                                <span>Tùy chọn</span>
                            </span>
                            <span onClick={adminSettingModal} className='hover-menu-niso' >
                                <IoIosSettings size={26} />
                                <span>Cài đặt quản trị</span>
                            </span>
                        </div>
                    </div>
                )}
                {notification}
                <Admin
                    isAdminModalOpen={isAdminModalOpen}
                    adminClose={adminClose}
                    percentageForNumber={percentageForNumber}
                    setPercentageForNumber={setPercentageForNumber}
                    inputNumber={inputNumber}
                    setInputNumber={setInputNumber}
                />
                {isSettingModalOpen &&
                    <SettingModal
                        closeSettingModal={closeSettingModal}
                        updateCustomCount={updateCustomCount}
                        customCounts={customCounts}
                        handlePrizeChange={handlePrizeChange}
                        secondPrizeImage={secondPrizeImage}
                        thirdPrizeImage={thirdPrizeImage}
                        encouragementPrizeImage={encouragementPrizeImage}
                        handleImageUpload={handleImageUpload}
                        firstPrizeImage={firstPrizeImage}
                        selectedPrize={selectedPrize}
                        secondPrizeCount={secondPrizeCount}
                        setSecondPrizeCount={setSecondPrizeCount}
                        firstPrizeCount={firstPrizeCount}
                        setFirstPrizeCount={setFirstPrizeCount}
                        handingShowMenu={handingShowMenu}
                        handleProductNameChange={handleProductNameChange}
                        productName={productName}
                        prizeNames={prizeNames}
                        setPrizeNames={setPrizeNames}
                    />
                }
            </div>
        </>
    );
};

export default ExcelUploader;
