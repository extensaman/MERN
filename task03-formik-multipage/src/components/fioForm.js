const FioForm = () => {
    return (
        <div>
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="surname">Фамилия:</label>
            <input type="text" id="surname" name="surname" />
        </div>
    )
}

export default FioForm;