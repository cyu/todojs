$(document).ready(function(){
    $('#email').bind('focus', function(){ $(this).select(); });
    $('#new-task').bind('focus', function(){ $(this).select(); });
    $('#new-task-button').click(function(){
        var tasks = window.appStorage.tasks || [];
        var newTask = $('#new-task').val();
        tasks.push(newTask);
        window.appStorage.setItem('tasks', tasks);
        $('#task-list').append("<li class='task'>" + newTask + "</li>")
    });

    $('.task').live('click', function(){
        $(this).addClass('completed');
        var clicked = this;
        $('#task-list li').each(function(index){
            if (this == clicked) {
                var tasks = window.appStorage.tasks;
                tasks.splice(index, 1);
                window.appStorage.tasks = tasks;
            }
        });
        $(clicked).delay(1000).slideUp('slow');
    });

    window.appStorage.$.ready(function(){
        var tasks = window.appStorage.tasks || [];
        for (var i=0; i<tasks.length; i++) {
            $('#task-list').append("<li class='task'>" + tasks[i] + "</li>")
        }
    });

    $('#twitter-login').click(function(){
        window.appStorage.$.connect({twitter:true});
    });

    $('#login-button').click(function(){
        window.appStorage.$.connect({email: $('#email').val()});
        $('#login').dialog('close');
        $('#new-task-pane').show();
    });

    var title = $('h1');
    var titlePos = title.position();
    $('#login').dialog({
        resizable: false,
        height: 'auto',
        minHeight: 80,
        position: [titlePos.left, titlePos.top + title.height()] });
});
