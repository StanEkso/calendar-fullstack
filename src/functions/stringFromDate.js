export default (date) => {
    const months = [
        '','января', 'февраля','марта','мая','июня','июля','августа','сентября','октрября','ноября','декабря'
    ]
    let time = ''
    if (date.getHours() >= 10) time+=date.getHours();
    else time+='0' + date.getHours();
    time+=':';
    time+=date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    const datestring = date.getDate() + ' ' + months[date.getMonth()] + ", " + date.getFullYear();
    return {datestring, time};
}