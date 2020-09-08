document.addEventListener("DOMContentLoaded", () => {
    const dropDownParent =  document.getElementsByClassName('sortList')[0],
          dropDownIcon = document.getElementsByClassName('dropDownIcon')[0],
          dropDownBg = document.getElementsByClassName('labelBackground')[0],
          dropDown = document.getElementsByClassName('dropDown')[0];

    dropDownParent.addEventListener('click', (e) => {
        for (elm of dropDownParent.children) {
            if (elm.classList.contains('outerBorder')) {
                if (elm.classList.contains('outerBorderMoveOut')) {
                    elm.classList.remove('outerBorderMoveOut');
                } else {
                    elm.classList.add('outerBorderMoveOut');
                }
            }
            if (elm.classList.contains('dropAnimation')) {
                if (elm.classList.contains('dropDownMoveIn')) {
                    elm.classList.remove('dropDownMoveIn');
                } else {
                    elm.classList.add('dropDownMoveIn');
                }
            }

        }
    })
    dropDownBg.addEventListener('transitionend', () => {
        if (dropDown.classList.contains('dropDownExpend')) {
            dropDown.classList.remove('dropDownExpend')
            dropDownIcon.classList.remove('dropDownRotate');
        } else {
            dropDown.classList.add('dropDownExpend');
            dropDownIcon.classList.add('dropDownRotate');
        }
    })
});