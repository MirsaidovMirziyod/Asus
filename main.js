/*Число 675 - это размер области в которой отображается слайд.
setTimeout(time,2000) - 2000 - это время анимации в css.*/
var times = 0; //чтобы не выполнять скрипт во время выполнения анимации
window.onload = function () {
  var a = document.getElementById("scropl-carusel");
  var s = document.getElementsByClassName("el-carusel");
  var viwe_carusel = document.getElementById("viwe-carusel");
  /*Переменные для получения положеня мыши во время нажатия на слайдер, сохранения текцщего сдвига полосы слайдера и получения направления движения мыши*/
  var mous_down = 0,
    save_transformpx = 0,
    direction_mouse = 0;
  var child = 1,
    transformpx = 0,
    backChild = 0,
    nextChild = 0,
    width_slide = 675,
    center_slider = 0;
  var MouseDownTrigger = 0;
  function time() {
    times = 0;
  }
  /*Обработчик движения мыши на слайде*/
  function drag_slider_move(event) {
    if (MouseDownTrigger == 1) {
      //console.log(event.clientX-mous_down);
      a.style =
        "transform:   translateX(" +
        Number(transformpx + event.clientX - mous_down) +
        "px)";
      save_transformpx = transformpx + event.clientX - mous_down;
      direction_mouse = event.clientX - mous_down;
    }
  }
  /*Обработчик нажатия мыши на слайде*/
  function drag_slider_down(event) {
    if (times == 0) {
      times = 1;
      setTimeout(time, 2000);
      MouseDownTrigger = 1;
      mous_down = event.clientX;
      transformpx = save_transformpx;
      a.className = "scropl-carusel-no-transition";
    }
  }
  /*Обработчик отжатия мыши на слайде*/
  function drag_slider_up() {
    /*Условие чтобы не переключать активный слайд в навигации пока идёт анимация*/
    if (MouseDownTrigger == 1) {
      MouseDownTrigger = 0;
      a.className = "scropl-carusel";
      alignment_slide();
    }
  }
  /*Обработчик ухода мыши с слайда*/
  function drag_slider_out() {
    /*Условие чтобы не переключать активный слайд в навигации пока идёт анимация или мышь ушла со слайдов*/
    if (MouseDownTrigger == 1) {
      MouseDownTrigger = 0;
      a.className = "scropl-carusel";
      alignment_slide();
    }
  }
  /*Функция выравнивания слйда после его перемешания мышью*/
  function alignment_slide() {
    var old_active_el;
    var element_nav = document.getElementsByClassName("element-nav");
    center_slider = Math.abs(save_transformpx);
    //console.log(direction_mouse);
    for (var i = 1; i <= s.length; i++) {
      if (center_slider > width_slide) {
        center_slider = center_slider - width_slide;
      } else {
        /*Если direction_mouse>0 значит направо, иначе налево*/
        if (direction_mouse > 0) {
          a.style =
            "transform:   translateX(" + Number(-width_slide * (i - 1)) + "px)";
          save_transformpx = -width_slide * (i - 1);
          transformpx = save_transformpx;
          /*Изменяю активный слайд в навигации*/
          old_active_el = hidden_active();
          if (old_active_el > 0) {
            child--;
            //console.log(old_active_el);
            element_nav[old_active_el - 1].className = "element-nav active";
          } else {
            if (old_active_el == 0) {
              element_nav[old_active_el].className = "element-nav active";
            }
          }
          break;
        } else {
          //console.log(i);
          if (i == s.length) {
            a.style =
              "transform:   translateX(" +
              Number(-width_slide * (i - 1)) +
              "px)";
            save_transformpx = -width_slide * (i - 1);
            transformpx = save_transformpx;
            break;
          }
          //console.log(width_slide*i);
          a.style =
            "transform:   translateX(" + Number(-width_slide * i) + "px)";
          save_transformpx = -width_slide * i;
          transformpx = save_transformpx;
          /*Изменяю активный слайд в навигации*/
          old_active_el = hidden_active();
          if (old_active_el < s.length) {
            child++;
            //console.log(old_active_el);
            element_nav[old_active_el + 1].className = "element-nav active";
          }
          break;
        }
      }
    }
  }
  /*Вешаю обработчики события на слайды для перетягивания слайдов*/
  function drag_slider_event() {
    viwe_carusel.addEventListener(
      "mousedown",
      drag_slider_down.bind(this),
      false
    );
    viwe_carusel.addEventListener(
      "mousemove",
      drag_slider_move.bind(this),
      false
    );
    viwe_carusel.addEventListener("mouseup", drag_slider_up.bind(this), false);
    viwe_carusel.addEventListener(
      "mouseout",
      drag_slider_out.bind(this),
      false
    );
  }
  /*Добавление пунктов навигвции*/
  function nav_sliader() {
    for (var i = 1; i <= s.length; i++) {
      var newSpan = document.createElement("span");
      if (i == 1) {
        newSpan.className = "element-nav active";
      } else {
        newSpan.className = "element-nav";
      }
      newSpan.setAttribute("data-pointer", i); //Указатель на нужный слайд
      document.getElementById("nav-slide").appendChild(newSpan);
      newSpan.addEventListener("click", click_nav.bind(this), false);
    }
  }
  /*Убрать класс active и вернуть индекс последнего активного*/
  function hidden_active() {
    var element_nav = document.getElementsByClassName("element-nav");
    for (var i = 0; i < element_nav.length; i++) {
      if (element_nav[i].classList.contains("active")) {
        element_nav[i].className = "element-nav";
        return_el = i;
      }
    }
    return return_el;
  }
  /*Обработка нажатия на элемент навигации*/
  function click_nav(element_slide) {
    // if(times==0){
    // times=1;
    // setTimeout(time,2000);
    console.log(element_slide.target.className);
    if (!element_slide.target.classList.contains("active")) {
      var old_active_el;
      var element_nav = document.getElementsByClassName("element-nav");
      /*Чтобы нельзя было пролистнуть сразу несколько элементов*/
      var this_attr = element_slide.target.getAttribute("data-pointer"); //слайд который нужно показать
      old_active_el = hidden_active(); //Убрать класс active
      old_active_el = element_nav[old_active_el].getAttribute("data-pointer");

      if (old_active_el < this_attr) {
        for (var i = 1; i <= this_attr - old_active_el; i++) {
          next();
        }
      } else {
        for (var i = 0; i < old_active_el - this_attr; i++) {
          back();
        }
      }
      element_slide.target.className = "element-nav active";
    }
  }
  //}
  nav_sliader(); //Добавление пунктов навигвции
  drag_slider_event(); //Вешаю обработчики на слайды
  document.getElementById("back").onclick = function () {
    var back_attr = document
      .getElementById("back")
      .getAttribute("data-pointer");
    var next_attr = document
      .getElementById("next")
      .getAttribute("data-pointer");
    var element_nav = document.getElementsByClassName("element-nav");
    var old_active_el;
    /*Чтобы нельзя было пролистнуть сразу несколько элементов*/
    if (times == 0) {
      times = 1;
      setTimeout(time, 2000);
      back();
      old_active_el = hidden_active();
      if (old_active_el <= 0) {
        element_nav[element_nav.length - 1].className = "element-nav active";
      } else {
        element_nav[old_active_el - 1].className = "element-nav active";
      }
    }
  };
  document.getElementById("next").onclick = function () {
    var back_attr = document
      .getElementById("back")
      .getAttribute("data-pointer");
    var next_attr = document
      .getElementById("next")
      .getAttribute("data-pointer");
    var element_nav = document.getElementsByClassName("element-nav");
    var old_active_el;
    /*Чтобы нельзя было пролистнуть сразу несколько элементов*/
    if (times == 0) {
      times = 1;
      setTimeout(time, 2000);
      next();
      old_active_el = hidden_active();
      if (old_active_el + 1 == element_nav.length) {
        element_nav[0].className = "element-nav active";
      } else {
        element_nav[old_active_el + 1].className = "element-nav active";
      }
    }
  };
  function back() {
    console.log("back" + child);
    if (child > 1) {
      transformpx = transformpx + 675;
      a.style = "transform:   translateX(" + transformpx + "px)";
      child--;
    } else {
      transformpx = -675 * (a.children.length - 1);
      a.style = "transform:   translateX(" + transformpx + "px)";
      child = a.children.length;
    }
    save_transformpx = transformpx;
  }
  function next() {
    console.log("next" + child);
    if (a.children.length > child) {
      transformpx = transformpx - 675;
      a.style = "transform:   translateX(" + transformpx + "px)";
      child++;
    } else {
      transformpx = 0;
      child = 1;
      a.style = "transform:   translateX(" + transformpx + "px)";
    }
    save_transformpx = transformpx;
  }
};
