
const PageLoading = () => {
    return (
        <div className="custom-spinner-container">
            <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default PageLoading;