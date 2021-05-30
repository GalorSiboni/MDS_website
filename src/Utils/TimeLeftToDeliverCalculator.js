const TimeLeftToDeliverCalculator = (delivery) => {
    const [day, month, year_rest] = delivery.receivedTime.split("-");
    const year = year_rest.split(" ")[0]
    const [hour, min, sec] = year_rest.split(" ")[1].split(":")
    const receivedTime = new Date(year,month,day,hour,min,sec,0);
    console.log(receivedTime)

    receivedTime.setMinutes(receivedTime.getMinutes() + delivery.doTime);
    console.log(receivedTime)
    const now = new Date();
    console.log("now: " + now)

    if (receivedTime.getDate() > now.getDate()){
        receivedTime.setHours(receivedTime.getHours() - now.getHours())
        receivedTime.setMinutes(receivedTime.getMinutes() - now.getMinutes())
        return receivedTime.getHours() + ":" + receivedTime.getMinutes();
    }
    else {
        receivedTime.setHours( now.getHours() - receivedTime.getHours())
        receivedTime.setMinutes( now.getMinutes() - receivedTime.getMinutes())
        return "-" + receivedTime.getHours() + ":" + receivedTime.getMinutes();
    }

    console.log(receivedTime)

    console.log("before: " + delivery.receivedTime + ", " + "after: " + receivedTime)

    return receivedTime.getHours() + ":" + receivedTime.getMinutes();
}
export default TimeLeftToDeliverCalculator

function addMinutes(time, minsToAdd) {
    function D(J){ return (J<10? '0':'') + J;};
    var piece = time.split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;

    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);
}