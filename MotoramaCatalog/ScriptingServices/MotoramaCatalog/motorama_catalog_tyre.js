/* globals $ */
/* eslint-env node, dirigible */

var entityMotorama_catalog_tyre = require('MotoramaCatalog/motorama_catalog_tyre_lib');
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
	
	//get primary keys (one primary key is supported!)
	var idParameter = entityMotorama_catalog_tyre.getPrimaryKey();
	
	// retrieve the id as parameter if exist 
	var id = xss.escapeSql(request.getAttribute("path"));
	if (!id) {
		id = xss.escapeSql(request.getParameter(idParameter));
	}
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
	
	if(!entityMotorama_catalog_tyre.hasConflictingParameters(id, count, metadata)) {
		// switch based on method type
		if ((method === 'POST')) {
			// create
			entityMotorama_catalog_tyre.createMotorama_catalog_tyre();
		} else if ((method === 'GET')) {
			// read
			if (id) {
				entityMotorama_catalog_tyre.readMotorama_catalog_tyreEntity(id);
			} else if (count !== null) {
				entityMotorama_catalog_tyre.countMotorama_catalog_tyre();
			} else if (metadata !== null) {
				entityMotorama_catalog_tyre.metadataMotorama_catalog_tyre();
			} else {
				entityMotorama_catalog_tyre.readMotorama_catalog_tyreList(limit, offset, sort, desc, tyreBrand, tyreDiameter, tyreRatio, tyreWidth);
			}
		} else if ((method === 'PUT')) {
			// update
			entityMotorama_catalog_tyre.updateMotorama_catalog_tyre();    
		} else if ((method === 'DELETE')) {
			// delete
			if(entityMotorama_catalog_tyre.isInputParameterValid(idParameter)){
				entityMotorama_catalog_tyre.deleteMotorama_catalog_tyre(id);
			}
		} else {
			entityMotorama_catalog_tyre.printError(response.BAD_REQUEST, 4, "Invalid HTTP Method", method);
		}
	}
	
	// flush and close the response
	response.flush();
	response.close();
}
