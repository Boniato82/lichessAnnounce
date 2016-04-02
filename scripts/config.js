
$( '#enabled' ).change(function() {
    chrome.storage.sync.set({'enabled': $( this ).prop('checked')}, function() {
        message('Enabled ' + $( this ).prop('checked') + ' set');
    });
})
chrome.storage.sync.get('enabled', function(items) {
    enabled = items['enabled'];
    if (enabled) {
        $( '#enabled' ).bootstrapToggle('on');
    }
    else {
        $( '#enabled' ).bootstrapToggle('off');
    }
});
