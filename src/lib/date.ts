const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const datec = `${year}-${month}-${day}`;
    return datec
};

export { getCurrentDate };
