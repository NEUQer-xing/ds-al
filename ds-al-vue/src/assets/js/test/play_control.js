// start 播放控制
import {ref} from 'vue'
const speed = ref(50); // 播放速度
const play = ref(false); // 播放状态
export function speed_func_control(play_speed) {
    speed.value = play_speed.value;
    alert('当前播放的速度为:' + speed.value);
    alert(s_succ);
    return speed;
}

export function play_func_control(play_or_hold) {
    play.value = play_or_hold.value;
    console.log(play.value);
    if (play.value) {
        clear_canvas();
        test_canvas();
    }
    return play;
}
// end 播放控制

function test_canvas() {
    var canvas = document.getElementById("drawing");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 55, 50);
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 55, 50);
    }
}
function clear_canvas() {
    var canvas = document.getElementById("drawing");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
    }
}