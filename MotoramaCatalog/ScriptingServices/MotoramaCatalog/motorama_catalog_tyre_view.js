/* globals $ */
/* eslint-env node, dirigible */

var entityMotorama_catalog_tyre_view = require('MotoramaCatalog/motorama_catalog_tyre_view_lib');
var request = require("net/http/request");
var response = require("net/http/response");
var xss = require("utils/xss");

handleRequest();

function handleRequest() {
	
	response.setContentType("application/json; charset=UTF-8");
	response.setCharacterEncoding("UTF-8");
	
	// get method type
	var method = request.getMethod();
	method = method.toUpperCase();
	
	// retrieve the id as parameter if exist 
	var count = xss.escapeSql(request.getParameter('count'));
	var metadata = xss.escapeSql(request.getParameter('metadata'));
	var sort = xss.escapeSql(request.getParameter('sort'));
	var limit = xss.escapeSql(request.getParameter('limit'));
	var offset = xss.escapeSql(request.getParameter('offset'));
	var desc = xss.escapeSql(request.getParameter('desc'));
	var tyreBrand = xss.escapeSql(request.getParameter('tyreBrand'));
	var tyreDiameter = xss.escapeSql(request.getParameter('tyreDiameter'));
	var tyreRatio = xss.escapeSql(request.getParameter('tyreRatio'));
	var tyreWidth = xss.escapeSql(request.getParameter('tyreWidth'));	
	
	if (limit === null) {
		limit = 100;
	}
	if (offset === null) {
		offset = 0;
	}
	
	if(!entityMotorama_catalog_tyre_view.hasConflictingParameters(null, count, metadata)) {
		// switch based on method type
		if ((method === 'GET')) {
			// read
			if (count !== null) {
				entityMotorama_catalog_tyre_view.countMotorama_catalog_tyre_view();
			} else if (metadata !== null) {
				entityMotorama_catalog_tyre_view.metadataMotorama_catalog_tyre_view();
			} else {
				entityMotorama_catalog_tyre_view.readMotorama_catalog_tyre_viewList(limit, offset, sort, desc, tyreBrand, tyreDiameter, tyreRatio, tyreWidth);
			}
		} else {
			// create, update, delete
			entityMotorama_catalog_tyre_view.printError(response.METHOD_NOT_ALLOWED, 4, "Method not allowed"); 
		}
	}
	
	// flush and close the response
	response.flush();
	response.close();
}
