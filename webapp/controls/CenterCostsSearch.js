sap.ui.define([
    "sap/m/SearchField",
    "AgendaInvent/model/formatter"
], function (SearchField, formatter) {
	"use strict";
	return SearchField.extend("AgendaInvent.controls.CenterCostsSearch", {
		metadata : {
            properties : {
				dimension: 	{type : "int", defaultValue :-1}
			}
        },

		init : function () {

        },
        renderer : {}
	});
});
