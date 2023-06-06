const Notification = ({ type, message }) => {
    const notificationStyle =
        type === "success"
            ? "bg-green-500 text-white p-4 rounded-lg shadow-lg"
            : "bg-red-500 text-white p-4 rounded-lg shadow-lg"

    return (
        <div className={`fixed right-0 top-0 m-6 ${notificationStyle}`}>
            <p>{message}</p>
        </div>
    )
}

export default Notification
