# Node.js Azure Function: CSV to JSON
Converts a Base64 encoded CSV data into JSON; formatted with the headers as the keys, and the row data as the value.

## Info
Intended to be used in conjuntion with Microsoft Power Automate, this Azure Function is quicker, and easier to use than building the same thing in a Flow.

I had some headaches getting the same thing to run in a Power Automate, and although it's possible the solutions I've tried took up to a few minutes to process the data, and involved many steps; versus miliseconds, and a single step with this solution.

## Usage
1. Deploy to Azure MyFunctions.
2. Make a request to the MyFunctions URL, passing in the CSV file content as Base64 into request body.
3. Returns JSON formatted data.

**Note**: the CSV must contain a header row, else the function will not work.