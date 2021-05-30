const TimeLeftToDeliverCalculator = (delivery) => {
    const [day, month, year_rest] = delivery.receivedTime.split("-");
    const year = year_rest.split(" ")[0]
    const [hour, min, sec] = year_rest.split(" ")[1].split(":")
    const receivedTime = new Date(year,month,day,hour,min,sec,0);

    receivedTime.setMinutes(receivedTime.getMinutes() + delivery.doTime);
    const now = new Date();

    if (receivedTime.getDate() > now.getDate()){
        receivedTime.setHours(receivedTime.getHours() - now.getHours())
        receivedTime.setMinutes(receivedTime.getMinutes() - now.getMinutes())
        return "נותרו"+ receivedTime.getHours() + " שעות ו- " + receivedTime.getMinutes() + " דקות";
    }
    else {
        receivedTime.setHours( now.getHours() - receivedTime.getHours())
        receivedTime.setMinutes( now.getMinutes() - receivedTime.getMinutes())
        return "באיחור של "+ receivedTime.getHours() + " שעות ו- " + receivedTime.getMinutes() + " דקות";
    }
}
export default TimeLeftToDeliverCalculator
