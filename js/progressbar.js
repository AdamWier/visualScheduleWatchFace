var progressBarWidget;

(function() {
    var page = document.getElementById('pageCircleProgressBar'),
        progressBar = document.getElementById('circleprogress'),
        isCircle = tau.support.shape.circle,

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
    
    function pageBeforeShowHandler() {
        if (isCircle) {
            progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: 'full', thickness: 30});
        }

    }

    function pageHideHandler() {
        unbindEvents();
        clearVariables();
        progressBarWidget.destroy();
    }

    page.addEventListener('pagebeforeshow', pageBeforeShowHandler);
    page.addEventListener('pagehide', pageHideHandler);
}());