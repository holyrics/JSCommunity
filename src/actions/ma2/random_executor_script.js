var receiverID = obj.input.receiver_id;
if (!receiverID) return;

var movementExecutors = ma2ParseExecutors(obj.input.movement_executors);
var staticExecutors = ma2ParseExecutors(obj.input.static_executors);
var hasBPM = parseFloat(obj.bpm) > 0;
var allowMovement = hasBPM || obj.input.movement_without_bpm === true;
var movementKey = 'ma2RandomExecutorMovement:' + receiverID;
var executorKey = 'ma2ActiveExecutor:' + receiverID;
var movementActive = h.getGlobal(movementKey, false) === true;

var useMovement = (allowMovement && obj.slide_show_index < 1) ||
    ma2SlideContains('/') ||
    (ma2SlideContains('!') && obj.slide_show_index < 4) ||
    ((ma2SlideContains('*') || jsc.utils.isInstrumental(obj) || jsc.utils.isChorus(obj)) &&
        allowMovement && obj.slide_show_index < obj.slide_show_total);

if (useMovement && movementActive) return;

var previousExecutor = String(h.getGlobal(executorKey, '') || '');
var candidates = useMovement ? movementExecutors : staticExecutors;
var executor = ma2RandomExecutor(candidates, previousExecutor,
    'ma2RandomExecutor:' + receiverID + ':' + (useMovement ? 'movement' : 'static'));

if (!executor) return;

if (previousExecutor && previousExecutor != executor) {
    jsc.ma2.executorOff(receiverID, previousExecutor);
}
jsc.ma2.executorOn(receiverID, executor);

h.setGlobal(executorKey, executor);
h.setGlobal(movementKey, useMovement);
