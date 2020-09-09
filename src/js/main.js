document.addEventListener("DOMContentLoaded", () => {
    const dropDownParent    = document.getElementsByClassName('sortList')[0],
          dropDownIcon      = document.getElementsByClassName('dropDownIcon')[0],
          dropDownBg        = document.getElementsByClassName('labelBackground')[0],
          dropDownLabel     = document.getElementsByClassName('sortLabel')[0].getElementsByTagName('h4')[0],
          dropDown          = document.getElementsByClassName('dropDown')[0],
          accountParent     = document.getElementsByClassName('account')[0],
          counterTarget     = document.getElementsByClassName('counter')[0],
          counterControls   = document.getElementsByClassName('increments');


    let isDropDownExtended = () => dropDown.classList.contains('dropDownExpend');
    let BgAnimationHandler = event => {
        dropDown.classList.add('dropDownExpend');
        dropDownIcon.classList.add('dropDownRotate');
        dropDownBg.removeEventListener('transitionend', BgAnimationHandler);
    };
    let updateDropDownLabel = target => {
        let oldLabel = dropDownLabel.innerHTML;
        dropDownLabel.innerHTML = target.text;
        for (elm of dropDown.children) {
            elm.classList.remove('hidden');
            if (elm.innerText === dropDownLabel.innerHTML) elm.classList.add('hidden');
        }
    };
    let dropDownAnimationHandler = event => {
        for (elm of dropDownParent.children) {
            if (elm.classList.contains('outerBorder')) {
                elm.classList.remove('outerBorderMoveOut');
            }
            if (elm.classList.contains('dropAnimation')) {
                elm.classList.remove('dropDownMoveIn');
            }
        }
        dropDown.removeEventListener('transitionend', dropDownAnimationHandler);
    };
    let updateTotalprice = (amount, unitPrice) => {
        console.log(amount, unitPrice);
    }
    let counterControlsHandler = () => {
        for (let i = 0; i < 2; i++) {
            counterControls[i].addEventListener('click', event => {
                if (counterControls[i].classList.contains('addIncrement')) {
                    counterTarget.value++
                } else {
                    if (counterTarget.value > 1) counterTarget.value--
                }
            })
        }
    };

    dropDownParent.addEventListener('click', event => {
        if (event.target.tagName === 'A') updateDropDownLabel(event.target);
        if (!isDropDownExtended()) {
            for (elm of dropDownParent.children) {
                if (elm.classList.contains('outerBorder')) {
                    elm.classList.add('outerBorderMoveOut');
                }
                if (elm.classList.contains('dropAnimation')) {
                    elm.classList.add('dropDownMoveIn');
                }
            }
            dropDownBg.addEventListener('transitionend', BgAnimationHandler)
        } else {
            dropDown.classList.remove('dropDownExpend');
            dropDownIcon.classList.remove('dropDownRotate');
            dropDown.addEventListener('transitionend', dropDownAnimationHandler)
        }
    });
    accountParent.addEventListener('click', event => {
        if (accountParent.children[2].classList.contains('fadeIn')) {
            accountParent.children[2].classList.remove('fadeIn')
        } else {
            accountParent.children[2].classList.add('fadeIn')
        }
    });
    counterTarget.addEventListener('input', event => {
        console.log(event.target.value);
    })
    counterControlsHandler();

});