const PayForm = () => {
    return (
        <div>
            <label htmlFor="card-number">Номер карты:</label>
            <input type="text" id="card-number" name="card-number" />
            <label htmlFor="expire">Срок действия:</label>
            <input type="text" id="expire" name="expire" />
        </div>
    )
}

export default PayForm;