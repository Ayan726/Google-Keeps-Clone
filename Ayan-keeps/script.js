const adbtn = document.querySelector('.add-btn');
const notecontainer = document.getElementById('note-container');

// ring alarm





// update dark mode 

const updateDarkMode = (dark) => {
    localStorage.setItem('dark',dark);
}

//dark mode
const makeDarkNotes = () => {
    
    const lastdiv = notecontainer.lastChild;
    const alledits = lastdiv.querySelector('.edit');
    const alldeletes = lastdiv.querySelector('.delete');
    const allnotes = lastdiv.querySelector('.note');
    const alltext = lastdiv.querySelector('.texts');
   
    alledits.classList.toggle('dark-iconbg');
    alldeletes.classList.toggle('dark-iconbg');
    allnotes.classList.toggle('dark-note');
    alltext.classList.toggle('dark-textarea');

}

const activateDarkmode = () => {
    const alledits = document.querySelectorAll('#edit');
    const alldeletes = document.querySelectorAll('#delete');
    const allbells = document.querySelectorAll('#bell');
    const alltimes = document.querySelectorAll('.time-space');
    const allnotes = document.querySelectorAll('.note');
    const alltext = document.querySelectorAll('.texts');
    const darkround = document.querySelector('.dark-round');
    const darkmode = document.querySelector('.dark-mode');
    const ylogo = document.querySelector('#logo-container i');

    document.body.classList.toggle('dark-body');
    document.querySelector('.heading').classList.toggle('dark-heading');
    ylogo.classList.toggle('yellow-logo');
    darkmode.classList.toggle('style-darkbtn');
    darkround.classList.toggle('slide-btn');
    
    adbtn.classList.toggle('dark-addbtn');

    alltext.forEach(el => {
        el.classList.toggle('dark-textarea');
    })

    allnotes.forEach(el => {
        el.classList.toggle('dark-note');
    })

    alledits.forEach(el => {
        el.classList.toggle('dark-iconbg');
    })
    alldeletes.forEach(el => {
        el.classList.toggle('dark-iconbg');
    })
    allbells.forEach(el => {
        el.classList.toggle('dark-iconbg');
    })
    alltimes.forEach(el => {
        el.classList.toggle('dark-iconbg');
    })

   

    let dark = 'true'? document.body.classList.contains('dark-body') : 'false';

    updateDarkMode(dark);

}




// search method

const searchbar = document.getElementById('searchbar');

const incWidth = () => {
    searchbar.style.width = '195px';
    searchbar.setAttribute('placeholder', 'Search Notes Here');
}

document.addEventListener('click', (event) => {
    if (event.target != searchbar) {
        searchbar.style.width = '75px';
        searchbar.setAttribute('placeholder', 'Search');
    }
})

const getdiv = () => {
    const input = searchbar.value.toLowerCase();
    const notedivs = [...notecontainer.children];
    if (notedivs.length == 0) return;
    if (input) {
        notedivs.forEach(el => {
            const maintext = el.querySelector('.main').innerText.toLowerCase();
            if (maintext.includes(input)) {
                el.style.display = 'flex';
                const regex = new RegExp(input, "gi");
                el.querySelector('.main').innerHTML = el.querySelector('.main').innerText.replace(regex, `<span style='background-color: rgb(255, 208, 0);'>$&</span>`);

            }
            else {
                el.style.display = 'none';
            }


        })
    }
    else {
        notedivs.forEach(el => {
            const divtext = el.querySelector(".main").innerText;
            el.querySelector(".main").innerHTML = divtext;
            el.style.display = 'flex';
        })
    }
}


// saving in local storage
const updateLSdata = () => {
    const alltexts = document.querySelectorAll(".texts");
    const savednotes = [];

    alltexts.forEach((el) => {
        return savednotes.push(el.value);
    });

    // console.log(savednotes);

    localStorage.setItem('savednotes', JSON.stringify(savednotes));
}

// adding new note

const addnewnote = (text = '') => {
    const drk = localStorage.getItem('dark');
    const note = document.createElement('div');
    note.classList.add('note');
    if(drk == 'true')note.classList.add('dark-note');
    const htmldata = `
    <div class="operation">
                <input type="time" class ="time-space ${drk == 'true'? "dark-iconbg" : ""}">
                <button id="bell" class="light-iconbg ${drk == 'true'? "dark-iconbg" : ""}"><i class="fa-solid fa-bell"></i></button>
                <button id="edit" class="light-iconbg ${drk == 'true'? "dark-iconbg" : ""}"><i class="fas fa-edit"></i></button>
                <button id="delete" class="light-iconbg ${drk == 'true'? "dark-iconbg" : ""}"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class ="main ${text ? "" : "hidden"}"></div>
            <textarea class="texts ${text ? "hidden" : ""} ${drk == 'true'? "dark-textarea" : ""}"></textarea>
    `;
    note.insertAdjacentHTML('afterbegin', htmldata);
    //getting references
    const bell = note.querySelector('#bell');
    const edit = note.querySelector('#edit');
    const dlt = note.querySelector('#delete');
    const main = note.querySelector('.main');
    const txt = note.querySelector('.texts');

    // setting reminder
    bell.addEventListener('click',(event) => {
        const alarmtime = note.querySelector('.time-space').value;
            if(!alarmtime)return;
            // console.log('alarm set');
            let music = new Audio('alarm.mp3');
            const now = new Date();
            const alarm = new Date(now.toDateString() + " " + alarmtime);
    
            if(alarm<now){
                alarm.setDate(alarm.getDate()+1);
            }
            const timeUntilAlarm = alarm.getTime()-now.getTime();
    
            setTimeout(() => {
                function playaudio(){
                    let i = 3;
                    while(i--)music.play();
                    music.removeEventListener('ended',playaudio);
                }
                playaudio();
                music.addEventListener('ended',playaudio);
                note.querySelector('.time-space').value = null;
            }, timeUntilAlarm);
            
    
    })


    // deleting notes 
    dlt.addEventListener('click', () => {
        note.remove(); // deletes element

        updateLSdata();
    })
    // toggle edit button

    txt.value = text;
    main.innerHTML = text;



    edit.addEventListener('click', () => {
        main.classList.toggle("hidden");
        txt.classList.toggle("hidden");
    })

    txt.addEventListener('change', (event) => {
        const valuee = event.target.value;
        main.innerHTML = valuee;
        // console.log(main.innerHTML);
        updateLSdata();
    })




    notecontainer.appendChild(note); // appends element as last child of note

    // 
    // if(drk == 'true')makeDarkNotes();


}


//getting darkmode data back from local storage

const darkdata = localStorage.getItem('dark');

if(darkdata == 'true')activateDarkmode();


// getting data back from local storage
const savednotes = JSON.parse(localStorage.getItem('savednotes'));
// console.log(nt);
if (savednotes) { savednotes.forEach((x) => addnewnote(x)) }


adbtn.addEventListener('click', () => addnewnote());



