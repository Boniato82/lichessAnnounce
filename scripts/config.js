
$( '#juega' ).change(function() {
    $( 'select option:selected' ).each(function() {
        chrome.storage.sync.set({'juega': $( this )[0].value}, function() {
            message('Juega ' + $( this )[0].value + ' set');
        });
    });
});

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


chrome.storage.sync.get('juega', function(items) {
    juega = items['juega'];
    $( '#juega' ).val(juega);
});
