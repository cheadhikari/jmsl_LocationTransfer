sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("isr.jmsl_LocationTransfer.controller.BaseController", {

		// Gets the router
		_getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		// Gets i18n Texts
		_geti18nText: function(sKey) {
			return this.getView().getModel("i18n").getResourceBundle().getText(sKey);
		},

		// Navigates back to the previous page if it is available. Else, it navigates to Home page
		onNavBack: function() {
			var oHistory, sPreviousHash, oRouter;
			oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter = this._getRouter();
				oRouter.navTo("Selection");
			}
		}
	});
});