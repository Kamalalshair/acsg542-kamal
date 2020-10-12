$('#todo-form').submit(function () {
    $.post({
        url: '/save',
        data: {"item": $('#thing').val()},
        dataType: 'json',
        contentType: 'application/json'
    })
});

$(document).on('click', 'button.delete', function (event) {
    //var id = event.target.id;
    var id = $(this).attr("id")
    $.ajax({
        url: "/?id=" + id,
        type: 'DELETE'
    })
});

function getAllItems() {
    $.getJSON({
        url: '/list',
        success: function (data) {
            console.log(data.docs)
            var list = [];
            $.each(data.docs, function (i, item) {
                list.push("<li>" + item.item + "</li>");
            })

            $("<ul/>", {
                html: list.join("")
            }).appendTo("placeholder");
        }
    });
}

getAllItems();