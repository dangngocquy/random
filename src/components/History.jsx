import { GiTrophyCup } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function History({
    columnARandomHistory,
    toggleMenu,
    isMenuVisible,
    columnBRandomHistory,
    columnCRandomHistory,
    historyranking,
}) {

    const [displayedData, setDisplayedData] = useState(5);
    const handleLoadMore = () => {
        setDisplayedData(displayedData + 5);
    };

    return (
        <>
            {isMenuVisible ? <IoClose onClick={toggleMenu} className='icon-history-niso' size={43} /> : <GiTrophyCup onClick={toggleMenu} className='icon-history-niso' size={43} />}
            <div>
                <div className={`menu ${isMenuVisible ? 'visible' : ''}`}>
                    <h2>Lịch sử quay thưởng</h2>
                    {columnARandomHistory.length > 0 ? (
                        <>
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Số vừa quay</th>
                                        <th>Họ tên</th>
                                        <th>Phòng ban</th>
                                        <th>Giải thưởng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {columnARandomHistory.slice(0, displayedData).map((columnAValue, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{columnAValue}</td>
                                            <td>{columnBRandomHistory[index]}</td>
                                            <td>{columnCRandomHistory[index]}</td>
                                            <td>Giải {historyranking[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {columnARandomHistory.length > displayedData && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                    <p onClick={handleLoadMore} className="next-niso">Xem thêm</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Số vừa quay</th>
                                        <th>Họ tên</th>
                                        <th>Phòng ban</th>
                                        <th>Giải thưởng</th>
                                    </tr>
                                </thead>
                            </table>
                            <span>Không có lịch sử quay thưởng !</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default History;
