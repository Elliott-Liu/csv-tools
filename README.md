# Node.js Azure Function: CSV to JSON
Converts a Base64 encoded CSV data and returns JSON formatted key : value pairs.

## Info
Intended to be used in conjuntion with Microsoft Power Automate, this Azure Function is quicker, and easier to use than building the same thing in a Flow.

I had some headaches getting the same thing to run in a Power Automate, and although it's possible the solutions I've tried took up to a few minutes to process the data, and involved many steps; versus miliseconds, and a single step with this solution.

## Usage
1. Deploy to Azure MyFunctions.
2. Make a request to the MyFunctions URL, passing in the CSV File Content in the body.
3. Returns JSON formatted data.