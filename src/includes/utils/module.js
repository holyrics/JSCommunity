//
function fixActions(module, objToFix) {
    try {
        //check single action instead array
        if (objToFix.input) {
            objToFix = [objToFix];
        }
        objToFix.forEach(function(a) {
            //check action as folder
            if (Array.isArray(a.action)) {
                jsc.utils.module.fixActions(module, a.action);
                return;
            }
            //input not found to fix
            if (!a.input) {
                return;
            }
            a.input.forEach(function(i) {
                var bkp = i.onchange;
                i.onchange = function(evt) {
                    module.settings.v2_23_0_fix_action_input = Date.now();
                    if (bkp) { bkp(evt); }
                };
            });
        });
    } catch (e) { /* ignore */ }
}