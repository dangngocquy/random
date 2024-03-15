import { useState, useEffect } from 'react';
import Notification from './Notification';
import DefautlNumber from './DefautlNumber';
import RandomNumber from './RandomNumber';

function EventHandling() {
    const storedPrizeNames = JSON.parse(localStorage.getItem('prizeNames')) || {
        nhất: '',
        nhì: '',
        ba: '',
        'khuyến khích': '',
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState({ columnARandomHistory: [], columnBRandomHistory: [], columnCRandomHistory: [] });
    const [isSpinning, setIsSpinning] = useState(false);
    const [notification, setNotification] = useState();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [columnARandomHistory, setColumnARandomHistory] = useState([]);
    const [columnBRandomHistory, setColumnBRandomHistory] = useState([]);
    const [columnCRandomHistory, setColumnCRandomHistory] = useState([]);
    const [prizeHistory, setPrizeHistory] = useState([]);
    const [selectedPrize, setSelectedPrize] = useState(null);
    const [encouragementCount, setEncouragementCount] = useState(null);
    const [secondPrizeCount, setSecondPrizeCount] = useState(1);
    const [firstPrizeCount, setFirstPrizeCount] = useState(1);
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [customEncouragementCount, setCustomEncouragementCount] = useState(5);
    const [show, setShow] = useState(false);
    const [firstPrizeImage, setFirstPrizeImage] = useState(null);
    const [secondPrizeImage, setSecondPrizeImage] = useState(null);
    const [thirdPrizeImage, setThirdPrizeImage] = useState(null);
    const [encouragementPrizeImage, setEncouragementPrizeImage] = useState(null);
    const [customCounts, setCustomCounts] = useState({ "nhất": 1, "nhì": 1, "ba": 1, });
    const [productName, setProductName] = useState('');
    const [prizeNames, setPrizeNames] = useState(storedPrizeNames);
    const [historyranking, setHistoryranking] = useState([]);
    const [inputNumber, setInputNumber] = useState([]);

    useEffect(() => {
        localStorage.setItem('prizeNames', JSON.stringify(prizeNames));
    }, [prizeNames]);


    const handleImageUpload = (e, prize) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            switch (prize) {
                case "nhất":
                    setFirstPrizeImage(reader.result);
                    break;
                case "nhì":
                    setSecondPrizeImage(reader.result);
                    break;
                case "ba":
                    setThirdPrizeImage(reader.result);
                    break;
                case "khuyến khích":
                    setEncouragementPrizeImage(reader.result);
                    break;
                default:
                    break;
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const {
        getRandomNumberFromRow,
        randomNumber,
        setRandomNumber,
        percentageForNumber,
        setPercentageForNumber,
    } = RandomNumber();

    const handingShowMenu = () => {
        setShow(!show);
    };

    const openSettingModal = () => {
        setIsSettingModalOpen(true);
    };

    const adminSettingModal = () => {
        setIsAdminModalOpen(true);
    };

    const adminClose = () => {
        setIsAdminModalOpen();
    };

    const closeSettingModal = () => {
        setIsSettingModalOpen(false);
    };

    const updateCustomCount = (prize, count) => {
        setCustomCounts(prevCounts => ({ ...prevCounts, [prize]: count }));
    };

    const handlePrizeChange = (event) => {
        setSelectedPrize(event.target.value);
    };

    const handleCustomEncouragementCountChange = (event) => {
        setCustomEncouragementCount(event.target.value);
    };

    const closeNotification = () => {
        setNotification(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleRandomize = () => {

        if (!file) {
            displayNotification("Vui lòng tải lên dữ liệu trước khi bắt đầu 'Quay' !");
            return;
        }

        if (data.length === 0) {
            setNotification(<Notification content="Không còn dữ liệu quay thưởng !" onClose={closeNotification} />)
            return;
        }

        if (!selectedPrize || selectedPrize === "") {
            displayNotification("Vui lòng chọn giải trước khi nhấn 'Quay' !");
            return;
        }

        if (selectedPrize === "khuyến khích") {
            if (encouragementCount !== 0) {
                const maxCount = customCounts[selectedPrize] || encouragementCount || Infinity;
                const currentCount = prizeHistory.filter(prize => prize === selectedPrize).length;

                if (currentCount >= maxCount) {
                    displayNotification(`Giải ${selectedPrize} đã đạt số lần quay tối đa (${maxCount}), Không thể quay !`);
                    setIsSpinning(false);
                    return;
                }
            }
        }

        // if (selectedPrize === "khuyến khích" && data.length === 0) {
        //     displayNotification("Không còn dữ liệu quay thưởng cho giải khuyến khích!");
        //     return;
        // }

        if (selectedPrize === "nhất") {
            if (firstPrizeCount !== 0) {
                const maxCount = customCounts[selectedPrize] || firstPrizeCount || Infinity;
                const currentCount = prizeHistory.filter(prize => prize === selectedPrize).length;

                if (currentCount >= maxCount) {
                    displayNotification(`Giải ${selectedPrize} đã đạt số lần quay tối đa (${maxCount}), Không thể quay !`);
                    setIsSpinning(false);
                    return;
                }
            }
        }

        if (selectedPrize === "nhì") {
            if (secondPrizeCount !== 0) {
                const maxCount = customCounts[selectedPrize] || secondPrizeCount || Infinity;
                const currentCount = prizeHistory.filter(prize => prize === selectedPrize).length;

                if (currentCount >= maxCount) {
                    displayNotification(`Giải ${selectedPrize} đã đạt số lần quay tối đa (${maxCount}), Không thể quay !`);
                    setIsSpinning(false);
                    return;
                }
            }
        }

        if (selectedPrize === "ba") {
            if (thirdPrizeImage !== 0) {
                const maxCount = customCounts[selectedPrize] || thirdPrizeImage || Infinity;
                const currentCount = prizeHistory.filter(prize => prize === selectedPrize).length;

                if (currentCount >= maxCount) {
                    displayNotification(`Giải ${selectedPrize} đã đạt số lần quay tối đa (${maxCount}), Không thể quay !`);
                    setIsSpinning(false);
                    return;
                }
            }
        }
        setIsSpinning(true);

        setTimeout(() => {
            let randomRowIndex;
            let randomRowData;
        
            if (data.length === 1) {
                randomRowIndex = 0;
                randomRowData = data[0];
            } else {
                if (randomNumber === inputNumber) {
                    randomRowIndex = Math.floor(Math.random() * data.length);
                } else {
                    randomRowIndex = randomNumber < percentageForNumber / 100
                    ? inputNumber
                    : Math.floor(Math.random() * data.length);
                }
                randomRowData = data[randomRowIndex];
            }
        
            if (!randomRowData || randomRowData.length !== 3 || randomRowData.some(value => value < 1)) {
                displayNotification("Dữ liệu không hợp lệ hoặc dưới một dữ liệu !");
                setIsSpinning(false);
                return;
            }
        
            setSelectedRowData({
                columnA: randomRowData[0],
                columnB: randomRowData[1],
                columnC: randomRowData[2],
                columnARandomHistory,
                columnBRandomHistory,
                columnCRandomHistory,
            });
        
            setRandomNumber(DefautlNumber());
            getRandomNumberFromRow(randomRowData);
        
            const updatedData = [...data];
            updatedData.splice(randomRowIndex, 1);
            setData(updatedData);
        
            setTimeout(() => {
                setIsModalOpen(true);
                setIsSpinning(false);
                setColumnARandomHistory(prevHistory => [...prevHistory, randomRowData[0]]);
                setColumnBRandomHistory(prevHistory => [...prevHistory, randomRowData[1]]);
                setColumnCRandomHistory(prevHistory => [...prevHistory, randomRowData[2]]);
                setPrizeHistory(prevHistory => [...prevHistory, selectedPrize]);
                setHistoryranking(prevHistory => [...prevHistory, selectedPrize]);
            }, 1000 * ((randomRowData[0]?.toString()?.length ?? 0) + 1));
        });
    };

    const displayNotification = (content) => {
        setNotification(<Notification content={content} onClose={closeNotification} />);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    return {
        isModalOpen,
        closeModal,
        setIsModalOpen,
        handleRandomize,
        setData,
        setFile,
        selectedRowData,
        isSpinning,
        getRandomNumberFromRow,
        DefautlNumber,
        randomNumber,
        notification,
        setNotification,
        closeNotification,
        toggleMenu,
        isMenuVisible,
        columnBRandomHistory,
        columnCRandomHistory,
        columnARandomHistory,
        handlePrizeChange,
        selectedPrize,
        updateCustomCount,
        setPrizeHistory,
        encouragementCount,
        customCounts,
        isSettingModalOpen,
        setEncouragementCount,
        openSettingModal,
        closeSettingModal,
        customEncouragementCount,
        handleCustomEncouragementCountChange,
        show,
        handingShowMenu,
        firstPrizeImage,
        secondPrizeImage,
        thirdPrizeImage,
        encouragementPrizeImage,
        handleImageUpload,
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
    };
}

export default EventHandling;
