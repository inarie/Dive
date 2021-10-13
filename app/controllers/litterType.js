// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.title.text = args;

var choices = [];

Alloy.Globals.data.forEach(element => {
    if(element.litter === args){
        choices = element.litterType;
    }
});

var data = [
    {name : '1', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' },
    {name : '2', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' },
    {name : '3', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' },
    {name : '4', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' },
    {name : '5', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' },
    {name : '6', logo : 'https://www.bcm-institute.org/wp-content/uploads/2020/11/No-Image-Icon.png' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.win.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data, args));

    if(Alloy.Globals.data.forEach(element => {
        if(element.litter === args){
            $.doneBtn.opacity = 1;
        }
    }));
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        if(choices.includes(e.source.id)){
            var index = choices.indexOf(e.source.id);
            if (index !== -1) {
                choices.splice(index, 1);
            }
        }else{
            choices.push(e.source.id);
        }

        Alloy.Globals.select(e, data, cellWidthAndHeight, choices);
        
        if(choices.length > 0)
            $.doneBtn.opacity = 1;
    }
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.doneBtn.addEventListener('click', () => {
    if($.doneBtn.opacity == 1){
        var hasData = false;

        Alloy.Globals.data.forEach(element => {
            if(element.litter === args){
                hasData = true;
            }
        });

        if(hasData){
            Alloy.Globals.data.forEach(element => {
                if(element.litter === args){
                    element.litterType = choices;
                }
            });
        }else{
            Alloy.Globals.data.push({ "litter" : args, "litterType" :  choices });
        }

        $.win.close();
    }
});