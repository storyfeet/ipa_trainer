
let streak = 0;
let max_streak = 0;
let music_list = {};
function play_sound(name){
    if (music_list[name]) {
        music_list[name].play;
    }
    const music = new Audio(`${baseurl}/assets/sounds/${name}.mp3`);
    music_list[name] = music;
    music.play();
}

function set_streak(n){
    if (n === undefined ) n = streak +1;
    streak = n;
    max_streak = Math.max(streak,max_streak);
    document.getElementsByClassName("streak")[0].innerHTML=`Streak = ${streak}`;
    document.getElementsByClassName("max-streak")[0].innerHTML=`Max = ${max_streak}`;

}


function correct(ans){
    set_streak();
    let qbox = document.getElementsByClassName("quiz")[0];
    qbox.innerHTML = "" ;
    show_correct(ans,qbox);
}
   

function show_correct(ans,qbox){
    play_sound(ans.sound);
    let cbutton = document.createElement("Button");
    cbutton.classList.add("correct");
    cbutton.textContent=ans.c;
    cbutton.onclick =()=>play_sound(ans.sound);
    qbox.appendChild(cbutton);

    let ctext = document.createElement("text");
    ctext.innerHTML=ans.sound;
    qbox.appendChild(ctext);
    
}
function incorrect(ans,guess){
    set_streak(0);
    let qbox = document.getElementsByClassName("quiz")[0];
    qbox.innerHTML="";

    let ibutton = document.createElement("Button");
    ibutton.classList.add("incorrect");
    ibutton.textContent=guess.c;
    ibutton.onclick=()=>play_sound(guess.sound)
    qbox.appendChild(ibutton);

    show_correct(ans,qbox);
}

function check_all(b){
    let checks = document.getElementsByClassName("check_sound");
    for (i in checks) {
        if (checks[i].nodeName == "INPUT"){
            checks[i].checked = b; 
        }
    }
}

function select_inventory(s,b){
    let checks = document.getElementsByClassName("check_sound");
    let s2 = s.split(" ");
    console.log(s2);
    for (i in checks){
        let ch = checks[i];
        if( s2.includes(ch.getAttribute?.("data-char") )){
            ch.checked = b;
        }
    }
}


function run_quiz(){
    console.log("Quiz RUnning");
    let qbox = document.getElementsByClassName("quiz")[0];
    qbox.innerHTML = "";
    let els = document.getElementsByClassName("check_sound");

    let options = [];
    for (i in els){
        let e = els[i];
        if (e.checked){ 
            options.push({
                sound : e.getAttribute("data-sound"),
                c : e.getAttribute("data-char"),
            });
        }
    }
    //reduce quiz to 10 options
    while (options.length > 10){
        let r = Math.floor(Math.random() * options.length);
        options.splice(r,1);
    }
    

    let r = Math.floor(Math.random() * options.length);
    play_sound(options[r].sound);
    let btn_rep_sound = document.getElementsByClassName("repeater")[0] ;
    btn_rep_sound.onclick = ()=>play_sound(options[r].sound);
    btn_rep_sound.classList.remove("hidden");
    for (i in options){
        let o = options[i];
        let btn = document.createElement("Button");
        btn.innerHTML = options[i].c;
        if (r == i){
            btn.onclick= ()=>correct(options[r]);
        }else {
            let guess = options[i];
            btn.onclick= ()=>incorrect(options[r],guess);
        }
        qbox.appendChild(btn);
    }
}

function read_params(){
    let params = new URLSearchParams(window.location.href);
    let ar = params.getAll("c");
    let checks = document.getElementsByClassName("check_sound");
    
    for (i in ar){
        p = ar[i];
        for (ci in checks){
            let ch = checks[ci];
            if (ch.getAttribute?.("data-char") === p){
                ch.checked = true;
            }
        }
    }

}
read_params();


