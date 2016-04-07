/*

The code below is to turn off client errors on profile pages (they were being very noisy)

if(window.dioPageData && window.dioPageData.pageType && window.dioPageData.pageType.indexOf('profile') > -1) {
    window.EventManager.off('pageEvent:error:client');
}

*/