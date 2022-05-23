# CSV-Tools: Node.js Azure Function

CSV tools for converting CSV data into JSON; formatted with the headers as the keys, and the row data as the value.

## Info

Intended to be used in conjuntion with Microsoft Power Automate, this Azure Function is quicker, and easier to use than building the same thing in a Flow.

I had some headaches when trying to get Power Automate to do this function, and although it's possible the solutions I tried took up to a few minutes to process the data and involved many steps.

This function is simple, lightweight, takes miliseconds to run, and is only a single step with Power Automate.

## Usage

1. Deploy to Azure MyFunctions.
2. Make a request to the MyFunctions URL, passing in the CSV file content into the request body.
3. Returns JSON formatted data.

## Parameters

| Location | Name | Required | Type | Description | Default |
| - | - | - | - | - | - |
| Query | data | Yes | string | CSV file content | - |
| Query | base64 | No | boolean | CSV content is Base64 encoded | true |
| Query | headerRow | No | boolean | CSV a has header row - setting to false will make each JSON key the "headerKey" value followed by a sequential integer | true |
| Query | headerKey | No | string | The value for the JSON key if "headerRow" is set to false | "parameter" |
| Header | Content-Type | No | string | JSON ("application/json") | "application/json" |
