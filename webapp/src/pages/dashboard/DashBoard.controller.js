sap.ui.define(
	[	'jquery.sap.global',
		"AgendaInvent/src/app/BaseController",
		'sap/m/MessageToast',
		'sap/ui/model/SimpleType',
		'sap/ui/model/ValidateException',
		'sap/ui/model/json/JSONModel',



	],
	function (jQuery,BaseController,MessageToast,SimpleType,ValidateException,JSONModel) {
	"use strict";

	return BaseController.extend("AgendaInvent.src.pages.dashboard.DashBoard", {


		onInit: function(oEvent) {
		    this.loadData();
			this.getView().setModel(new JSONModel());

		},

		onPressDelete(oEvent){
			debugger
			const itemPressed = oEvent.getParameter("listItem").getBindingContext("contatos").getObject();
			const uri = `https://localhost:44308/api/contatos/${itemPressed.id}`
			const that = this;
			jQuery.ajax({
				type: "DELETE",
				url: uri,
				success: function (result){
					that.loadData();
					MessageToast.show(result);
				}
			});
			
		},
		onPressReload(oEvent){
			this.loadData();
			 
		},
		loadData(){
			this.oModel = new JSONModel("https://localhost:44308/api/contatos");
			this.setModel(this.oModel,"contatos");

		},

		onSave : function () {
			var model = this.getView().getModel().getData();
			var that = this;
			JSON.stringify(model)
			jQuery.ajax({
				type: "POST",
				url: "https://localhost:44308/api/contatos",
				data: model,
				success: function (result) {
					that.loadData()				
					MessageToast.show(that.getText("Commom.SuccessAction"));
					that.getView().setModel(new JSONModel());
				},
				error: function (result) {
					MessageToast.show(result.responseText);
				}
			});

		},

		handlePress: function (evt) {
			var sSrc = evt.getSource().getTarget();
			var oDialog = new sap.m.Dialog({
				content: new sap.m.Image({
					src: sSrc
				}),
				beginButton: new sap.m.Button({
					text: 'Close',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			oDialog.open();
		},
		onExit : function() {
			this.oModel.destroy();
		}
	});

});
