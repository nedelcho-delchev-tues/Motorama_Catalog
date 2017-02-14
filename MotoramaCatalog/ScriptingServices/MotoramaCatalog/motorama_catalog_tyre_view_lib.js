/* globals $ */
/* eslint-env node, dirigible */

var request = require("net/http/request");
var response = require("net/http/response");
var database = require("db/database");

var datasource = database.getDatasource();

// read all entities and print them as JSON array to response
exports.readMotorama_catalog_tyre_viewList = function(limit, offset, sort, desc, tyreBrand, tyreDiameter, tyreRatio, tyreWidth) {
    var connection = datasource.getConnection();
    try {
        var result = [];
        var sql = "SELECT ";
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += " * FROM MOTORAMA_CATALOG_TYRE_VIEW";
        sql += " WHERE";
        var flag = true;
        
        if(tyreBrand){
	        if(flag){
	        	sql += " TYRE_BRAND_ID = ?";
	        }else {
	        	sql += " AND TYRE_BRAND_ID = ?";
	        }
	        flag = false;
    	}
    	  	
    	if(tyreDiameter){
	        if(flag){
	        	sql += " TYRE_DIAMETER_ID = ?";
	        }else{
        		sql += " AND TYRE_DIAMETER_ID = ?";
        	}
	        flag = false;
    	}
    	
    	if(tyreRatio){
	        if(flag){
	        	sql += " TYRE_RATIO_ID = ?";
	        }else{
	        	sql += " AND TYRE_RATIO_ID = ?";
	        }
	        flag = false;
    	}
    	
    	if(tyreWidth){
	        if(flag){
	        	sql += " TYRE_WIDTH_ID = ?";
	        }else{
	        	sql += " AND TYRE_WIDTH_ID = ?";
	        }
	        flag = false;
    	}
    	
        if (sort !== null) {
            sql += " ORDER BY " + sort;
        }
        if (sort !== null && desc !== null) {
            sql += " DESC ";
        }
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genLimitAndOffset(limit, offset);
        }
        var i = 1;
        var statement = connection.prepareStatement(sql);
        statement.setInt(i++, tyreBrand);
        statement.setInt(i++, tyreDiameter);
        statement.setInt(i++, tyreRatio);
        statement.setInt(i++, tyreWidth);
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            result.push(createEntity(resultSet));
        }
        var jsonResponse = JSON.stringify(result, null, 2);
        response.println(jsonResponse);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message);
    } finally {
        connection.close();
    }
};

//create entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tyre_id = resultSet.getInt("TYRE_ID");
    result.tyre_image_url = resultSet.getString("TYRE_IMAGE_URL");
    result.tyre_model = resultSet.getString("TYRE_MODEL");
	result.tyre_brand_id = resultSet.getInt("TYRE_BRAND_ID");
    result.brand_name = resultSet.getString("BRAND_NAME");
	result.tyre_diameter_id = resultSet.getInt("TYRE_DIAMETER_ID");
	result.diameter_value = resultSet.getInt("DIAMETER_VALUE");
	result.tyre_width_id = resultSet.getInt("TYRE_WIDTH_ID");
	result.width_value = resultSet.getInt("WIDTH_VALUE");
	result.tyre_ratio_id = resultSet.getInt("TYRE_RATIO_ID");
	result.ratio_value = resultSet.getInt("RATIO_VALUE");
    return result;
}

function convertToDateString(date) {
    var fullYear = date.getFullYear();
    var month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    var dateOfMonth = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return fullYear + "/" + month + "/" + dateOfMonth;
}


exports.countMotorama_catalog_tyre_view = function() {
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM MOTORAMA_CATALOG_TYRE_VIEW';
        var statement = connection.prepareStatement(sql);
        var rs = statement.executeQuery();
        if (rs.next()) {
            count = rs.getInt(1);
        }
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message);
    } finally {
        connection.close();
    }
    response.println(count);
};

exports.metadataMotorama_catalog_tyre_view = function() {
	var entityMetadata = {
		name: 'motorama_catalog_tyre_view',
		type: 'object',
		properties: []
	};
	
	var propertytyre_id = {
		name: 'tyre_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_id);

	var propertytyre_image_url = {
		name: 'tyre_image_url',
		type: 'string'
	};
    entityMetadata.properties.push(propertytyre_image_url);

	var propertytyre_model = {
		name: 'tyre_model',
		type: 'string'
	};
    entityMetadata.properties.push(propertytyre_model);

	var propertytyre_brand_id = {
		name: 'tyre_brand_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_brand_id);

	var propertybrand_name = {
		name: 'brand_name',
		type: 'string'
	};
    entityMetadata.properties.push(propertybrand_name);

	var propertytyre_diameter_id = {
		name: 'tyre_diameter_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_diameter_id);

	var propertydiameter_value = {
		name: 'diameter_value',
		type: 'integer'
	};
    entityMetadata.properties.push(propertydiameter_value);

	var propertytyre_width_id = {
		name: 'tyre_width_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_width_id);

	var propertywidth_value = {
		name: 'width_value',
		type: 'integer'
	};
    entityMetadata.properties.push(propertywidth_value);

	var propertytyre_ratio_id = {
		name: 'tyre_ratio_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_ratio_id);

	var propertyratio_value = {
		name: 'ratio_value',
		type: 'integer'
	};
    entityMetadata.properties.push(propertyratio_value);


	response.println(JSON.stringify(entityMetadata));
};

exports.hasConflictingParameters = function(id, count, metadata) {
    if(id !== null && count !== null){
    	exports.printError(response.EXPECTATION_FAILED, 1, "Expectation failed: conflicting parameters - id, count");
        return true;
    }
    if(id !== null && metadata !== null){
    	exports.printError(response.EXPECTATION_FAILED, 2, "Expectation failed: conflicting parameters - id, metadata");
        return true;
    }
    return false;
};

// check whether the parameter exists 
exports.isInputParameterValid = function(paramName) {
    var param = request.getParameter(paramName);
    if(param === null || param === undefined){
    	exports.printError(response.PRECONDITION_FAILED, 3, "Expected parameter is missing: " + paramName);
        return false;
    }
    return true;
};

// print error
exports.printError = function(httpCode, errCode, errMessage, errContext) {
    var body = {'err': {'code': errCode, 'message': errMessage}};
    response.setStatus(httpCode);
    response.setHeader("Content-Type", "application/json");
    response.print(JSON.stringify(body));
    console.error(JSON.stringify(body));
    if (errContext !== null) {
    	console.error(JSON.stringify(errContext));
    }
};


