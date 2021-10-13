var data = [
    { name : 'Artificial polymer materials', logo : 'http://wave-labs.org/images/litter-reporter/menu/1.png' },
    { name : 'Metal', logo : 'http://wave-labs.org/images/litter-reporter/menu/2.png' },
    { name : 'Rubber', logo : 'http://wave-labs.org/images/litter-reporter/menu/3.png' },
    { name : 'Cloth/textile', logo : 'http://wave-labs.org/images/litter-reporter/menu/4.png' },
    { name : 'Paper/Cardboard', logo : 'http://wave-labs.org/images/litter-reporter/menu/5.png' },
    { name : 'Processed/worked wood', logo : 'http://wave-labs.org/images/litter-reporter/menu/6.png' },
    { name : 'Glass/ceramics', logo : 'http://wave-labs.org/images/litter-reporter/menu/7.png' },
    { name : 'Chemicals', logo : 'http://wave-labs.org/images/litter-reporter/menu/8.png' },
    { name : 'Food waste', logo : 'http://wave-labs.org/images/litter-reporter/menu/9.png' },
    { name : 'Other', logo : 'http://wave-labs.org/images/litter-reporter/menu/10.png' },
    { name : 'Fishing gear', logo : 'http://wave-labs.org/images/litter-reporter/menu/11.png' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.win.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data, null, false));

    if(Alloy.Globals.data.forEach(element => {
        if(element.litter){
            $.nextBtn.opacity = 1;
        }
    }));
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        var litterType = Alloy.createController('litterType', e.source.id).getView();
        litterType.open();
    }
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        /* var duration = Alloy.createController('duration').getView();
        duration.open(); */
    }
});