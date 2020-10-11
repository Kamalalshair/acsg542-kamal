$('#favoriteFood').submit(function() {
    $.post({
        url: 'index.html',
        data: JSON.stringify({"favFood": $('#inputFood').val()}),
        dataType: 'json',
    })
})


