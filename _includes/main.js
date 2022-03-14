---
---

let music_list = {};
function play_sound(name){
    if (music_list[name]) {
        music_list[name].play;
    }
    const music = new Audio(`{{site.baseurl}}/assets/sounds/${name}.mp3`);
    music_list[name] = music;
    music.play();
}

function correct(ans){
    let qbox = document.getElementsByClassName("quiz")[0];
    qbox.innerHTML = "" ;
    play_sound(ans.sound);
   

    let cbutton = document.createElement("Button");
    cbutton.classList.add("correct");
    cbutton.textContent=ans.c;
    cbutton.onclick =()=>play_sound(ans.sound);
    qbox.appendChild(cbutton);

    
}
function incorrect(ans,guess){
    let qbox = document.getElementsByClassName("quiz")[0];
    qbox.innerHTML="";
    play_sound(ans.sound);

    let ibutton = document.createElement("Button");
    ibutton.classList.add("incorrect");
    ibutton.textContent=guess.c;
    ibutton.onclick=()=>play_sound(guess.sound)
    qbox.appendChild(ibutton);

    let cbutton = document.createElement("Button");
    cbutton.classList.add("correct");
    cbutton.textContent=ans.c;
    cbutton.onclick =()=>play_sound(ans.sound);
    qbox.appendChild(cbutton);
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

