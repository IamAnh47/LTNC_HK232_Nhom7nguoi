$(document).ready(function () {
  $("#inline-picker").simpleCalendar({
    fixedStartDay: false,
    selectCallback: function (date) {
      console.log("date selected = " + date);
    },
  });

  $("#rp_button-collapse").click((e) => {
    if (!$("#right-panel-container").hasClass("hide")) {
      $("#right-panel-container").addClass("hide");
    } else $("#right-panel-container").removeClass("hide");
  });
});
