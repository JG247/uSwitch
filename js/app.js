/**
 * Created by jgpro_000 on 06/09/14.
 */
define([
], function(){
    function App () {};
    App.prototype.closeContent = function () {
        document.getElementsByClassName("closeTarget")[0].onclick = function() {
            document.getElementsByClassName('toggleTarget')[0].style.transition = "opacity 2000s linear";
            document.getElementsByClassName('toggleTarget')[0].style.opacity = 0;
            document.getElementsByClassName('toggleTarget')[0].style.transition = "maxHeight 2000s linear";
            document.getElementsByClassName('toggleTarget')[0].style.maxHeight = 0;
            document.getElementsByClassName('dropDownTrigger')[0].classList.remove('closeTarget');
            document.getElementsByClassName('dropDownTrigger')[0].classList.add('openTarget');
            document.getElementsByClassName('toggleBtn')[0].childNodes[1].textContent = "Show details"
            app.openContent();
        };
    };

    App.prototype.openContent = function () {
        document.getElementsByClassName("openTarget")[0].onclick = function() {
            document.getElementsByClassName('toggleTarget')[0].style.transition = "opacity 2000s linear";
            document.getElementsByClassName('toggleTarget')[0].style.opacity = 1;
            document.getElementsByClassName('toggleTarget')[0].style.transition = "maxHeight 2000s linear";
            document.getElementsByClassName('toggleTarget')[0].style.maxHeight = "500px";
            document.getElementsByClassName('dropDownTrigger')[0].classList.remove('openTarget');
            document.getElementsByClassName('dropDownTrigger')[0].classList.add('closeTarget');
            document.getElementsByClassName('toggleBtn')[0].childNodes[1].textContent = "Hide details"
            app.closeContent();
        };
    };

    App.prototype.checkEmail = function () {
        document.getElementsByClassName("emailSubmit")[0].onclick = function () {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var test = re.test(document.getElementsByClassName("emailInput")[0].value);
            if ( test == false ) {
                document.getElementsByClassName("status")[0].innerText = "That email address is not valid";
            } else {
                document.getElementsByClassName("status")[0].innerText = "You have successfully signed up!";
            }
        }
    };

    var app = new App();
    app.closeContent();
    app.checkEmail();

});