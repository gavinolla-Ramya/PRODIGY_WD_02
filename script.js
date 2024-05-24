const display = document.getElementById("display");
const lapsContainer = document.createElement('div');
lapsContainer.id = 'laps';
document.getElementById("container").appendChild(lapsContainer);

let timer = null;
let startTime=0;
let elapsedTime =0;
let isRunning = false;
let laps =[];
function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update,10);
        isRunning = true;
    }
   

}
function stop(){
    if (isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = true;
    }

}
function reset(){
    clearInterval(timer);
    startTime=0;
    elapsedTime =0;
    isRunning = false;
    display.textContent ="00:00:00:00";
    laps = [];
    updateLaps();

}
function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime/(1000*60*60));
    let minutes = Math.floor(elapsedTime/(1000*60)%60);
    let seconds = Math.floor(elapsedTime/1000%60);
    let milliseconds = Math.floor(elapsedTime%1000 /10);
    hours= String(hours).padStart(2,"0");
    minutes= String(minutes).padStart(2,"0");
    seconds= String(seconds).padStart(2,"0");
    milliseconds= String(milliseconds).padStart(2,"0");
    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
function lap() {
    if (isRunning) {
        const currentTime = display.textContent;
        laps.push(currentTime);
        updateLaps();
    }
}
function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    });
}