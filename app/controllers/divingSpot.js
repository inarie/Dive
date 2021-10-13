var divingSpot;

Alloy.Globals.data.forEach(element => {
    if(element.divingSpot){
        divingSpot = element.divingSpot;
    } else {
        divingSpot = null;
    }
});

var data = [
    { name : 'Arena', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Carlton Housereef', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Ponta Gale', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Wreck Bowbelle', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Wreck Afonso', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Clube Naval', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Gorgulho', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Lido Cave', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Pestana Palms Housereef', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Wreck Pronto', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Lazareto', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'T-Reef - Mamas', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
	{ name : 'Lavafinger', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Garajau', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'TReff, 2 Pinacles', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Reis Magos', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Ponta Santa Catarina', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Machico', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Baia Abra', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Badajera', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Galo', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' },
    { name : 'Teste', logo : 'https://s3.amazonaws.com/ionic-marketplace/input-location-selector/icon.jpg' }
];

var cellWidthAndHeight = Alloy.Globals.cellWidthAndHeight(3);

$.win.addEventListener('focus', () => {
    $.grid.setData(Alloy.Globals.setTable(3, Math.ceil(data.length / 3), cellWidthAndHeight, 60, data));

    if(Alloy.Globals.data.forEach(element => {
        if(element.divingSpot){
            $.nextBtn.opacity = 1;
        }
    }));
});

$.backBtn.addEventListener('click', () => {
    $.win.close();
});

$.grid.addEventListener('click', (e) => {
    if(e.source.id){
        divingSpot = Alloy.Globals.selectOnlyOne(e, data, cellWidthAndHeight, 3, divingSpot);
        $.nextBtn.opacity = 1;
    }
});

$.nextBtn.addEventListener('click', () => {
    if($.nextBtn.opacity == 1){
        var hasData = false;

        Alloy.Globals.data.forEach(element => {
            if(element.divingSpot){
                hasData = true;
            }
        });

        if(hasData){
            Alloy.Globals.data.forEach(element => {
                element.divingSpot = divingSpot;
            });
        }else{
            Alloy.Globals.data.push({"divingSpot" : divingSpot});
        }

        var diversAmount = Alloy.createController('diversAmount').getView();
        diversAmount.open();
    }
});