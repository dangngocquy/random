function DefautlNumber() {
  const defaultNumber = Array.from({ length: 5 }, (_, index) => (
      <div
          key={index}
          className="number-box-niso"
          style={{
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }}
      >
          ?
      </div>
  ));
  return defaultNumber;
}

export default DefautlNumber;