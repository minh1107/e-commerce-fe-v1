import icons from "../utils/icons";

const {  BsStarHalf, BsStarFill, BsStar } = icons

export const createSlug = string => string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-') 

export const formatMoney = number => {
    if (typeof Intl === "undefined" || !Intl.NumberFormat) {
        alert("This browser doesn't support Intl.NumberFormat");
    } else {
        const nFormat = new Intl.NumberFormat();
        return nFormat.format(number);
    }
}

export const ratingStar = (number, size) => {
    const star = []
    for (let index = 0; index < number; index++) {star.push(<BsStarFill size={size} key={index} color="orange"/>)}
    for (let index = 5; index > number; index--) {star.push(<BsStar size={size} key={index} color="orange"/>)}
    return star
}