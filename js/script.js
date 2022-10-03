const calendarDays = document.querySelector(".calendar__days"),
todayTime = document.querySelector(".time__formate"),
todayDate = document.querySelector(".date__formate"),
yearDate = document.querySelector(".year__click"),
monthDate = document.querySelector(".month__click"),
prevNextBtn = document.querySelectorAll(".direction__btn span");

// 년,월,일,시간 데이터 가져오기
let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

// 시간 나타내기
const currentDateOption ={
    year:'numeric',
    month:'long',
    day:'numeric',
    weekday:'long'
};
const currentDateFormate = new Intl.DateTimeFormat(
    'kr',
    currentDateOption
).format(date);
todayDate.textContent = currentDateFormate;
setInterval(()=>{
    const timer = new Date();
    const option = {
        hour:'numeric',
        minute:'numeric',
        second:'numeric'
    };
    const formateTimer = new Intl.DateTimeFormat('kr',option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}:${`${timer.getSeconds()}`.padStart(
        2,
        '0'
    )}`;
    todayTime.textContent =formateTimer;
},100);


// 배열에 월 넣기
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

// 배열에 년도 넣기
const years = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"];

// 날짜 표시
const renderCalendar = () => {
    let firstDayMonth = new Date(currentYear, currentMonth, 1).getDay(),
    lastDateMonth = new Date(currentYear, currentMonth + 1, 0 ).getDate(),
    lastDayMonth = new Date(currentYear, currentMonth, lastDateMonth).getDay(),
    lastDateLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag= "";

    for(let i = firstDayMonth; i > 0; i--){
        liTag += `<div class="inactive">${lastDateLastMonth - i + 1}</div>`;
    }

    for(let i =1; i <= lastDateMonth; i++){
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? "active" : "";

        liTag += `<div class="${isToday}">${i}</div>`;
    }

    for(let i = lastDayMonth; i < 6; i++){
        liTag += `<div class="inactive">${i - lastDayMonth + 1} </div>`
    }
    
    yearDate.innerText = `${currentYear}`;
    monthDate.innerText = `${months[currentMonth]}`;
    calendarDays.innerHTML = liTag;
}
renderCalendar();

// 클릭시 년,월 변경
prevNextBtn.forEach(icon => {
    icon.addEventListener("click",()=>{
        currentMonth = icon.id === "prev" ? currentMonth -1 : currentMonth + 1;

        if(currentMonth < 0 || currentMonth > 11){
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }else{
            date = new Date();
        }
        renderCalendar();
    });
});

// 달을 클릭하면 나타나도록
let monthList = document.querySelector(".month__list");
months.forEach((e, index) =>{
    let isMonth = document.createElement('div');
    isMonth.innerHTML = `<div>${e}</div>`;

    monthList.append(isMonth);
    isMonth.addEventListener('click',()=>{
        currentMonth = index;
        renderCalendar(currentMonth, currentYear);
       
        monthList.classList.add('hide');
    });
});

monthDate.addEventListener('click',()=>{
    monthList.classList.remove('hideonce');
    monthList.classList.remove('hide');
    monthList.classList.add('show');
});

function hideMonthList() {
    monthList.classList.add('hideonce');
}
hideMonthList();

// 년도를 클릭하면 나타나도록
let yearList = document.querySelector(".year__list");
years.forEach((e, index) =>{
    let isYear = document.createElement('div');
    isYear.innerHTML =`<div>${e}</div>`;

    yearList.append(isYear);
    isYear.addEventListener('click',()=>{
        if(index <= 9){
            currentYear = `200${index}`;
        }else{
            currentYear = `20${index}`;
        }
        
        renderCalendar(currentMonth, currentYear);

        yearList.classList.add('hide');
    });
});

yearDate.addEventListener('click',()=>{
    yearList.classList.remove('hideonce');
    yearList.classList.remove('hide');
    yearList.classList.add('show');
});

function hideYearList() {
    yearList.classList.add('hideonce');
}
hideYearList();

