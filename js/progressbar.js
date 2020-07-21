(function() {
    var page = document.getElementById('pageCircleProgressBar'),
        progressBar = document.getElementById('circleprogress'),
        isCircle = tau.support.shape.circle,
        progressBarWidget,
        resultText,
        i;

    function printResult() {
       resultText = progressBarWidget.value();
    }

    function clearVariables() {
       page = null;
       progressBar = null;
    }

    function unbindEvents() {
        page.removeEventListener('pageshow', pageBeforeShowHandler);
        page.removeEventListener('pagehide', pageHideHandler);
        if (isCircle) {
            document.removeEventListener('rotarydetent', rotaryDetentHandler);
        }
    }

    function rotaryDetentHandler() {
        /* Get the rotary direction */
        var direction = event.detail.direction,
            value = parseInt(progressBarWidget.value());

        if (direction === 'CW') {
            /* Right direction */
            if (value < 100) {
                value++;
            } else {
                value = 100;
            }
        } else if (direction === 'CCW') {
            /* Left direction */
            if (value > 0) {
                value--;
            } else {
                value = 0;
            }
        }

        progressBarWidget.value(value);
        printResult();
    }

    function pageBeforeShowHandler() {
        if (isCircle) {
            /* Make the circular progressbar object */
            progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: 'full'});
            document.addEventListener('rotarydetent', rotaryDetentHandler);
       
        }

        i = parseInt(progressBarWidget.value());
    }

    function pageHideHandler() {
        unbindEvents();
        clearVariables();
        /* Release the object */
        progressBarWidget.destroy();
    }

    page.addEventListener('pagebeforeshow', pageBeforeShowHandler);
    page.addEventListener('pagehide', pageHideHandler);
}());