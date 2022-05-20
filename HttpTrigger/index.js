module.exports = async function (context, req) {
	context.log("base64CsvToJson function processed a request.");
	try {
		const base64Csv = req.body || req.query.data;

		if (!req.body) {
			context.res = {
				status: 400,
				body: "Please pass Base64 CSV data in the request body.",
			};
			return;
		}

		context.res = {
			status: 200,
			body: base64CsvToJson(base64Csv),
		};
	} catch (error) {
		context.res = {
			status: 500,
			body: error.message,
		};
	}
};

function decodeBase64ToString(base64Input) {
	return atob(base64Input);
}

function trimStringArray(string) {
	return string.trim();
}

function csvToJson(csv) {
	const lines = csv.split("\n");
	const keys = lines[0].trim().split(",");
	return lines.slice(1).map((line) => {
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

function base64CsvToJson(base64Csv) {
	let jsonData;
	let data = decodeBase64ToString(base64Csv);
	data = trimStringArray(data);
	jsonData = csvToJson(data);
	return jsonData;
}
