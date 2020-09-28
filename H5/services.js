$('#favoriteFood').submit(function() {
    $.post({
        url: '/',
        data: JSON.stringify({"favFood": $('#inputFood').val()}),
        dataType: 'json',
        contentType: 'application/json'
    })
})


