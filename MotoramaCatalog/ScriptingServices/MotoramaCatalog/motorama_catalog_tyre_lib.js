/* globals $ */
/* eslint-env node, dirigible */

var request = require("net/http/request");
var response = require("net/http/response");
var database = require("db/database");
var xss = require("utils/xss");

var datasource = database.getDatasource();

// create entity by parsing JSON object from request body
exports.createMotorama_catalog_tyre = function() {
    var input = request.readInputText();
    var requestBody = JSON.parse(input);
    var connection = datasource.getConnection();
    try {
        var sql = "INSERT INTO MOTORAMA_CATALOG_TYRE (";
        sql += "TYRE_ID";
        sql += ",";
        sql += "TYRE_BRAND_ID";
        sql += ",";
        sql += "TYRE_DIAMETER_ID";
        sql += ",";
        sql += "TYRE_RATIO_ID";
        sql += ",";
        sql += "TYRE_WIDTH_ID";
        sql += ",";
        sql += "TYRE_IMAGE_URL";
        sql += ",";
        sql += "TYRE_MODEL";
        sql += ",";
        sql += "TYRE_PRICE";
        sql += ") VALUES ("; 
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ")";

        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('MOTORAMA_CATALOG_TYRE_TYRE_ID').next();
        statement.setInt(++i, id);
        statement.setInt(++i, requestBody.tyre_brand_id);
        statement.setInt(++i, requestBody.tyre_diameter_id);
        statement.setInt(++i, requestBody.tyre_ratio_id);
        statement.setInt(++i, requestBody.tyre_width_id);
        statement.setString(++i, requestBody.tyre_image_url);
        statement.setString(++i, requestBody.tyre_model);
        statement.setDouble(++i, requestBody.tyre_price);
        statement.executeUpdate();
		response.println(id);
        return id;
    } catch(e) {
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
    return -1;
};

// read single entity by id and print as JSON object to response
exports.readMotorama_catalog_tyreEntity = function(id) {
    var connection = datasource.getConnection();
    try {
        var result;
        var sql = "SELECT * FROM MOTORAMA_CATALOG_TYRE WHERE " + exports.pkToSQL();
        var statement = connection.prepareStatement(sql);
        statement.setInt(1, id);
        
        var resultSet = statement.executeQuery();
        if (resultSet.next()) {
            result = createEntity(resultSet);
        } else {
        	exports.printError(response.NOT_FOUND, 1, "Record with id: " + id + " does not exist.", sql);
        }
        var jsonResponse = JSON.stringify(result, null, 2);
        response.println(jsonResponse);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

// read all entities and print them as JSON array to response
exports.readMotorama_catalog_tyreList = function(limit, offset, sort, desc) {
    var connection = datasource.getConnection();
    try {
        var result = [];
        var sql = "SELECT ";
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += " * FROM MOTORAMA_CATALOG_TYRE";
        if (sort !== null) {
            sql += " ORDER BY " + sort;
        }
        if (sort !== null && desc !== null) {
            sql += " DESC ";
        }
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genLimitAndOffset(limit, offset);
        }
        var statement = connection.prepareStatement(sql);
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            result.push(createEntity(resultSet));
        }
        var jsonResponse = JSON.stringify(result, null, 2);
        response.println(jsonResponse);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

//create entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tyre_id = resultSet.getInt("TYRE_ID");
	result.tyre_brand_id = resultSet.getInt("TYRE_BRAND_ID");
	result.tyre_diameter_id = resultSet.getInt("TYRE_DIAMETER_ID");
	result.tyre_ratio_id = resultSet.getInt("TYRE_RATIO_ID");
	result.tyre_width_id = resultSet.getInt("TYRE_WIDTH_ID");
    result.tyre_image_url = resultSet.getString("TYRE_IMAGE_URL");
    result.tyre_model = resultSet.getString("TYRE_MODEL");
    result.tyre_price = resultSet.getDouble("TYRE_PRICE");
    return result;
}

function convertToDateString(date) {
    var fullYear = date.getFullYear();
    var month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    var dateOfMonth = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return fullYear + "/" + month + "/" + dateOfMonth;
}

// update entity by id
exports.updateMotorama_catalog_tyre = function() {
    var input = request.readInputText();
    var responseBody = JSON.parse(input);
    var connection = datasource.getConnection();
    try {
        var sql = "UPDATE MOTORAMA_CATALOG_TYRE SET ";
        sql += "TYRE_BRAND_ID = ?";
        sql += ",";
        sql += "TYRE_DIAMETER_ID = ?";
        sql += ",";
        sql += "TYRE_RATIO_ID = ?";
        sql += ",";
        sql += "TYRE_WIDTH_ID = ?";
        sql += ",";
        sql += "TYRE_IMAGE_URL = ?";
        sql += ",";
        sql += "TYRE_MODEL = ?";
        sql += ",";
        sql += "TYRE_PRICE = ?";
        sql += " WHERE TYRE_ID = ?";
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setInt(++i, responseBody.tyre_brand_id);
        statement.setInt(++i, responseBody.tyre_diameter_id);
        statement.setInt(++i, responseBody.tyre_ratio_id);
        statement.setInt(++i, responseBody.tyre_width_id);
        statement.setString(++i, responseBody.tyre_image_url);
        statement.setString(++i, responseBody.tyre_model);
        statement.setDouble(++i, responseBody.tyre_price);
        var id = responseBody.tyre_id;
        statement.setInt(++i, id);
        statement.executeUpdate();
		response.println(id);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

// delete entity
exports.deleteMotorama_catalog_tyre = function(id) {
    var connection = datasource.getConnection();
    try {
    	var sql = "DELETE FROM MOTORAMA_CATALOG_TYRE WHERE " + exports.pkToSQL();
        var statement = connection.prepareStatement(sql);
        statement.setString(1, id);
        statement.executeUpdate();
        response.println(id);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

exports.countMotorama_catalog_tyre = function() {
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM MOTORAMA_CATALOG_TYRE';
        var statement = connection.prepareStatement(sql);
        var rs = statement.executeQuery();
        if (rs.next()) {
            count = rs.getInt(1);
        }
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
    response.println(count);
};

exports.metadataMotorama_catalog_tyre = function() {
	var entityMetadata = {
		name: 'motorama_catalog_tyre',
		type: 'object',
		properties: []
	};
	
	var propertytyre_id = {
		name: 'tyre_id',
		type: 'integer',
	key: 'true',
	required: 'true'
	};
    entityMetadata.properties.push(propertytyre_id);

	var propertytyre_brand_id = {
		name: 'tyre_brand_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_brand_id);

	var propertytyre_diameter_id = {
		name: 'tyre_diameter_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_diameter_id);

	var propertytyre_ratio_id = {
		name: 'tyre_ratio_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_ratio_id);

	var propertytyre_width_id = {
		name: 'tyre_width_id',
		type: 'integer'
	};
    entityMetadata.properties.push(propertytyre_width_id);

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
    
    var propertytyre_price = {
		name: 'tyre_price',
		type: 'double'
	};
    entityMetadata.properties.push(propertytyre_price);


	response.println(JSON.stringify(entityMetadata));
};

exports.getPrimaryKeys = function() {
    var result = [];
    var i = 0;
    result[i++] = 'TYRE_ID';
    if (result === 0) {
        throw new Error("There is no primary key");
    } else if(result.length > 1) {
        throw new Error("More than one Primary Key is not supported.");
    }
    return result;
};

exports.getPrimaryKey = function() {
	return exports.getPrimaryKeys()[0].toLowerCase();
};

exports.pkToSQL = function() {
    var pks = exports.getPrimaryKeys();
    return pks[0] + " = ?";
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
	var param = xss.escapeSql(request.getAttribute("path"));
	if (!param) {
		param = xss.escapeSql(request.getParameter(paramName));
	}
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
