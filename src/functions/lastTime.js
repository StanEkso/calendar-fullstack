export default (diff) => {
    let difst = ''
    if (diff > 0) {
        diff = Math.floor(diff/1000);
        difst += Math.floor(diff / 86400) > 0 ? `${Math.floor(diff / 86400)} д.` : '';
        diff = diff % 86400;
        difst += Math.floor(diff / 3600) > 0 ? ` ${Math.floor(diff/3600)} ч.` : '';
        diff = diff % 3600;
        difst +=Math.floor(diff / 60) > 0 ? ` ${Math.floor(diff/60)} м.` : '';
    }
    return difst
}