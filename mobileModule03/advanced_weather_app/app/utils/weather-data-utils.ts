const codeToDescription = (code: number) => {
	switch (code) {
		case 0:
			return {
				icon: 'weather-sunny',
				description: "Clear"
			};

		case 1:
		case 2:
		case 3:
			return {
				icon: 'weather-partly-cloudy',
				description: "Partly cloudy"
			};

		case 45:
		case 48:
			return {
				icon: 'weather-fog',
				description: "Fog"
			};

		case 51:
		case 53:
		case 55:
			return {
				icon: 'weather-rainy',
				description: "Drizzle"
			};

		case 56:
		case 57:
			return {
				icon: 'weather-freezing-rain',
				description: "Freezing drizzle"
			};

		case 61:
		case 63:
		case 65:
			return {
				icon: 'weather-rainy',
				description: "Rain"
			};

		case 66:
		case 67:
			return {
				icon: 'weather-freezing-rain',
				description: "Freezing rain"
			};

		case 71:
		case 73:
		case 75:
			return {
				icon: 'weather-snowy',
				description: "Snow fall"
			};

		case 77:
			return {
				icon: 'weather-snowy',
				description: "Snow grains"
			};

		case 80:
		case 81:
		case 82:
			return {
				icon: 'weather-pouring',
				description: "Rain showers"
			};

		case 85:
		case 86:
			return {
				icon: 'weather-pouring',
				description: "Rain showers"
			};

		case 95:
			return {
				icon: 'weather-lightning',
				description: "Thunderstorm"
			};

		case 96:
		case 99:
			return {
				icon: 'weather-lightning-rainy',
				description: "Thunderstorm and hail"
			};

		default:
			return {
				icon: 'weather-cloudy',
				description: "Unknown"
			};
	}
};

export default codeToDescription;