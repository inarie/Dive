var data = [
    { name : 'Monk seal', logo : 'http://wave-labs.org/api/image/dive/1' },
    { name : 'Seagrass', logo : 'http://wave-labs.org/api/image/dive/2' },
    { name : 'Seahorse', logo : 'http://wave-labs.org/api/image/dive/3' },
    { name : 'Dusky grouper', logo : 'http://wave-labs.org/api/image/dive/4' },
    { name : 'Red hogfish', logo : 'http://wave-labs.org/api/image/dive/5' },
    { name : 'Black coral', logo : 'http://wave-labs.org/api/image/dive/6' },
    { name : 'Swimming crab', logo : 'http://wave-labs.org/api/image/dive/7' },
    { name : 'Green reef coral', logo : 'http://wave-labs.org/api/image/dive/8' },
    { name : 'Harpoon weed', logo : 'http://wave-labs.org/api/image/dive/9' },
    { name : 'Button tunicate', logo : 'http://wave-labs.org/api/image/dive/10' },
    { name : 'Loggerhead turtle', logo : 'http://wave-labs.org/api/image/dive/11' },
    { name : 'Fire Coral', logo : 'http://wave-labs.org/api/image/dive/12' },
	{ name : 'Bushy encrusting anemone', logo : 'http://wave-labs.org/api/image/dive/13' },
    { name : 'Warty umbrella snail', logo : 'http://wave-labs.org/api/image/dive/14' },
    { name : 'Caulerpa seaweed', logo : 'http://wave-labs.org/api/image/dive/15' },
    { name : 'Octopus', logo : 'http://wave-labs.org/api/image/dive/16' },
    { name : 'Gilthead seabream', logo : 'http://wave-labs.org/api/image/dive/17' },
    { name : 'Leafy flat-blade algae', logo : 'http://wave-labs.org/api/image/dive/18' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.index.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data, '', true));

    if(Alloy.Globals.data.forEach(element => {
        if(element.specie){
            $.nextBtn.opacity = 1;
        }
    }));
});


$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        var speciesAmount = Alloy.createController('speciesAmount', e.source.id).getView();
        speciesAmount.open();
    }
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        var duration = Alloy.createController('duration').getView();
        duration.open();
    }
});

$.index.open();