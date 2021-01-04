sap.ui.define([
	"isr/jmsl_LocationTransfer/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("isr.jmsl_LocationTransfer.controller.Selection", {

		/*
			Helper Methods
		*/
		_readSite: function(oModel, oSite) {

			var oView = this.getView();
			oView.setBusy(true);

			return new Promise(function(resolve, reject) {
				oModel.read("/siteSet('" + oSite + "')", {
					success: function(oResult) {
						resolve(oResult);
						oView.setBusy(false);
					},
					error: function(oError) {
						reject(oError);
						oView.setBusy(false);
					}
				});
			});

		},

		/*
			Events
		*/
		onInit: function() {

			var oView = this.getView();

			oView.bindElement({
				path: "/userdataSet(1)",
				model: "oModel"
			});

		},

		onLocationPress: function(oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel("oModel");
			var sMovetype = oModel.getProperty("/userdataSet(1)").Movetype;
			var inSite = this.byId("inSite");
			var sSite = inSite.getValue().toUpperCase();

			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext("oModel");
			var sLocation = oContext.getProperty("Locationid");

			var oSite = this._readSite(oModel, sSite);

			var that = this;
			oSite.then(function(oResult) {
				inSite.setValueState("None");
				that._getRouter().navTo("LineItems", {
					Movetype: sMovetype,
					Site: sSite,
					Location: sLocation
				});
			});

			oSite.catch(function(oError) {
				inSite.setValueState("Error");
				inSite.focus();
				inSite.setValueStateText(that._geti18nText("msgEIncorrectSite"));
			});

		}
	});

});