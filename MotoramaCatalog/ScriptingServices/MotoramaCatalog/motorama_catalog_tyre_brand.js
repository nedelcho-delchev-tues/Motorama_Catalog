/* globals $ */
/* eslint-env node, dirigible */

var entityMotorama_catalog_tyre_brand = require('MotoramaCatalog/motorama_catalog_tyre_brand_lib');
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
	var idParameter = entityMotorama_catalog_tyre_brand.getPrimaryKey();
	
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
	
	if (limit === null) {
		limit = 100;
	}
	if (offset === null) {
		offset = 0;
	}
	
	if(!entityMotorama_catalog_tyre_brand.hasConflictingParameters(id, count, metadata)) {
		// switch based on method type
		if ((method === 'POST')) {
			// create
			entityMotorama_catalog_tyre_brand.createMotorama_catalog_tyre_brand();
		} else if ((method === 'GET')) {
			// read
			if (id) {
				entityMotorama_catalog_tyre_brand.readMotorama_catalog_tyre_brandEntity(id);
			} else if (count !== null) {
				entityMotorama_catalog_tyre_brand.countMotorama_catalog_tyre_brand();
			} else if (metadata !== null) {
				entityMotorama_catalog_tyre_brand.metadataMotorama_catalog_tyre_brand();
			} else {
				entityMotorama_catalog_tyre_brand.readMotorama_catalog_tyre_brandList(limit, offset, sort, desc);
			}
		} else if ((method === 'PUT')) {
			// update
			entityMotorama_catalog_tyre_brand.updateMotorama_catalog_tyre_brand();    
		} else if ((method === 'DELETE')) {
			// delete
			if(entityMotorama_catalog_tyre_brand.isInputParameterValid(idParameter)){
				entityMotorama_catalog_tyre_brand.deleteMotorama_catalog_tyre_brand(id);
			}
		} else {
			entityMotorama_catalog_tyre_brand.printError(response.BAD_REQUEST, 4, "Invalid HTTP Method", method);
		}
	}
	
	// flush and close the response
	response.flush();
	response.close();
}