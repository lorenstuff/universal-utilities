//
// Constants
//

const byteSizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ];

const oneKiloByte = 1024;

const randomStringCharacters =
[
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"_", "-",
];

//
// Utility Functions
//

export function encodeHtml(rawString: string)
{
	return rawString.replace(/[<>&"']/g, (char) =>
	{
		switch (char)
		{
			case "<":
				return "&lt;";

			case ">":
				return "&gt;";

			case "&":
				return "&amp;";

			case "\"":
				return "&quot;";

			case "'":
				return "&apos;";

			default:
				return char;
		}
	});
}

export function formatNumberOfBytes(bytes: number, numberOfDecimalPlaces = 2)
{
    if (bytes === 0)
    {
        return "0 Bytes";
    }

    numberOfDecimalPlaces = numberOfDecimalPlaces < 0 ? 0 : numberOfDecimalPlaces;

    const byteSizeIndex = Math.floor(Math.log(bytes) / Math.log(oneKiloByte));

    return parseFloat((bytes / Math.pow(oneKiloByte, byteSizeIndex)).toFixed(numberOfDecimalPlaces)) + " " + byteSizes[byteSizeIndex];
}

export function formatNumberOfSeconds(totalSeconds: number)
{
	const components: string[] = [];

	const days = Math.floor(totalSeconds / (60 * 60 * 24));

	if (days > 0)
	{
		components.push(days + " day" + (days == 1 ? "" : "s"));
	}

	const hours = Math.floor(totalSeconds % (60 * 60 * 24) / (60 * 60));

	if (hours > 0)
	{
		components.push(hours + " hour" + (hours == 1 ? "" : "s"));
	}

	const minutes = Math.floor(totalSeconds % (60 * 60) / 60);

	if (minutes > 0)
	{
		components.push(minutes + " minute" + (minutes == 1 ? "" : "s"));
	}

	const seconds = Math.floor(totalSeconds % 60);

	if (seconds > 0)
	{
		components.push(seconds + " second" + (seconds == 1 ? "" : "s"));
	}

	return components.join(", ");
}

export function padStringWithNull(inputString: string, length = 16)
{
	const paddingNeeded = length - (inputString.length % length);

	if (paddingNeeded > 0 && paddingNeeded < length)
	{
		for (let i = 0; i < paddingNeeded; i++)
		{
			inputString += "\0";
		}
	}

	return inputString;
}

export function getRandomString(length = 20)
{
	const Input = new Uint8Array(Math.ceil(length / 4) * 3);

	crypto.getRandomValues(Input);

	let Result = "";
	let I = 0;
	let I2 = 0;

	while (I2 < length)
	{
		// @ts-ignore
		Result += randomStringCharacters[(Input[I] & 252) >> 2];
		++I;
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[(Input[I - 1] & 3) << 4 | (Input[I] & 240) >> 4];
		++I;
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[(Input[I - 1] & 15) << 2 | (Input[I] & 192) >> 6];
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[Input[I] & 63];
		++I;
		++I2;
	}

	return Result;
}

export function splitStringIntoChunks(inputString: string, chunkLength: number)
{
	if (chunkLength < 1)
	{
		chunkLength = 1;
	}

	const matchResult = inputString.match(new RegExp(".{1," + chunkLength.toString() + "}", "gu"));

	return matchResult ?? [];
}

export function trimNullFromString(inputString: string)
{
	const nullPosition = inputString.indexOf("\0");

	if (nullPosition > -1)
	{
		return inputString.substring(0, nullPosition);
	}

	return inputString;
}