module.exports = async function (context, req) {
	context.log("Csv-Tools Convert to JSON function processed a request.");

	try {
		const IS_BASE64_ENCODED = stringToBoolean(req.query.base64, true);
		const HAS_HEADER_ROW = stringToBoolean(req.query.headerRow, true);
		const CUSTOM_HEADER_KEY = req.query.headerKey || "parameter";
		const CSV_REQUEST_DATA = req.query.data || req.body;

		if (!CSV_REQUEST_DATA) {
			context.res = {
				status: 400,
				body: "Please pass in data as a query parameter.",
			};
			return;
		}

		context.res = {
			status: 200,
			body: processRequest(
				CSV_REQUEST_DATA,
				IS_BASE64_ENCODED,
				HAS_HEADER_ROW,
				CUSTOM_HEADER_KEY
			),
		};
	} catch (error) {
		context.res = {
			status: 500,
			body: error.message,
		};
	}
};

function stringToBoolean(stringValue, defaultValue) {
	if (stringValue === "true") {
		return true;
	} else if (stringValue === "false") {
		return false;
	} else return defaultValue;
}

function decodeBase64ToString(base64Input) {
	return atob(base64Input);
}

function trimStringArray(string) {
	return string.trim();
}

function csvToJson(csv, hasHeaderRow, headerKey) {
	const lines = csv.split("\n");
	let keys = [];
	if (!hasHeaderRow === true) {
		for (i = 1; i <= lines[0].trim().split(",").length; i++) {
			keys.push(`${headerKey}${i}`);
			hasHeaderRow = 0;
		}
	} else {
		keys = lines[0].trim().split(",");
		hasHeaderRow = 1;
	}
	return lines.slice(hasHeaderRow).map((line) => {
		return line.split(",").reduce((acc, cur, i) => {
			const toAdd = {};
			toAdd[keys[i].replace('"', "").replace('"', "").replace(" ", "")] =
				filterInt(cur.trim().replace('"', "").replace('"', ""));
			return { ...acc, ...toAdd };
		}, {});
	});
}

function filterInt(value) {
	if (/^[-+]?(\d+)$/.test(value)) {
		return Number(value);
	} else {
		return value;
	}
}

function processRequest(csvData, isBase64, hasHeaderRow, headerKey) {
	let data = csvData;
	let jsonData;
	if (isBase64 === true) {
		data = decodeBase64ToString(csvData);
	}
	data = trimStringArray(data);
	jsonData = csvToJson(data, hasHeaderRow, headerKey);
	return jsonData;
}
