'use strict';
angular.module('myKalahulluApp')
    .service('itemService', function () {
         var selectedItem;
        return {
            selectedItemDetails:function () {
                return selectedItem;
            },
            setSelectedItem:function (item) {
                selectedItem=item;
            },
            
        }
    });