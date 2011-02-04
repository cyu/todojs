$(document).ready(function(){
    var showNewTaskForm = function() {
        var divs = $('#add').children('div');
        if (!divs.first().is(':hidden')) {
            $(divs.first()).hide();
            $(divs.get(1)).show().find('#new-task').focus();
            return true;
        }
        return false;
    };

    var hideNewTaskForm = function() {
        var divs = $('#add div');
        if (divs.first().is(':hidden')) {
            $(divs.get(1)).hide();
            $(divs.first()).show();
            return true;
        }
        return false;
    };

    $('#add div').first().click(showNewTaskForm);

    $('#add form').submit(function(){
        var newTask = $('#new-task').val();
        $('#new-task').val('');
        var tasks = window.appStorage.tasks;
        tasks.push({text:newTask});
        window.appStorage.setItem('tasks', tasks);
        $('#task-list ol li#add').before("<li class=task>" + newTask + "</li>");
        return false;
    });

    $('#new-task').
        keydown(function(event){
            if (event.keyCode == 27) {
                hideNewTaskForm();
            }
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

    $('#twitter-login a').click(function(){
        window.appStorage.$.connect({twitter:true}, true);
    });

    $('#login form').submit(function(){
        $('#login-button').attr('disabled', true);
        window.appStorage.$.connect({email: $('#email').val()});
        return false;
    });

    $('#login').show();

    window.appStorage.$.ready(function(){
        var tasks = window.appStorage.tasks;

        if (!tasks) {
            tasks = [
                {text: 'This is an example todo task'},
                {text: 'Click on a task to mark it completed'}
            ];
            window.appStorage.setItem('tasks', tasks);

        } else {
            // migrate old schema
            var updated = false;
            for (var i=0; i<tasks.length; i++) {
                if (typeof(tasks[i]) == 'string') {
                    tasks[i] = {text: tasks[i]};
                    updated = true;
                }
            }
            if (updated) {
                window.appStorage.setItem('tasks', tasks);
            }
        }

        for (var i=0; i<tasks.length; i++) {
            $('#task-list li#add').before("<li class=task>" + tasks[i].text + "</li>")
        }

        $('#login').hide();
        $('#task-list').show();
        /*$(document).keypress(function(event){
            var key = event.keyCode || event.charCode;
            if (key >= 65 && key <= 122 && showNewTaskForm()) {
                $('#new-task').val(key);
            }
        });*/
    });

});
