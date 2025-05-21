const AdressForm = () => {
    return (
        <div>
            <label htmlFor="city">Город:</label>
            <input type="text" id="city" name="city" />
            <label htmlFor="street">Улица:</label>
            <input type="text" id="street" name="street" />
            <label htmlFor="house">Дом:</label>
            <input type="text" id="house" name="house" />
        </div>
    )
}
export default AdressForm;