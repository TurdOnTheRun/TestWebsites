if (window.location.hash.substring(1) === "surveytest") {
    require(["survey-code/main"], function(s){ s.fire(); });
}