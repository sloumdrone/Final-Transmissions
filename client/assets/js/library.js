document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    targetElement.classList.add('show-img');
    triangleLeft.classList.add('hide-img');

    triangleLeft.addEventListener('click', function(){
        handleArrowClickLeft();
    });

    triangleRight.addEventListener('click', function() {
        handleArrowClickRight();
    });
});

var touchStartCoords =  {'x':-1, 'y':-1},
    touchEndCoords = {'x':-1, 'y':-1},
    direction = 'undefined',
    minDistanceXAxis = 30,
    maxDistanceYAxis = 30,
    maxAllowedTime = 1000,
    startTime = 0,
    elapsedTime = 0,
    elementArr = document.getElementsByClassName("story"), 
    currentSpot = 0;
    newSpot = null,
    triangleLeft = document.querySelector('.triangle-left'),
    triangleRight = document.querySelector('.triangle-right'),
    targetElement = elementArr[currentSpot];

function move(direction){
    if(elementArr[currentSpot + direction] === undefined){
        return;
    } else if(direction === -1) {
        if (elementArr[currentSpot + direction + direction] === undefined) {
            triangleLeft.classList.remove('show-img');
            triangleLeft.classList.add('hide-img');
        } else if (elementArr[currentSpot + direction] === undefined) {
            triangleLeft.classList.remove('show-img');
            triangleLeft.classList.add('hide-img');
            return;
        } else {
            triangleRight.classList.add('show-img');
        }
    } else if(direction === 1){
        if(elementArr[currentSpot + direction + direction] === undefined){
            triangleRight.classList.remove('show-img');
            triangleRight.classList.add('hide-img');
        } else if(elementArr[currentSpot + direction] === undefined){
            triangleRight.classList.remove('show-img');
            triangleRight.classList.add('hide-img');
            return;
        } else {
            triangleLeft.classList.add('show-img');
        }
    }
    currentSpot += direction;
    newSpot = elementArr[currentSpot];
    targetElement.classList.remove('show-img');
    targetElement.classList.add('hide-img');
    newSpot.classList.remove('hide-img');
    newSpot.classList.add('show-img');
    targetElement = newSpot;
    initEventListeners();
}


function handleArrowClickLeft() {
    move(-1);
}

function handleArrowClickRight(){
    move(1);
}

function swipeStart(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    touchStartCoords = {'x':e.pageX, 'y':e.pageY};
    startTime = new Date().getTime();
}

function swipeMove(e){
    e = e ? e : window.event;
    e.preventDefault();
}

function swipeEnd(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e) ? e.changedTouches[0] : e;

    touchEndCoords = {
        'x' : e.pageX - touchStartCoords.x,
        'y' : e.pageY - touchStartCoords.y
    };

    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= maxAllowedTime){
        if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
            direction = touchEndCoords.x < 0 ? 'left' : 'right';
            if (direction === 'left'){
                //direction refers to direction of swipe, not direction of array movement
                move(1);
            } else {
                move(-1);
            }
        }
    }
}

function addMultipleListeners(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen = evts.length; i < iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}

function initEventListeners(){
    addMultipleListeners(targetElement, 'mousedown touchstart', swipeStart);
    addMultipleListeners(targetElement, 'mousemove touchmove', swipeMove);
    addMultipleListeners(targetElement, 'mouseup touchend', swipeEnd);
}
