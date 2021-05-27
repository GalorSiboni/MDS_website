const TimeLeftToDeliverCalculator = (delivery) => {
    const receivedTime = delivery.receivedTime.split(" ")
    const doTime = delivery.doTime

    const hAndM = receivedTime[1].split(":")
    const timeToDeliver = addMinutes(hAndM[0] + ":" + hAndM[1], doTime)
    var currentdate = new Date();
    let dif = (((timeToDeliver.split(":")[0] * 60 * 60) + timeToDeliver.split(":")[1] * 60) - ((currentdate.getHours() * 60 * 60) + currentdate.getMinutes() * 60))/3600
    if (((timeToDeliver.split(":")[0] * 60 * 60) + timeToDeliver.split(":")[1] * 60) > ((currentdate.getHours()* 60 * 60) + currentdate.getMinutes() * 60))
        return dif.toFixed(0)
    else {
        dif = (((currentdate.getHours() * 60 * 60) + currentdate.getMinutes() * 60) - ((timeToDeliver.split(":")[0] * 60 * 60) + timeToDeliver.split(":")[1] * 60))/60
        return "-" + dif.toFixed(0)
    }
}
export default TimeLeftToDeliverCalculator

function addMinutes(time, minsToAdd) {
    function D(J){ return (J<10? '0':'') + J;};
    var piece = time.split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;

    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);
}