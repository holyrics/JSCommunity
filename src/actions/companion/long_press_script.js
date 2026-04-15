jsc.utils.ui.companion.popupInputIfIsEmpty(obj.input, obj.metadata, function(page, row, column) {
  var rid = obj.input.receiver_id;
  jsc.companion.down(rid, page, row, column);
  h.setTimeout(function() {
      jsc.companion.up(rid, page, row, column);
  }, obj.input.delay);
});